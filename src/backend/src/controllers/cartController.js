const connection = require("../config/dataBase");

const addToCart = async (req, res) => {
    const { id, masanpham } = req.body;

    if (!id || !masanpham) {
        return res.status(400).json({ message: "id và masanpham là bắt buộc" });
    }

    try {
        // Kiểm tra khách hàng tồn tại
        const customerCheck = await connection.query(
            "SELECT * FROM KHACHHANG WHERE id = ?",
            [id]
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
            "SELECT * FROM GIOHANG WHERE masanpham = ? AND id = ?",
            [masanpham, id]
        );
        if (cartCheck[0].length > 0) {
            return res.status(400).json({
                message: "Sản phẩm đã tồn tại trong giỏ hàng",
            });
        }

        // Thêm sản phẩm vào giỏ hàng
        await connection.query(
            "INSERT INTO GIOHANG (masanpham, id) VALUES (?, ?)",
            [masanpham, id]
        );

        res.status(201).json({
            message: "Sản phẩm đã được thêm vào giỏ hàng",
            data: { masanpham, id },
        });
    } catch (err) {
        console.error("Error adding product to cart:", err.message);
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    addToCart,
};