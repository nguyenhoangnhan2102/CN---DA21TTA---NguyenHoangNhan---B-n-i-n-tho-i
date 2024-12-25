const connection = require("../config/dataBase");

const getAllOrders = async (req, res) => {
    try {
        const [rows, fields] = await connection.query(`
      SELECT 
        s.tensanpham,
        k.hoten AS hotenkhachhang,
        k.diachi AS diachikhachhang,
        c.soluong,
        d.tongtien,
        m.tenmausanpham,
        m.mausachinhanh,
        d.ngaylap,
        d.trangthaidonhang
      FROM DONHANG d
      JOIN CHITIETDONHANG c ON d.madonhang = c.madonhang
      JOIN SANPHAM s ON c.masanpham = s.masanpham
      JOIN KHACHHANG k ON d.id = k.id
      JOIN MAUSACSANPHAM m ON c.masanpham = m.masanpham
      ORDER BY d.ngaylap DESC;
    `);
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

const comfirmOrder = async (req, res) => {
    const {
        makhachhang,
        hotenkhachhang,
        sdtkhachhang,
        diachigiaohang,
        tongtien,
        chiTietSanPham
    } = req.body;

    if (!makhachhang || !chiTietSanPham || chiTietSanPham.length === 0) {
        return res.status(400).json({ success: false, message: "Thiếu thông tin đơn hàng." });
    }

    try {

        const [result] = await connection.query(
            "INSERT INTO DONHANG (ngaylap, trangthaidonhang, hotenkhachhang, sdtkhachhang, diachigiaohang, tongtien, makhachhang) VALUES (?, ?, ?, ?, ?, ?, ?)",
            [ngaylap, trangthaidonhang, hotenkhachhang, sdtkhachhang, diachigiaohang, tongtien, makhachhang]
        );

        const madonhang = result.insertId;

        // Lấy thời gian lập hóa đơn vừa thêm
        const [donhang] = await connection.query(
            "SELECT ngaylap FROM DONHANG WHERE madonhang = ?",
            [madonhang]
        );

        // Thêm chi tiết hóa đơn và kiểm tra số lượng sản phẩm
        for (const item of chiTietSanPham) {
            const { masanpham, soluong, giatien } = item;

            // Kiểm tra số lượng sản phẩm
            const [product] = await connection.query(
                "SELECT soluong FROM SANPHAM WHERE masanpham = ?",
                [masanpham]
            );

            if (product.length === 0 || product[0].soluong < soluongSP) {
                throw new Error(`Sản phẩm ${masanpham} không đủ số lượng.`);
            }

            // Thêm chi tiết hóa đơn
            await connection.query(
                "INSERT INTO CHITIETDONHANG (madonhang, masanpham, giatien, soluong) VALUES (?, ?, ?, ?)",
                [madonhang, masanpham, soluong, giatien]
            );
        }

        // Trả thông tin hóa đơn, bao gồm thời gian lập
        return res.status(201).json({
            success: true,
            message: "Đặt hàng thành công.",
            madonhang,
            ngaylap: donhang[0]?.ngaylap // Trả thời gian lập hóa đơn từ database
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Lỗi khi đặt hàng.", error: error.message });
    }
};

module.exports = {
    getAllOrders,
    comfirmOrder,
}