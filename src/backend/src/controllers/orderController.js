const connection = require("../config/dataBase");
const moment = require('moment-timezone');

const getAllOrders = async (req, res) => {
    try {
        const [rows, fields] = await connection.query(`
        SELECT 
            d.madonhang, 
            d.makhachhang, 
            d.ngaydat, 
            d.trangthaidonhang, 
            d.tongtien, 
            d.hotenkhachhang, 
            d.sdtkhachhang, 
            d.diachigiaohang, 
            d.created_at, 
            d.update_at,
            ctdh.masanpham, 
            ctdh.mamau, 
            ctdh.giatien, 
            ctdh.soluong,
            s.tensanpham, 
            ms.tenmausanpham,
            ms.mausachinhanh
        FROM 
            DONHANG d
        LEFT JOIN 
            CHITIETDONHANG ctdh ON d.madonhang = ctdh.madonhang
        LEFT JOIN 
            SANPHAM s ON ctdh.masanpham = s.masanpham
        LEFT JOIN 
            MAUSACSANPHAM ms ON ctdh.mamau = ms.mamau
        ORDER BY 
            d.created_at DESC
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
        const ngaydat = moment.utc().add(2, 'hours').format('YYYY-MM-DD HH:mm:ss');

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

const updateOrders = async (req, res) => {
    const madonhang = req.params.madonhang;  // Thay 'mahoadon' thành 'madonhang'
    const { trangthaidonhang } = req.body;

    // Kiểm tra xem trạng thái đơn hàng có hợp lệ hay không
    if (trangthaidonhang === undefined || !Number.isInteger(trangthaidonhang)) {
        return res.status(400).json({
            EM: "Trạng thái đơn hàng không hợp lệ",
            EC: -1,
            DT: [],
        });
    }

    try {
        // Kiểm tra trạng thái hiện tại của đơn hàng
        const [currentOrder] = await connection.execute(
            "SELECT trangthaidonhang FROM DONHANG WHERE madonhang = ?",
            [madonhang]
        );

        if (currentOrder.length === 0) {
            return res.status(404).json({
                EM: "Không tìm thấy đơn hàng",
                EC: 0,
                DT: [],
            });
        }

        // Nếu trạng thái mới là "Đã giao" (trạng thái = 1), trừ số lượng sản phẩm trong kho
        if (trangthaidonhang === 1 && currentOrder[0].trangthaidonhang !== 1) {
            const [orderDetails] = await connection.execute(
                "SELECT masanpham, soluong FROM CHITIETDONHANG WHERE madonhang = ?",
                [madonhang]
            );

            // Cập nhật số lượng sản phẩm trong bảng SANPHAM
            for (const item of orderDetails) {
                const [updateResult] = await connection.execute(
                    "UPDATE SANPHAM SET soluongsanpham = soluongsanpham - ? WHERE masanpham = ? AND soluongsanpham >= ?",
                    [item.soluong, item.masanpham, item.soluong]
                );

                if (updateResult.affectedRows === 0) {
                    return res.status(400).json({
                        EM: `Không đủ số lượng sản phẩm mã ${item.masanpham}`,
                        EC: -1,
                        DT: [],
                    });
                }
            }
        }

        // Cập nhật trạng thái đơn hàng
        const [updateResult] = await connection.execute(
            "UPDATE DONHANG SET trangthaidonhang = ? WHERE madonhang = ?",
            [trangthaidonhang, madonhang]
        );

        if (updateResult.affectedRows === 0) {
            return res.status(404).json({
                EM: "Không tìm thấy đơn hàng",
                EC: 0,
                DT: [],
            });
        }

        return res.status(200).json({
            EM: "Cập nhật trạng thái đơn hàng thành công",
            EC: 1,
            DT: updateResult,
        });
    } catch (err) {
        return res.status(500).json({
            EM: `Lỗi cập nhật trạng thái đơn hàng: ${err.message}`,
            EC: -1,
            DT: [],
        });
    }
};


module.exports = {
    getAllOrders,
    confirmOrder,
    updateOrders,
}