const connection = require("../config/dataBase");


const getRevenueByDay = async (req, res) => {

  const { ngay } = req.query; // Ngày theo định dạng YYYY-MM-DD
  const query = `
    SELECT SUM(ctgd.giatien * ctgd.soluong) AS doanhthu
    FROM DONHANG dh
    JOIN CHITIETDONHANG ctgd ON dh.madonhang = ctgd.madonhang
    WHERE DATE(dh.ngaydat) = ?
  `;

  connection.execute(query, [ngay], (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Lỗi truy vấn dữ liệu' });
      return;
    }
    res.json({ doanhthu: results[0].doanhthu || 0 });
  });
}

module.exports = {
  getRevenueByDay
}