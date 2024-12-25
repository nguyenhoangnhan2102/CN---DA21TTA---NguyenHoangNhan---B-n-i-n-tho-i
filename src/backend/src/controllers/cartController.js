const connection = require("../config/dataBase");

const getAllCartByCustomer = async (req, res) => {
    try {
        // Lấy makhachhang khách hàng từ tham số query hoặc params
        const { makhachhang } = req.params; // Giả sử bạn truyền makhachhang khách hàng từ params

        // Kiểm tra nếu không có mã khách hàng được cung cấp
        if (!makhachhang) {
            return res.status(400).json({
                EM: "Mã khách hàng không được để trống",
                EC: -1,
                DT: [],
            });
        }

        // Query SQL lọc theo makhachhang
        const query = `
            SELECT 
                gh.makhachhang, 
                sp.masanpham, 
                sp.tensanpham, 
                sp.hinhanhchinh,
                sp.giasanpham, 
                gh.created_at,
                gh.update_at
            FROM 
                GIOHANG gh
            JOIN 
                SANPHAM sp
            ON 
                gh.masanpham = sp.masanpham
            WHERE 
                gh.makhachhang = ?
        `;

        // Thực thi query với tham số makhachhang
        const [results] = await connection.query(query, [makhachhang]);

        // Kiểm tra nếu giỏ hàng rỗng
        if (results.length === 0) {
            return res.status(404).json({
                EM: "Không tìm thấy sản phẩm nào trong giỏ hàng",
                EC: 0,
                DT: [],
            });
        }

        // Trả kết quả về client
        return res.status(200).json({
            EM: "Lấy danh sách sản phẩm giỏ hàng thành công",
            EC: 1,
            DT: results,
        });
    } catch (err) {
        console.error("Error fetching cart:", err);
        return res.status(500).json({
            EM: `Lỗi controller: ${err.message}`,
            EC: -1,
            DT: [],
        });
    }
};

const addToCart = async (req, res) => {
    const { makhachhang, masanpham } = req.body;

    if (!makhachhang || !masanpham) {
        return res.status(400).json({ message: "makhachhang và masanpham là bắt buộc" });
    }

    try {
        // Kiểm tra khách hàng tồn tại
        const customerCheck = await connection.query(
            "SELECT * FROM KHACHHANG WHERE makhachhang = ?",
            [makhachhang]
        );
        if (customerCheck[0].length === 0) {
            return res.status(404).json({ message: "Khách hàng không tồn tại" });
        }

        // Kiểm tra sản phẩm tồn tại
        const productCheck = await connection.query(
            "SELECT * FROM SANPHAM WHERE masanpham = ?",
            [masanpham]
        );
        if (productCheck[0].length === 0) {
            return res.status(404).json({ message: "Sản phẩm không tồn tại" });
        }

        // Kiểm tra sản phẩm đã tồn tại trong giỏ hàng
        const cartCheck = await connection.query(
            "SELECT * FROM GIOHANG WHERE masanpham = ? AND makhachhang = ?",
            [masanpham, makhachhang]
        );
        if (cartCheck[0].length > 0) {
            return res.status(400).json({
                message: "Sản phẩm đã tồn tại trong giỏ hàng",
            });
        }

        // Thêm sản phẩm vào giỏ hàng
        await connection.query(
            "INSERT INTO GIOHANG (masanpham, makhachhang) VALUES (?, ?)",
            [masanpham, makhachhang]
        );

        res.status(201).json({
            message: "Sản phẩm đã được thêm vào giỏ hàng",
            data: { masanpham, makhachhang },
        });
    } catch (err) {
        console.error("Error adding product to cart:", err.message);
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    addToCart,
    getAllCartByCustomer,
};