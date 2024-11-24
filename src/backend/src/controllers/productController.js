
const connection = require("../config/dataBase");

const getAllProduct = async (req, res) => {
    try {
        const query = `
        SELECT sp.*,
             l.tenloai, nsx.tennhasanxuat
             FROM SANPHAM sp
             JOIN LOAISANPHAM l ON sp.maloai = l.maloai
             JOIN NHASANXUAT nsx ON sp.manhasanxuat = nsx.manhasanxuat
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
        SELECT sp.masanpham, sp.tensanpham, sp.gia, sp.soluong, sp.mota, sp.hinhanh,
               l.tenloai, nsx.tennhasanxuat
        FROM SANPHAM sp
        JOIN LOAISANPHAM l ON sp.maloai = l.maloai
        JOIN NHASANXUAT nsx ON sp.manhasanxuat = nsx.manhasanxuat
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
        tensanpham,
        gia,
        soluong,
        mota,
        hinhanh,
        maloai,
        manhasanxuat,
    } = req.body;

    try {
        const result = await connection.query(
            "INSERT INTO SANPHAM (tensanpham, gia, soluong, mota, hinhanh, maloai, manhasanxuat) VALUES (?, ?, ?, ?, ?, ?, ?)",
            [
                tensanpham,
                gia,
                soluong,
                mota,
                hinhanh,
                maloai,
                manhasanxuat,
            ]
        );
        res.status(201).json({ message: "Product created", masanpham: result[0].insertId });
    } catch (err) {
        console.error("Error creating product:", err.message);
        res.status(500).json({ message: err.message });
    }
}

const updateProduct = async (req, res) => {
    const { masanpham } = req.params;
    const {
        tensanpham,
        gia,
        soluong,
        mota,
        hinhanh,
        maloai,
        manhasanxuat,
    } = req.body;

    try {
        const result = await connection.query(
            "UPDATE SANPHAM SET tensanpham = ?, gia = ?, soluong = ?, mota = ?, hinhanh = ?, maloai = ?, manhasanxuat = ? WHERE masanpham = ?",
            [
                tensanpham,
                gia,
                soluong,
                mota,
                hinhanh,
                maloai,
                manhasanxuat,
                masanpham,
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

// const UploadFile = async (req, res) => {
//     try {
//         // Multer sẽ lưu file trong `req.file`
//         if (!req.file) {
//             return res.status(400).send("No file uploaded.");
//         }

//         // Lấy thông tin file đã upload
//         console.log(req.file);

//         // Trả về response thành công
//         return res.status(200).json({
//             message: "File uploaded successfully",
//             file: req.file.filename,
//         });
//     } catch (error) {
//         console.error(error);
//         res.status(500).send("Server error");
//     }
// };


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