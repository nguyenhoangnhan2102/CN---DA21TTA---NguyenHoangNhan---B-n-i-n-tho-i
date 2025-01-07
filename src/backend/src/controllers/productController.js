
const connection = require("../config/dataBase");

const getAllProduct = async (req, res) => {
    try {
        const queryActive = `
        SELECT
            sp.*,
            th.tenthuonghieu,
            GROUP_CONCAT(DISTINCT ms.mamau) AS danhsachmamau,
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
        WHERE
            sp.trangthai = 0
        GROUP BY
            sp.masanpham
        ORDER BY
            sp.created_at DESC;
        `;

        const queryInactive = `
        SELECT
            sp.*,
            th.tenthuonghieu,
            GROUP_CONCAT(DISTINCT ms.mamau) AS danhsachmamau,
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
        WHERE
            sp.trangthai = 1
        GROUP BY
            sp.masanpham
        ORDER BY
            sp.created_at DESC;
        `;

        const [activeResults] = await connection.query(queryActive);
        const [inactiveResults] = await connection.query(queryInactive);

        return res.status(200).json({
            EM: "Lấy danh sách sản phẩm thành công",
            EC: 1,
            DT: {
                activeProducts: activeResults,
                inactiveProducts: inactiveResults,
            },
        });

    } catch (err) {
        console.error("Error fetching products:", err);
        return res.status(500).json({
            EM: `Lỗi lấy danh sách tất cả sản phẩm: ${err.message}`,
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
            GROUP_CONCAT(DISTINCT ms.mamau) AS danhsachmamau,
            GROUP_CONCAT(DISTINCT ms.tenmausanpham) AS danhsachmausac,
            GROUP_CONCAT(DISTINCT ms.mausachinhanh) AS danhsachmausacsanpham,
            GROUP_CONCAT(DISTINCT ha.hinhanhkhac) AS danhsachhinhanh
        FROM
            SANPHAM sp
        JOIN 
            THUONGHIEU th ON sp.mathuonghieu = th.mathuonghieu
        LEFT JOIN
            MAUSACSANPHAM ms ON sp.masanpham = ms.masanpham
        LEFT JOIN
            HINHANHSANPHAM ha ON sp.masanpham = ha.masanpham
        WHERE 
            sp.masanpham = ?
        GROUP BY
            sp.masanpham
        `;

        const [results] = await connection.query(query, [masanpham]);

        if (results.length === 0) {
            return res.status(404).json({
                EM: "Product not found",
                EC: 0,
                DT: [],
            });
        }

        // Chuyển đổi danhsachmamau thành mảng số nguyên
        const product = results[0];
        product.danhsachmamau = product.danhsachmamau ? product.danhsachmamau.split(',').map(Number) : [];

        return res.status(200).json({
            EM: "Lấy thông tin sản phẩm thành công",
            EC: 1,
            DT: product,
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
        hinhanhchinh,
        trangthai,
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
            hinhanhchinh,
            trangthai
            )
            VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) `,
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
                trangthai,
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
                hinhanhchinh,
                trangthai
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
        hinhanhchinh,
        trangthai,
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
                hinhanhchinh = ?,
                trangthai = ?
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
                trangthai,
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
        const query = "UPDATE SANPHAM SET trangthai = 1 WHERE masanpham = ?";
        const [result] = await connection.query(query, [req.params.masanpham]);
        if (result.affectedRows === 0) {
            return res.status(400).json({
                EM: "Không tìm thấy sản phẩm",
                EC: 0,
                DT: [],
            });
        }

        const [data] = await connection.query("SELECT * FROM SANPHAM WHERE trangthai = 0");
        return res.status(200).json({
            EM: "Ẩn sản phẩm thành công",
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

const updateStatusProduct = async (req, res) => {
    const { masanpham } = req.params; // Product ID
    const { trangthai } = req.body; // New status

    if (trangthai === undefined || !Number.isInteger(trangthai)) {
        return res.status(400).json({
            EM: "Trạng thái sản phẩm không hợp lệ",
            EC: -1,
            DT: [],
        });
    }
    try {
        // Update query
        const [updateResult] = await connection.execute(
            "UPDATE SANPHAM SET trangthai = ? WHERE masanpham = ?",
            [trangthai, masanpham]
        );

        if (updateResult.affectedRows === 0) {
            return res.status(404).json({
                EM: "Không tìm thấy sản phẩm",
                EC: 0,
                DT: [],
            });
        }

        return res.status(200).json({
            EM: "Cập nhật trạng thái thành công",
            EC: 1,
            DT: updateResult,
        });
    } catch (err) {
        return res.status(500).json({
            EM: `Lỗi cập nhật trạng thái: ${err.message}`,
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
    updateStatusProduct,
}