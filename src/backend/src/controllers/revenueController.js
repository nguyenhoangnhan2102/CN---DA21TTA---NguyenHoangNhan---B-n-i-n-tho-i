const connection = require("../config/dataBase");


const getRevenueByDay = async (req, res) => {

    const { date } = req.query;

    const query = `
    SELECT 
      sp.tensanpham,
      SUM(ctdh.soluong * ctdh.giatien) AS total_revenue,
      SUM(ctdh.soluong) AS total_quantity
    FROM CHITIETDONHANG ctdh
    JOIN SANPHAM sp ON ctdh.masanpham = sp.masanpham
    JOIN DONHANG dh ON ctdh.madonhang = dh.madonhang
    WHERE DATE(dh.ngaydat) = ?
    GROUP BY sp.masanpham;
  `;

    connection.query(query, [date], (err, results) => {
        if (err) {
            console.error('Lỗi truy vấn:', err);
            return res.status(500).send('Lỗi máy chủ.');
        }
        res.json(results);
    });
}

module.exports = {
    getRevenueByDay
}