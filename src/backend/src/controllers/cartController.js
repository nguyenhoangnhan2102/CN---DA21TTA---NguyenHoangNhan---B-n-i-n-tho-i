const connection = require("../config/dataBase");

const getAllCartByCustomer = async (req, res) => {
    try {
        const { makhachhang } = req.params;

        if (!makhachhang) {
            return res.status(400).json({
                EM: "Mã khách hàng không được để trống",
                EC: -1,
                DT: [],
            });
        }

        const query = `
    SELECT 
      SP.masanpham, SP.tensanpham, SP.giasanpham, SP.hinhanhchinh, SP.soluongsanpham,
      GH.created_at, GH.update_at
    FROM 
      GIOHANG GH
    JOIN 
      SANPHAM SP ON GH.masanpham = SP.masanpham
    WHERE 
      GH.makhachhang = ?
  `;

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
    const { makhachhang, masanpham, mausacsanpham } = req.body;  // Thêm mausacsanpham

    if (!makhachhang || !masanpham || !mausacsanpham) {
        return res.status(400).json({ message: "makhachhang, masanpham và mausacsanpham là bắt buộc" });
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

        // Kiểm tra màu sắc sản phẩm tồn tại
        const colorCheck = await connection.query(
            "SELECT * FROM MAUSACSANPHAM WHERE mausacsanpham = ? AND masanpham = ?",
            [mausacsanpham, masanpham]  // Kiểm tra màu sắc thuộc về sản phẩm
        );
        if (colorCheck[0].length === 0) {
            return res.status(404).json({ message: "Màu sắc không tồn tại cho sản phẩm này" });
        }

        // Kiểm tra sản phẩm đã tồn tại trong giỏ hàng chưa
        const cartCheck = await connection.query(
            "SELECT * FROM GIOHANG WHERE makhachhang = ? AND masanpham = ? AND mausacsanpham = ?",
            [makhachhang, masanpham, mausacsanpham]
        );
        if (cartCheck[0].length > 0) {
            return res.status(400).json({
                message: "Sản phẩm và màu sắc đã tồn tại trong giỏ hàng",
            });
        }

        // Thêm sản phẩm và màu sắc vào giỏ hàng
        await connection.query(
            "INSERT INTO GIOHANG (makhachhang, masanpham, mausacsanpham) VALUES (?, ?, ?)",
            [makhachhang, masanpham, mausacsanpham]
        );

        res.status(201).json({
            message: "Sản phẩm đã được thêm vào giỏ hàng",
            data: { makhachhang, masanpham, mausacsanpham },
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