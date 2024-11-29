
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
            SANPHAM.tensanpham,
            SANPHAM.hinhanhchinh
        FROM
            MAUSACSANPHAM
        INNER JOIN
            SANPHAM
        ON
            MAUSACSANPHAM.masanpham = SANPHAM.masanpham;
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


// const updateColorProduct = async (req, res) => {
//     const { masanpham } = req.params;
//     const {
//         mathuonghieu,
//         tensanpham,
//         giasanpham,
//         soluongsanpham,
//         hedieuhanh,
//         cpu,
//         gpu,
//         ram,
//         dungluong,
//         cameratruoc,
//         camerasau,
//         congnghemanhinh,
//         dophangiaimanhinh,
//         pin,
//         motasanpham,
//         hinhanhchinh
//     } = req.body;

//     try {
//         const result = await connection.query(
//             `
//                 UPDATE SANPHAM
//                 SET
//                 mathuonghieu = ?,
//                 tensanpham = ?,
//                 giasanpham = ?,
//                 soluongsanpham = ?,
//                 hedieuhanh = ?,
//                 cpu = ?,
//                 gpu = ?,
//                 ram = ?,
//                 dungluong = ?,
//                 cameratruoc = ?,
//                 camerasau = ?,
//                 congnghemanhinh = ?,
//                 dophangiaimanhinh = ?,
//                 pin = ?,
//                 motasanpham = ?,
//                 hinhanhchinh = ?
//                 WHERE masanpham = ?
//             `,
//             [
//                 mathuonghieu,
//                 tensanpham,
//                 giasanpham,
//                 soluongsanpham,
//                 hedieuhanh,
//                 cpu,
//                 gpu,
//                 ram,
//                 dungluong,
//                 cameratruoc,
//                 camerasau,
//                 congnghemanhinh,
//                 dophangiaimanhinh,
//                 pin,
//                 motasanpham,
//                 hinhanhchinh,
//                 masanpham
//             ]
//         );

//         if (result[0].affectedRows > 0) {
//             res.json({ message: "Product updated" });
//         } else {
//             res.status(404).json({ message: "product not found" });
//         }
//     } catch (err) {
//         console.error("Error updating product:", err.message);
//         res.status(500).json({ message: err.message });
//     }
// }

// const deleteColorProduct = async (req, res) => {
//     try {
//         const query = "DELETE FROM SANPHAM WHERE masanpham = ?";
//         const [result] = await connection.query(query, [req.params.masanpham]);
//         console.log("result", result);
//         if (result.affectedRows === 0) {
//             return res.status(400).json({
//                 EM: "Product not found",
//                 EC: 0,
//                 DT: [],
//             });
//         }
//         const [data_deleted, filed_data] = await connection.query(`SELECT * FROM SANPHAM`);
//         console.log("data_deleted", data_deleted);
//         return res.status(200).json({
//             EM: "Xóa sản phẩm thành công",
//             EC: 1,
//             DT: data_deleted,
//         });
//     } catch (err) {
//         console.error("Error deleting product:", err);
//         return res.status(500).json({
//             EM: `Lỗi controller deleteMovieById: ${err.message}`,
//             EC: -1,
//             DT: [],
//         });
//     }
// };




module.exports = {
    getAllColorProduct,
    createColorProduct,
    // updateColorProduct,
    // deleteColorProduct,
}