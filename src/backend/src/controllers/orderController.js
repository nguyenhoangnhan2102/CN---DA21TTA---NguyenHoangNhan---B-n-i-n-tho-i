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

    // Kiểm tra tính hợp lệ của thông tin
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

        // Lấy thời gian lập hóa đơn vừa thêm
        const [donhang] = await connection.query(
            "SELECT ngaylap FROM DONHANG WHERE madonhang = ?",
            [madonhang]
        );

        // Duyệt qua các sản phẩm trong giỏ hàng
        for (const item of chiTietSanPham) {
            const { masanpham, soluong, giatien } = item;

            // // Kiểm tra số lượng sản phẩm trong kho (nếu cần)
            // const [sanpham] = await connection.query(
            //     "SELECT soluong FROM SANPHAM WHERE masanpham = ?",
            //     [masanpham]
            // );
            // if (sanpham[0].soluong < soluong) {
            //     return res.status(400).json({ success: false, message: `Số lượng sản phẩm ${masanpham} không đủ.` });
            // }

            // Thêm chi tiết đơn hàng vào bảng CHITIETDONHANG
            await connection.query(
                "INSERT INTO CHITIETDONHANG (madonhang, masanpham, giatien, soluong) VALUES (?, ?, ?, ?)",
                [madonhang, masanpham, giatien, soluong]
            );

            // // Giảm số lượng sản phẩm trong kho sau khi đặt hàng (nếu cần)
            // await connection.query(
            //     "UPDATE SANPHAM SET soluong = soluong - ? WHERE masanpham = ?",
            //     [soluong, masanpham]
            // );
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