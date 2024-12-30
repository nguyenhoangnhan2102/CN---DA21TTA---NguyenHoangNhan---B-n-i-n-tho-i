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
    const { masanpham, makhachhang, mamau } = req.body;

    // Kiểm tra dữ liệu đầu vào
    if (!masanpham || !makhachhang || !mamau) {
        return res.status(400).json({ error: 'Vui lòng cung cấp đầy đủ thông tin.' });
    }

    // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
    const checkQuery = `
        SELECT * FROM GIOHANG 
        WHERE masanpham = ? AND makhachhang = ? AND mamau = ?
    `;

    connection.query(checkQuery, [masanpham, makhachhang, mamau], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Lỗi khi kiểm tra giỏ hàng.', details: err });
        }

        if (results.length > 0) {
            return res.status(400).json({ message: 'Sản phẩm đã có trong giỏ hàng.' });
        }

        // Thêm sản phẩm vào giỏ hàng
        const insertQuery = `
            INSERT INTO GIOHANG (masanpham, makhachhang, mamau)
            VALUES (?, ?, ?)
        `;

        connection.query(insertQuery, [masanpham, makhachhang, mamau], (err, results) => {
            if (err) {
                return res.status(500).json({ error: 'Lỗi khi thêm sản phẩm vào giỏ hàng.', details: err });
            }

            return res.status(200).json({ message: 'Thêm sản phẩm vào giỏ hàng thành công.' });
        });
    });
};

module.exports = {
    addToCart,
    getAllCartByCustomer,
};