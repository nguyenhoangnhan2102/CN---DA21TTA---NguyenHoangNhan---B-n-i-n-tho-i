
const connection = require("../config/dataBase");

const getAllManufacturer = async (req, res) => {
    try {
        const query = `
            SELECT 
                TH.mathuonghieu,
                TH.tenthuonghieu,
                GROUP_CONCAT(SP.tensanpham SEPARATOR ', ') AS sanphams
            FROM 
                THUONGHIEU TH
            LEFT JOIN 
                SANPHAM SP 
            ON 
                TH.mathuonghieu = SP.mathuonghieu
            GROUP BY 
                TH.mathuonghieu, TH.tenthuonghieu;
        `;
        const [results] = await connection.query(query);
        return res.status(200).json({
            EM: "Lấy danh sách thương hiệu thành công",
            EC: 1,
            DT: results,
        });
    } catch (err) {
        console.error("Error fetching Manufacturer:", err);
        return res.status(500).json({
            EM: `Lỗi controller getAllManufacturer: ${err.message}`,
            EC: -1,
            DT: [],
        });
    }
};


const createManufacture = async (req, res) => {
    const {
        tenthuonghieu,
    } = req.body;

    try {
        const result = await connection.query
            (
                `INSERT INTO THUONGHIEU (tenthuonghieu) VALUES(?) `, [tenthuonghieu,]
            );
        // res.status(201).json({ message: "Product created", masanpham: result[0].insertId });
        return res.status(201).json({
            message: 'Thương hiệu đã được tạo thành công',
            manufacturer: {
                mathuonghieu: result[0].insertId,
                tenthuonghieu,
            }
        });
    } catch (err) {
        console.error("Error creating manufacturer:", err.message);
        res.status(500).json({ message: err.message });
    }
}

const updateManufacture = async (req, res) => {
    const { mathuonghieu } = req.params;
    const {
        tenthuonghieu,
    } = req.body;

    try {
        const result = await connection.query
            (
                ` UPDATE THUONGHIEU SET tenthuonghieu = ? WHERE mathuonghieu = ? `, [tenthuonghieu, mathuonghieu]
            );

        if (result[0].affectedRows > 0) {
            res.json({ message: "Manufacturer updated" });
        } else {
            res.status(404).json({ message: "Manufacturer not found" });
        }
    } catch (err) {
        console.error("Error updating Manufacturer:", err.message);
        res.status(500).json({ message: err.message });
    }
}

const deleteManufacture = async (req, res) => {
    try {
        const query = "DELETE FROM THUONGHIEU WHERE mathuonghieu = ?";
        const [result] = await connection.query(query, [req.params.mathuonghieu]);
        console.log("result", result);
        if (result.affectedRows === 0) {
            return res.status(400).json({
                EM: "Manufacturer not found",
                EC: 0,
                DT: [],
            });
        }
        const [data_deleted, filed_data] = await connection.query(`SELECT * FROM THUONGHIEU`);
        console.log("data_deleted", data_deleted);
        return res.status(200).json({
            EM: "Xóa thương hiệu thành công",
            EC: 1,
            DT: data_deleted,
        });
    } catch (err) {
        console.error("Error deleting manufacturer:", err);
        return res.status(500).json({
            EM: `Lỗi controller deleteManufacture: ${err.message}`,
            EC: -1,
            DT: [],
        });
    }
};


module.exports = {
    getAllManufacturer,
    deleteManufacture,
    createManufacture,
    updateManufacture,
}