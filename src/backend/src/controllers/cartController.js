const connection = require("../config/dataBase");

const getAllCartByCustomer = async (req, res) => {
    try {
        const { makhachhang } = req.params;  // Lấy mã khách hàng từ tham số URL
        // Kiểm tra xem khách hàng có tồn tại trong hệ thống không
        if (!makhachhang) {
            return res.status(400).json({
                EM: "Mã khách hàng không được để trống",
                EC: -1,
                DT: [],
            });
        }

        // Lấy tất cả sản phẩm trong giỏ hàng của khách hàng
        const query =
            `SELECT c.magiohang, s.masanpham, s.tensanpham, m.mamau, m.tenmausanpham, m.mausachinhanh, c.soluong, c.gia
            FROM GIOHANG g
            JOIN CHITIETGIOHANG c ON g.magiohang = c.magiohang
            JOIN SANPHAM s ON c.masanpham = s.masanpham
            JOIN MAUSACSANPHAM m ON c.mamau = m.mamau
            WHERE g.makhachhang = ?`
            ;
        const [results] = await connection.query(query, [makhachhang]);

        if (results.length === 0) {
            return res.status(404).json({
                EM: "Không tìm thấy sản phẩm nào trong giỏ hàng",
                EC: 0,
                DT: [],
            });
        }

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
        const magiohang = result[0].insertId;

        // Kiểm tra xem sản phẩm có cùng mã màu đã có trong giỏ hàng chưa
        const cartCheck = await connection.query(
            "SELECT * FROM CHITIETGIOHANG WHERE mamau = ? AND masanpham = ? AND magiohang = ?",
            [mamau, masanpham, magiohang]
        );


        if (cartCheck[0].length > 0) {
            // Nếu sản phẩm có mã màu đã tồn tại trong giỏ hàng, trả về lỗi
            return res.status(400).json({ message: "Sản phẩm với mã màu này đã tồn tại trong giỏ hàng" });
        }

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


const deleteCartItems = async (req, res) => {
    const { makhachhang } = req.body;

    if (!makhachhang) {
        return res.status(400).json({ success: false, message: "Thiếu thông tin khách hàng." });
    }

    try {
        // Xóa các sản phẩm trong giỏ hàng trước
        await connection.query(
            "DELETE FROM CHITIETGIOHANG WHERE magiohang IN (SELECT magiohang FROM GIOHANG WHERE makhachhang = ?)",
            [makhachhang]
        );

        // Sau đó xóa giỏ hàng
        await connection.query(
            "DELETE FROM GIOHANG WHERE makhachhang = ?",
            [makhachhang]
        );

        return res.status(200).json({ success: true, message: "Xóa giỏ hàng thành công." });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Lỗi khi xóa giỏ hàng.", error: error.message });
    }
};

const deleteProductInCart = async (req, res) => {
    const { magiohang, masanpham, mamau } = req.params;

    // Xóa sản phẩm khỏi chi tiết giỏ hàng
    const deleteQuery = `DELETE FROM CHITIETGIOHANG WHERE magiohang = ? AND masanpham = ? AND mamau = ?`;

    connection.query(deleteQuery, [magiohang, masanpham, mamau], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Lỗi khi xóa sản phẩm khỏi giỏ hàng' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Sản phẩm không tìm thấy trong giỏ hàng' });
        }

        res.status(200).json({ message: 'Sản phẩm đã được xóa khỏi giỏ hàng thành công' });
    });
}

module.exports = {
    addToCart,
    getAllCartByCustomer,
    deleteCartItems,
    deleteProductInCart,
};