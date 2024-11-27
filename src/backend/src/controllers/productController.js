
const connection = require("../config/dataBase");

const getAllProduct = async (req, res) => {
    try {
        const query =
            `
        SELECT
            sp.*,
            th.tenthuonghieu,
            GROUP_CONCAT(DISTINCT ms.tenmausanpham) AS danhsachmausac,
            GROUP_CONCAT(DISTINCT ms.mausachinhanh) AS danhsachmausacsanpham,
            GROUP_CONCAT(DISTINCT ha.hinhanhkhac) AS danhsachhinhanh
        FROM
            SANPHAM sp
        LEFT JOIN
            THUONGHIEU th ON sp.mathuonghieu = th.mathuonghieu
        LEFT JOIN
            MAUSACSANPHAM ms ON sp.masanpham = ms.masanpham
        LEFT JOIN
            HINHANHSANPHAM ha ON sp.masanpham = ha.masanpham
        GROUP BY
            sp.masanpham;
        `;
        //Thêm đường dẫn đầy đủ cho mỗi sản phẩm
        const [results] = await connection.query(query);
        return res.status(200).json({
            EM: "Lấy danh sách sản phẩm thành công",
            EC: 1,
            DT: results,
        });
    } catch (err) {
        console.error("Error fetching products:", err);
        return res.status(500).json({
            EM: `Lỗi controller getAllProducts: ${err.message}`,
            EC: -1,
            DT: [],
        });
    }
};

const getDetailProduct = async (req, res) => {
    let masanpham = req.params.masanpham;
    try {
        const query = `
        SELECT 
            sp.*, 
            th.tenthuonghieu,
            GROUP_CONCAT(DISTINCT ms.tenmausanpham) AS danhsachmausac,
            GROUP_CONCAT(DISTINCT ms.mausachinhanh) AS danhsachmausacsanpham,
            GROUP_CONCAT(DISTINCT ha.hinhanhkhac) AS danhsachhinhanh
        FROM 
            SANPHAM sp
        LEFT JOIN
            THUONGHIEU th ON sp.mathuonghieu = th.mathuonghieu
        LEFT JOIN
            MAUSACSANPHAM ms ON sp.masanpham = ms.masanpham
        LEFT JOIN
            HINHANHSANPHAM ha ON sp.masanpham = ha.masanpham
        WHERE sp.masanpham = ?
        `;

        const [results] = await connection.query(query, [req.params.masanpham]);

        if (results.length === 0) {
            return res.status(404).json({
                EM: "Product not found",
                EC: 0,
                DT: [],
            });
        }

        return res.status(200).json({
            EM: "Lấy thông tin sản phẩm thành công",
            EC: 1,
            DT: results[0],
        });
    } catch (err) {
        console.error("Error fetching:", err);
        return res.status(500).json({
            EM: `Lỗi controller: ${err.message}`,
            EC: -1,
            DT: [],
        });
    }
};

const createProduct = async (req, res) => {
    const {
        mathuonghieu,
        tensanpham,
        giasanpham,
        soluongsanpham,
        hedieuhanh,
        cpu,
        gpu,
        ram,
        dungluong,
        cameratruoc,
        camerasau,
        congnghemanhinh,
        dophangiaimanhinh,
        pin,
        motasanpham,
        hinhanhchinh
    } = req.body;

    try {
        const result = await connection.query(
            `INSERT INTO SANPHAM (
            mathuonghieu, 
            tensanpham, 
            giasanpham, 
            soluongsanpham,
            hedieuhanh,
            cpu, 
            gpu,
            ram, 
            dungluong,
            cameratruoc,
            camerasau, 
            congnghemanhinh,
            dophangiaimanhinh,
            pin, 
            motasanpham,
            hinhanhchinh)
            VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) `,
            [
                mathuonghieu,
                tensanpham,
                giasanpham,
                soluongsanpham,
                hedieuhanh,
                cpu,
                gpu,
                ram,
                dungluong,
                cameratruoc,
                camerasau,
                congnghemanhinh,
                dophangiaimanhinh,
                pin,
                motasanpham,
                hinhanhchinh,
            ]
        );
        // res.status(201).json({ message: "Product created", masanpham: result[0].insertId });
        return res.status(201).json({
            message: 'Sản phẩm đã được tạo thành công',
            product: {
                masanpham: result.insertId,
                mathuonghieu,
                tensanpham,
                giasanpham,
                soluongsanpham,
                hedieuhanh,
                cpu,
                gpu,
                ram,
                dungluong,
                cameratruoc,
                camerasau,
                congnghemanhinh,
                dophangiaimanhinh,
                pin,
                motasanpham,
                hinhanhchinh
            }
        });
    } catch (err) {
        console.error("Error creating product:", err.message);
        res.status(500).json({ message: err.message });
    }
}

const updateProduct = async (req, res) => {
    const { masanpham } = req.params;
    const {
        mathuonghieu,
        tensanpham,
        giasanpham,
        soluongsanpham,
        hedieuhanh,
        cpu,
        gpu,
        ram,
        dungluong,
        cameratruoc,
        camerasau,
        congnghemanhinh,
        dophangiaimanhinh,
        pin,
        motasanpham,
        hinhanhchinh
    } = req.body;

    try {
        const result = await connection.query(
            `
                UPDATE SANPHAM
                SET
                mathuonghieu = ?,
                tensanpham = ?,
                giasanpham = ?,
                soluongsanpham = ?,
                hedieuhanh = ?,
                cpu = ?,
                gpu = ?,
                ram = ?,
                dungluong = ?,
                cameratruoc = ?,
                camerasau = ?,
                congnghemanhinh = ?,
                dophangiaimanhinh = ?,
                pin = ?,
                motasanpham = ?,
                hinhanhchinh = ?
                WHERE masanpham = ?
            `,
            [
                mathuonghieu,
                tensanpham,
                giasanpham,
                soluongsanpham,
                hedieuhanh,
                cpu,
                gpu,
                ram,
                dungluong,
                cameratruoc,
                camerasau,
                congnghemanhinh,
                dophangiaimanhinh,
                pin,
                motasanpham,
                hinhanhchinh,
                masanpham
            ]
        );

        if (result[0].affectedRows > 0) {
            res.json({ message: "Product updated" });
        } else {
            res.status(404).json({ message: "product not found" });
        }
    } catch (err) {
        console.error("Error updating product:", err.message);
        res.status(500).json({ message: err.message });
    }
}

const deleteProduct = async (req, res) => {
    try {
        const query = "DELETE FROM SANPHAM WHERE masanpham = ?";
        const [result] = await connection.query(query, [req.params.masanpham]);
        console.log("result", result);
        if (result.affectedRows === 0) {
            return res.status(400).json({
                EM: "Product not found",
                EC: 0,
                DT: [],
            });
        }
        const [data_deleted, filed_data] = await connection.query(`SELECT * FROM SANPHAM`);
        console.log("data_deleted", data_deleted);
        return res.status(200).json({
            EM: "Xóa sản phẩm thành công",
            EC: 1,
            DT: data_deleted,
        });
    } catch (err) {
        console.error("Error deleting product:", err);
        return res.status(500).json({
            EM: `Lỗi controller deleteMovieById: ${err.message}`,
            EC: -1,
            DT: [],
        });
    }
};


module.exports = {
    getAllProduct,
    getDetailProduct,
    deleteProduct,
    createProduct,
    updateProduct,
}