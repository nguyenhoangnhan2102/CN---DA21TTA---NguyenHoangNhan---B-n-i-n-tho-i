const connection = require("../config/dataBase");


const getRevenueByDay = async (req, res) => {

  const { date } = req.query; // Định dạng ngày: YYYY-MM-DD

  const query = `
    SELECT DATE(ngaylap) AS ngay, SUM(tongtien) AS doanhthu
    FROM HOADON
    WHERE DATE(ngaylap) = ? AND trangthaihoadon = 1
    GROUP BY DATE(ngaylap);
  `;

  connection.query(query, [date], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Database query error' });
    }
    res.json(results);
  });
}

module.exports = {
  getRevenueByDay
}