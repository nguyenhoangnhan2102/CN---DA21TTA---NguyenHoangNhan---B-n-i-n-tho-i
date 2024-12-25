const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
const connection = require("../config/dataBase");


const getAllUser = async (req, res) => {
    try {
        const query = `SELECT * FROM KHACHHANG`;
        //Thêm đường dẫn đầy đủ cho mỗi sản phẩm
        const [results] = await connection.query(query);
        return res.status(200).json({
            EM: "Lấy danh sách người dùng thành công",
            EC: 1,
            DT: results,
        });
    } catch (err) {
        console.error("Error fetching users:", err);
        return res.status(500).json({
            EM: `Lỗi controller getAllUser: ${err.message}`,
            EC: -1,
            DT: [],
        });
    }
};


const registerUser = async (req, res) => {
    const { email, hoten, password, sodienthoai, diachi } = req.body;

    const [existingUser] = await connection.query(
        "SELECT * FROM `KHACHHANG` WHERE email = ?",
        [email]
    );

    if (existingUser.length > 0) {
        return res.status(200).json({
            EM: "Tài khoản đã tồn tại",
            EC: 0,
            DT: "",
        });
    }
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        let role = 0;
        connection.query(
            "INSERT INTO `KHACHHANG` (email, password, role, hoten, sodienthoai, diachi) VALUES (?, ?, ?, ?, ?, ?)",
            [email, hashedPassword, role, hoten, sodienthoai, diachi]
        );
        return res.status(200).json({
            EM: "Đăng ký thành công",
            EC: 1,
            DT: "",
        });
    } catch (error) {
        console.error("Error:", error);
        return res.status(200).json({
            EM: `Xảy ra lỗi ${error}`,
            EC: 0,
            DT: "",
        });
    }
};

//Đăng nhập
const loginUser = async (req, res) => {
    const { account } = req.body;
    const email = account.email;
    const password = account.password;

    try {
        const [rows] = await connection.query("SELECT * FROM `KHACHHANG` WHERE `email` = ?", [
            email,
        ]);

        if (rows.length === 0) {
            return res.status(401).json({
                EM: "Invalid email or password",
                EC: 401,
                DT: "No user found with provided email",
            });
        }

        const user = rows[0];

        // Kiểm tra nếu role = -1, không cho phép đăng nhập
        if (user.role === -1) {
            return res.status(403).json({
                EM: "Tài khoản đã bị khóa, không thể đăng nhập",
                EC: 403,
                DT: "Account is disabled",
            });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({
                EM: "Invalid email or password",
                EC: 401,
                DT: "Incorrect password",
            });
        }
        const token = jwt.sign(
            {
                makhachhang: user.makhachhang,
                email: user.email,
                role: user.role,
                hoten: user.hoten,
                sodienthoai: user.sodienthoai,
                diachi: user.diachi,
            },
            JWT_SECRET,
            { expiresIn: "1h" }
        );

        return res.status(200).json({
            EM: "Login successful",
            EC: 200,
            DT: {
                accessToken: token,
                user: {
                    makhachhang: user.makhachhang,
                    email: user.email,
                    role: user.role,
                },
            },
        });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({
            EM: `Xảy ra lỗi ${error.message}`,
            EC: 500,
            DT: "",
        });
    }
};

const getUserProfile = async (req, res) => {
    try {
        const userId = req.body.makhachhang; // Lấy ID từ req.body
        console.log("User ID:", userId);

        const results = await connection.query(
            "SELECT makhachhang, email, password, role, hoten, sodienthoai, diachi FROM `KHACHHANG` WHERE makhachhang = ?",
            [userId]
        );

        if (results.length === 0) {
            return res.status(404).json({
                EM: "Người dùng không tìm thấy",
                EC: 404,
                DT: "Không tìm thấy người dùng với ID đã cung cấp",
            });
        }

        const user = results[0];
        const hashPassword = user.password && user.password.length > 0; // Kiểm tra mật khẩu có rỗng hay không

        res.status(200).json({
            EM: "Lấy thông tin người dùng thành công",
            EC: 200,
            DT: {
                ...user,
                hashPassword, // Thêm trường hasPassword vào kết quả trả về
            },
        });
    } catch (error) {
        console.error("Error retrieving user profile:", error);
        return res.status(500).json({
            EM: `Xảy ra lỗi: ${error.message}`,
            EC: 500,
            DT: "",
        });
    }
};

const updateUser = async (req, res) => {
    const { makhachhang } = req.params;
    const { hoten, sodienthoai, diachi } = req.body;

    try {
        const [existingUser] = await connection.query(
            "SELECT * FROM `KHACHHANG` WHERE makhachhang = ?",
            [makhachhang]
        );
        if (existingUser.length === 0) {
            return res.status(404).json({
                EM: "Người dùng không tìm thấy",
                EC: 404,
                DT: null,
            });
        }

        await connection.query("UPDATE `KHACHHANG` SET hoten = ?, sodienthoai = ?, diachi = ? WHERE makhachhang = ?", [
            hoten,
            sodienthoai,
            diachi,
            makhachhang,
        ]);

        return res.status(200).json({
            EM: "Cập nhật người dùng thành công",
            EC: 200,
            DT: null,
        });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({
            EM: `Xảy ra lỗi ${error.message}`,
            EC: 500,
            DT: null,
        });
    }
};

const verifyAdmin = async (req, res) => {
    const { token } = req.body;
    console.log("token", token);
    if (!token) {
        return res.status(401).json({
            EM: "Token is missing",
            EC: 401,
            DT: { isAdmin: false },
        });
    }

    try {
        // Giải mã token
        const decoded = jwt.verify(token, JWT_SECRET);

        const makhachhang = decoded.makhachhang;
        console.log("makhachhang", decoded);
        // Truy vấn để lấy thông tin user từ database
        const [rows] = await connection.query("SELECT role FROM KHACHHANG WHERE makhachhang = ?", [makhachhang]);

        if (rows.length > 0) {
            const user = rows[0];
            console.log(user.role);
            // Kiểm tra vai trò của người dùng
            if (user.role === 1) {
                return res.status(200).json({
                    EM: "User is admin",
                    EC: 200,
                    DT: { isAdmin: true }, // Người dùng là admin
                });
            } else {
                return res.status(403).json({
                    EM: "User is not admin",
                    EC: 403,
                    DT: { isAdmin: false }, // Người dùng không phải admin
                });
            }
        } else {
            return res.status(404).json({
                EM: "User not found",
                EC: 404,
                DT: { isAdmin: false }, // Người dùng không tìm thấy
            });
        }
    } catch (error) {
        console.error("Error decoding token or querying database:", error);
        return res.status(401).json({
            EM: `Invalid token: ${error.message}`, // Thông báo lỗi token không hợp lệ
            EC: 401,
            DT: { isAdmin: false }, // Token không hợp lệ, trả về false
        });
    }
};

module.exports = {
    getAllUser,
    registerUser,
    loginUser,
    getUserProfile,
    updateUser,
    verifyAdmin,
}