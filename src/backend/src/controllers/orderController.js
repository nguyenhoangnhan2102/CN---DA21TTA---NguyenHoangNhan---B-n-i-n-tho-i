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


module.exports = {
    getAllOrders,
}