"use strict";
const moment = require("moment");
let dotenv = require("dotenv");
let env = dotenv.config();

const path = require("path");
const fs = require("fs");
const db = require("../config/db");
function getFullTime() {
  let asiaTimeStart = new Date().toLocaleString("en-US", {
    timeZone: "Asia/Jakarta",
  });
  console.log(asiaTimeStart);
  let time = moment(asiaTimeStart, "MM/DD/YYYY").format("YYYY-MM-DD");
  console.log(time);
  return time;
}

let kesaksian = {
  getAllData: async (req, res) => {
    try {
      let qry = "SELECT * FROM kesaksianJemaat ORDER BY id DESC";
      
      const hasil = await db.query(qry);

      console.log(hasil);
      let response = {
        code: 200,
        message: "success",
        data: hasil,
      };
      console.log("response",response);
      res.status(200).send(response);
      return hasil;

    } catch (error) {
      let response = {
        code: 400,
        message:'error',
        error: error,
      };
      res.status(400).send(response);
    }
  },
  addOne: async (req, res) => {

    let nama = req.body.nama;
    if (nama == 0 || nama == null) {
      let response = {
        code: 400,
        message: "Error",
        error: "Nama tidak terisi",
      };
      res.status(400).send(response);
      return response;
    }

    let highlight = req.body.highlight;
    if (highlight == 0 || highlight == null) {
      let response = {
        code: 400,
        message: "Error",
        error: "Highlight tidak terisi",
      };
      res.status(400).send(response);
      return response;
    }

   
    let isi = req.body.isi;
    if (isi == 0 || isi == null) {
      let response = {
        code: 400,
        message: "Error",
        error: "tag tidak terisi",
      };
      res.status(400).send(response);
      return response;
    }
    let tag = req.body.tag;
    if (tag == 0 || tag == null) {
      let response = {
        code: 400,
        message: "Error",
        error: "tag tidak terisi",
      };
      res.status(400).send(response);
      return response;
    }
    // let waktuPembuatan = getFullTime();

    let image = req.files.image;
    console.log("img", image);
    let filesize = image.size;
    let ext = path.extname(image.name);
    let filename = image.md5 + ext;
        const url = `http://localhost:3013/images/${filename}`;

    // const url = `${req.protocol}://${req.get("host")}/images/${filename}`;
    let allowedType = [".png", ".jpg", ".jpeg"];

    if (!allowedType.includes(ext.toLowerCase())) {
      return res.status(422).json({ msg: "invalid Image" });
    }
    if (filesize > 5000000) {
      return res.status(422).json({ msg: " Size overload" });
    }

    if (image == 0 || image == null) {
      let response = {
        code: 400,
        message: "Error",
        error: "articleImage   tidak terisi",
      };
      res.status(400).send(response);
      return response;
    }
    image.mv(`./public/images/${filename}`, async (err) => {
      if (err) {
        return res.status(500).json({ msg: err.message });
      }

      try {
        let insertQry = `INSERT INTO kesaksianJemaat (nama, highlight, isi, tag, created_at, image, url)
        VALUES ('${nama}', '${highlight}','${isi}', '${tag}', '${getFullTime()}', '${filename}', '${url}')`;

        let hasilInsert = await db.query(insertQry);
        console.log("hasilInsert", hasilInsert);
        let response = {
          code: 201,
          message: "success",
          data: "data berhasil masuk",
        };
        console.log(response);
        return res.status(201).send(response);
      } catch (err) {
        console.log(err);
        let response = {
          code: 500,
          message: "error",
          error: err,
        };
        res.status(500).send(response);
      }
    });

    //
  },

  deleteOneData: async (req, res) => {
    let id = req.body.id;
    console.log('====================================');
    console.log("id",id);
    console.log('====================================');
    try {
      // Query to get the URL of the file you want to delete
      let urlQuery = `SELECT image FROM kesaksianJemaat WHERE id = '${id}'`;
      console.log('===============urlQuery=====================');
      console.log(urlQuery);
      console.log('====================================');
      let urlResult = await db.query(urlQuery);
      console.log('================bbbb====================');
      console.log(urlResult);
      console.log('====================================');
      const fileURL = urlResult[0].image;
      console.log(fileURL);
  
      // Deleting the file
      const filePath = path.join(__dirname, '..', 'public', 'images', fileURL);
  
      fs.unlink(filePath, (err) => {
        if (err) {
          console.log(err);
          let response = {
            code: 400,
            message: "File deletion failed",
            error: err,
          };
          res.status(400).send(response);
        } else {
          console.log(`File ${fileURL} has been deleted`);
  
          // Delete the record from the database
          let deleteQuery = `DELETE FROM kesaksianJemaat WHERE id = '${id}'`;
          db.query(deleteQuery)
            .then((result) => {
              console.log(result);
              let response = {
                code: 200,
                message: "File and record deleted successfully",
                data: result,
              };
              res.status(200).send(response);
            })
            .catch((error) => {
              console.log(error);
              let response = {
                code: 400,
                message: "Database record deletion failed",
                error: error,
              };
              res.status(400).send(response);
            });
        }
      });
  
      // Response should not be here
      return;
    } catch (error) {
      console.log(error);
      let response = {
        code: 400,
        message: "error",
        error: error.message,
      };
      res.status(400).send(response);
    }
  },
  updateOneData: async (req, res) => {
    try {
      const id = req.body.id; // Ambil ID dari request body
  
      // Validasi ID
      if (!id) {
        return res.status(400).json({ code: 400, message: "Error", error: "ID tidak ditemukan di request body" });
      }
  
      let nama = req.body.nama;
      if (!nama) {
        return res.status(400).json({ code: 400, message: "Error", error: "Nama tidak terisi" });
      }
  
      let isi = req.body.isi;
      if (!isi) {
        return res.status(400).json({ code: 400, message: "Error", error: "Isi Artikel tidak terisi" });
      }
  
      let highlight = req.body.highlight;
      if (!highlight) {
        return res.status(400).json({ code: 400, message: "Error", error: "highlight tidak terisi" });
      }
  
      let tag = req.body.tag;
      if (!tag) {
        return res.status(400).json({ code: 400, message: "Error", error: "Tag tidak terisi" });
      }
      console.log('====================================');
      console.log(req.body);
      console.log('====================================');
  
      let filename = null; // Nama file gambar baru
      let url = null; // URL gambar baru
  
      // Penanganan gambar jika ada unggahan baru
      if (req.files && req.files.image) {
        let image = req.files.image;
        let filesize = image.size;
        let ext = path.extname(image.name);
        filename = image.md5 + ext;
        url = `http://localhost:3013/images/${filename}`;
  
        let allowedType = [".png", ".jpg", ".jpeg"];
  
        if (!allowedType.includes(ext.toLowerCase())) {
          return res.status(422).json({ msg: "Invalid Image" });
        }
  
        if (filesize > 5000000) {
          return res.status(422).json({ msg: "Size overload" });
        }
  
        // Pindahkan gambar baru ke folder penyimpanan
        await new Promise((resolve, reject) => {
          image.mv(`./public/images/${filename}`, (err) => {
            if (err) {
              reject(err);
            } else {
              resolve();
            }
          });
        });
  
        // Ambil nama file gambar lama untuk dihapus
        const oldImageQuery = `SELECT image FROM kesaksianJemaat WHERE id = ${id}`;
        const oldImageResult = await db.query(oldImageQuery);
        const oldFilename = oldImageResult[0].image;
  
        // Hapus gambar lama jika ada
        if (oldFilename && oldFilename !== filename) {
          const oldImagePath = `./public/images/${oldFilename}`;
          const fs = require('fs').promises;
          try {
            await fs.unlink(oldImagePath);
          } catch (err) {
            console.error(`Gagal menghapus gambar lama: ${oldImagePath}`, err);
            // Anda mungkin ingin mencatat error ini tetapi tetap melanjutkan pembaruan artikel
          }
        }
      } else {
        // Jika tidak ada unggahan gambar baru, ambil URL gambar lama dari database
        const oldImageUrlQuery = `SELECT url FROM kesaksianJemaat WHERE id = ${id}`;
       
        const oldImageUrlResult = await db.query(oldImageUrlQuery);
        console.log('====================================');
        console.log(oldImageUrlResult);
        console.log('====================================');
        url = oldImageUrlResult[0].url;
        filename = oldImageUrlResult[0].url.split('/').pop()
      }
  
      // Update data artikel di database
      let updateQry = `UPDATE kesaksianJemaat SET nama = '${nama}', isi = '${isi}', highlight = '${highlight}', tag = '${tag}', image = '${filename}', url = '${url}' WHERE id = ${id}`;
      await db.query(updateQry);
  
      let response = {
        code: 200,
        message: "success",
        data: "Data berhasil diperbarui",
      };
      return res.status(200).send(response);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ code: 500, message: "error", error: err.message });
    }
  },
  
 
};
module.exports = kesaksian;
