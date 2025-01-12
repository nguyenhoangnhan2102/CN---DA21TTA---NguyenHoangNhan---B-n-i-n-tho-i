
const connection = require("../config/dataBase");

const getAllColorProduct = async (req, res) => {
    try {
        const query =
            `
        SELECT
            MAUSACSANPHAM.mamau,
            MAUSACSANPHAM.tenmausanpham,
            MAUSACSANPHAM.mausachinhanh,
            MAUSACSANPHAM.masanpham,
            MAUSACSANPHAM.trangthaimau,
            SANPHAM.tensanpham,
            SANPHAM.hinhanhchinh
        FROM
            MAUSACSANPHAM
        INNER JOIN
            SANPHAM
        ON
            MAUSACSANPHAM.masanpham = SANPHAM.masanpham
        WHERE
            MAUSACSANPHAM.trangthaimau = 0
        ORDER BY 
            MAUSACSANPHAM.created_at DESC
            `;
        //Thêm đường dẫn đầy đủ cho mỗi sản phẩm
        const [results] = await connection.query(query);
        return res.status(200).json({
            EM: "Lấy danh sách màu sản phẩm thành công",
            EC: 1,
            DT: results,
        });
    } catch (err) {
        console.error("Error fetching:", err);
        return res.status(500).json({
            EM: `Lỗi controller getAll: ${err.message}`,
            EC: -1,
            DT: [],
        });
    }
};

const createColorProduct = async (req, res) => {
    const {
        masanpham,
        tenmausanpham,
        mausachinhanh,
    } = req.body;

    try {
        const result = await connection.query(
            `INSERT INTO MAUSACSANPHAM (
                masanpham, 
                tenmausanpham,
                mausachinhanh
            ) VALUES (?, ?, ?)`,
            [
                masanpham,
                tenmausanpham,
                mausachinhanh,
            ]
        );
        return res.status(201).json({
            message: 'Màu sản phẩm đã được tạo thành công',
            product: {
                mamau: result.insertId, // Lấy ID tự động tăng của bản ghi
                masanpham,
                tenmausanpham,
                mausachinhanh,
            }
        });
    } catch (err) {
        console.error("Error creating color product:", err.message);
        res.status(500).json({ message: err.message });
    }
};


const updateColorProduct = async (req, res) => {
    const { mamau } = req.params;
    const {
        masanpham,
        tenmausanpham,
        mausachinhanh,
    } = req.body;

    try {
        const result = await connection.query(
            `
                UPDATE MAUSACSANPHAM
                SET
                masanpham = ?,
                tenmausanpham = ?,
                mausachinhanh = ?
                WHERE mamau = ?
            `,
            [
                masanpham,
                tenmausanpham,
                mausachinhanh,
                mamau
            ]
        );

        if (result[0].affectedRows > 0) {
            res.json({ message: "Color product updated" });
        } else {
            res.status(404).json({ message: "color product not found" });
        }
    } catch (err) {
        console.error("Error updating color product:", err.message);
        res.status(500).json({ message: err.message });
    }
}

const deleteColorProduct = async (req, res) => {
    try {
        const query = "UPDATE MAUSACSANPHAM SET trangthaimau = 1, update_at = CURRENT_TIMESTAMP WHERE mamau = ?";
        const [result] = await connection.query(query, [req.params.mamau]);
        if (result.affectedRows === 0) {
            return res.status(400).json({
                EM: "Không tìm thấy sản phẩm",
                EC: 0,
                DT: [],
            });
        }

        const [data] = await connection.query("SELECT * FROM MAUSACSANPHAM WHERE trangthaimau = 0");
        return res.status(200).json({
            EM: "Ẩn màu sản phẩm thành công",
            EC: 1,
            DT: data,
        });
    } catch (err) {
        console.error("Lỗi ẩn sản phẩm:", err);
        return res.status(500).json({
            EM: `Lỗi xóa sản phẩm: ${err.message}`,
            EC: -1,
            DT: [],
        });
    }
};




module.exports = {
    getAllColorProduct,
    createColorProduct,
    updateColorProduct,
    deleteColorProduct,
}