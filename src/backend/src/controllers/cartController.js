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
    const { masanpham, makhachhang, mamau, soluong, gia } = req.body;

    // Kiểm tra xem dữ liệu có đầy đủ không
    if (!masanpham || !makhachhang || !mamau || !soluong || !gia) {
        return res.status(400).json({ message: 'Thiếu thông tin, vui lòng kiểm tra lại.' });
    }

    // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
    const checkQuery = `
    SELECT * FROM CHITIETGIOHANG 
    WHERE magiohang = (SELECT magiohang FROM GIOHANG WHERE makhachhang = ?) 
    AND masanpham = ? AND mamau = ?
  `;
    connection.query(checkQuery, [makhachhang, masanpham, mamau], (err, results) => {
        if (err) {
            console.error('Lỗi khi kiểm tra sản phẩm trong giỏ hàng:', err);
            return res.status(500).json({ message: 'Lỗi server' });
        }
    });
};

module.exports = {
    addToCart,
    getAllCartByCustomer,
};