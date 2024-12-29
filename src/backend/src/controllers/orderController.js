const connection = require("../config/dataBase");

const getAllOrders = async (req, res) => {
    try {
        const [rows, fields] = await connection.query(`
        SELECT 
            d.madonhang,
            s.tensanpham,
            s.masanpham,
            d.hotenkhachhang AS hotenkhachhang,
            d.diachigiaohang AS diachigiaohang,
            d.sdtkhachhang AS sodienthoaikhachhang,
            s.giasanpham,
            s.soluongsanpham AS tongsoluongsanpham,
            d.tongtien,
            m.tenmausanpham,
            m.mausachinhanh,
            d.ngaylap,
            d.trangthaidonhang
        FROM DONHANG d
        JOIN CHITIETDONHANG c ON d.madonhang = c.madonhang
        JOIN SANPHAM s ON c.masanpham = s.masanpham
        JOIN KHACHHANG k ON d.makhachhang = k.makhachhang
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
        trangthaidonhang,
        ngaylap,
        tongtien,
        chiTietSanPham,
        soluong,
    } = req.body;

    if (!makhachhang || !chiTietSanPham || chiTietSanPham.length === 0) {
        return res.status(400).json({ success: false, message: "Thiếu thông tin đơn hàng." });
    }

    try {
        // Thêm đơn hàng mới vào bảng DONHANG
        const [result] = await connection.query(
            "INSERT INTO DONHANG (ngaylap, trangthaidonhang, hotenkhachhang, sdtkhachhang, diachigiaohang, tongtien, makhachhang) VALUES (?, ?, ?, ?, ?, ?, ?)",
            [ngaylap, trangthaidonhang, hotenkhachhang, sdtkhachhang, diachigiaohang, tongtien, makhachhang]
        );

        const madonhang = result.insertId;

        // Kiểm tra số lượng sản phẩm trong kho và xử lý chi tiết đơn hàng
        for (const item of chiTietSanPham) {
            const { masanpham, soluong, giatien } = item;

            // Kiểm tra số lượng sản phẩm hiện tại trong kho
            const [product] = await connection.query(
                "SELECT soluongsanpham FROM SANPHAM WHERE masanpham = ?",
                [masanpham]
            );

            if (!product || product.soluongsanpham < soluong) {
                return res.status(400).json({
                    success: false,
                    message: `Sản phẩm mã ${masanpham} không đủ số lượng trong kho.`,
                });
            }

            // Trừ số lượng sản phẩm trong kho
            await connection.query(
                "UPDATE SANPHAM SET soluongsanpham = soluongsanpham - ? WHERE masanpham = ?",
                [soluong, masanpham]
            );

            // Thêm chi tiết đơn hàng vào bảng CHITIETDONHANG
            await connection.query(
                "INSERT INTO CHITIETDONHANG (madonhang, masanpham, giatien, soluong) VALUES (?, ?, ?, ?)",
                [madonhang, masanpham, giatien, soluong]
            );
        }

        // Trả về phản hồi thành công
        return res.status(200).json({
            success: true,
            message: "Đặt hàng thành công.",
            madonhang,
        });
    } catch (error) {
        console.error("Error during order confirmation:", error);
        return res.status(500).json({
            success: false,
            message: "Đã xảy ra lỗi khi xác nhận đơn hàng.",
        });
    }
};

module.exports = {
    getAllOrders,
    comfirmOrder,
}