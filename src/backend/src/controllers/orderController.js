const connection = require("../config/dataBase");
const moment = require('moment-timezone');

const getAllOrders = async (req, res) => {
    try {
        const [rows, fields] = await connection.query(`
        SELECT 
            d.madonhang,
            m.mamau,
            s.masanpham,
            s.tensanpham,
            d.ngaydat,
            d.trangthaidonhang,
            d.tongtien,         
            c.soluong,
            c.giatien,
            d.hotenkhachhang AS hotenkhachhang,
            d.diachigiaohang AS diachigiaohang,
            d.sdtkhachhang AS sodienthoaikhachhang,
            m.tenmausanpham,
            m.mausachinhanh
        FROM DONHANG d
        JOIN CHITIETDONHANG c ON d.madonhang = c.madonhang
        JOIN SANPHAM s ON c.masanpham = s.masanpham
        JOIN KHACHHANG k ON d.makhachhang = k.makhachhang
        JOIN MAUSACSANPHAM m ON c.masanpham = m.masanpham
        ORDER BY d.ngaydat DESC;

    `);
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

const confirmOrder = async (req, res) => {
    const { makhachhang, hotenkhachhang, sdtkhachhang, diachigiaohang, tongtien, chiTietSanPham } = req.body;

    if (!makhachhang || !chiTietSanPham || chiTietSanPham.length === 0) {
        return res.status(400).json({ success: false, message: "Thiếu thông tin đơn hàng." });
    }

    try {
        // Get current timestamp in Vietnam timezone
        const ngaydat = moment.utc().add(7, 'hours').format('YYYY-MM-DD HH:mm:ss');

        // Insert into DONHANG
        const [result] = await connection.query(
            "INSERT INTO DONHANG (ngaydat, tongtien, hotenkhachhang, sdtkhachhang, diachigiaohang, makhachhang) VALUES (?, ?, ?, ?, ?, ?)",
            [ngaydat, tongtien, hotenkhachhang, sdtkhachhang, diachigiaohang, makhachhang]
        );

        const madonhang = result.insertId;

        // Add order details
        for (const item of chiTietSanPham) {
            const { masanpham, mamau, giatien, soluong } = item;

            // Check product quantity
            const [product] = await connection.query(
                "SELECT soluongsanpham FROM SANPHAM WHERE masanpham = ?",
                [masanpham]
            );

            if (product.length === 0 || product[0].soluongsanpham < soluong) {
                throw new Error(`Sản phẩm ${masanpham} không đủ số lượng.`);
            }

            // Insert into CHITIETDONHANG
            await connection.query(
                "INSERT INTO CHITIETDONHANG (madonhang, masanpham, mamau, giatien, soluong) VALUES (?, ?, ?, ?, ?)",
                [madonhang, masanpham, mamau, giatien, soluong]
            );
        }

        return res.status(201).json({
            success: true,
            message: "Đặt hàng thành công.",
            madonhang,
            ngaydat
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Lỗi xử lý đơn hàng.", error: error.message });
    }
};


module.exports = {
    getAllOrders,
    confirmOrder,
}