const connection = require("../config/dataBase");

const getAllCartByCustomer = async (req, res) => {
    const { makhachhang } = req.params;  // Lấy mã khách hàng từ tham số URL

    try {
        // Kiểm tra xem khách hàng có tồn tại trong hệ thống không
        const customerCheck = await connection.query(
            "SELECT * FROM KHACHHANG WHERE makhachhang = ?",
            [makhachhang]
        );
        if (customerCheck[0].length === 0) {
            return res.status(404).json({ message: "Khách hàng không tồn tại" });
        }

        // Lấy tất cả sản phẩm trong giỏ hàng của khách hàng
        const cartItems = await connection.query(
            `SELECT c.magiohang, s.masanpham, s.tensanpham, m.tenmausanpham, c.soluong, c.gia 
            FROM GIOHANG g
            JOIN CHITIETGIOHANG c ON g.magiohang = c.magiohang
            JOIN SANPHAM s ON c.masanpham = s.masanpham
            JOIN MAUSACSANPHAM m ON c.mamau = m.mamau
            WHERE g.makhachhang = ?`,
            [makhachhang]
        );

        if (cartItems[0].length === 0) {
            return res.status(404).json({ message: "Giỏ hàng trống" });
        }

        // Trả về các sản phẩm trong giỏ hàng
        res.status(200).json({
            message: "Lấy sản phẩm trong giỏ hàng thành công",
            data: cartItems[0],
        });
    } catch (err) {
        console.error("Error fetching cart items:", err.message);
        res.status(500).json({ message: err.message });
    }
};


const addToCart = async (req, res) => {
    const { masanpham, makhachhang, mamau, soluong, gia } = req.body;

    // Kiểm tra xem dữ liệu có đầy đủ không
    if (!masanpham || !makhachhang || !mamau || !soluong || !gia) {
        return res.status(400).json({ message: 'Thiếu thông tin, vui lòng kiểm tra lại.' });
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

        // Thêm giỏ hàng và lấy magiohang
        const result = await connection.query(
            "INSERT INTO GIOHANG (makhachhang) VALUES (?)",
            [makhachhang]
        );
        const magiohang = result[0].insertId;  // Get the generated magiohang ID

        // Thêm sản phẩm vào chi tiết giỏ hàng
        await connection.query(
            "INSERT INTO CHITIETGIOHANG (magiohang, masanpham, mamau, soluong, gia) VALUES (?, ?, ?, ?, ?)",
            [magiohang, masanpham, mamau, soluong, gia]
        );

        res.status(201).json({
            message: "Sản phẩm đã được thêm vào giỏ hàng",
            data: { makhachhang, masanpham, magiohang, mamau, soluong, gia },
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