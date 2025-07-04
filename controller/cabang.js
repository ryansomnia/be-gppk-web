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

let cabang = {
  getAllData: async (req, res) => {
    try {
      let qry = "SELECT * FROM cabang";
      const hasil= await db.query(qry);

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


  addCabang: async (req, res) => {
    let namaCabang = req.body.namaCabang;
    if (namaCabang == 0 || namaCabang == null) {
      let response = {
        code: 400,
        message: "Error",
        error: "Judul Artikel tidak terisi",
      };
      res.status(400).send(response);
      return response;
    }

    let pastor = req.body.pastor;
    if (pastor == 0 || pastor == null) {
      let response = {
        code: 400,
        message: "Error",
        error: "Isi Artikel tidak terisi",
      };
      res.status(400).send(response);
      return response;
    }

    let address = req.body.address;
    if (address == 0 || address == null) {
      let response = {
        code: 400,
        message: "Error",
        error: "address tidak terisi",
      };
      res.status(400).send(response);
      return response;
    }
 
    // let waktuPembuatan = getFullTime();

    let image = req.files.img;  // Access the file from req.files
  console.log("img", image);

  if (!image) { // Check if image is present
    let response = {
      code: 400,
      message: "Error",
      error: "Gambar tidak terisi",
    };
    res.status(400).send(response);
    return response;
  }

    let filesize = image.size;
    let ext = path.extname(image.name);
    let filename = image.md5 + ext;
        const url = `https://api.gppkcbn.org/images/${filename}`;

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
        error: "Gambar tidak terisi",
      };
      res.status(400).send(response);
      return response;
    }
    image.mv(`./public/images/${filename}`, async (err) => {
      if (err) {
        return res.status(500).json({ msg: err.message });
      }

      try {
        let insertQry = `INSERT INTO cabang (namaCabang, img, pastor, address)
        VALUES ('${namaCabang}', '${url}', '${pastor}', '${address}')`;

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
  deleteCabang: async (req, res) => {
    let id = req.body.id;
    try {
      // Query to get the URL of the file you want to delete
      let urlQuery = `SELECT img FROM cabang WHERE id = '${id}'`;
      console.log('===============urlQuery=====================');
      console.log(urlQuery);
      console.log('====================================');
      let urlResult = await db.query(urlQuery);
      console.log('================bbbb====================');
      console.log(urlResult);
      console.log('====================================');
      const fileURL = urlResult[0].img;
      console.log(fileURL);
  
      // Deleting the file
      const filename = fileURL.substring(fileURL.lastIndexOf('/') + 1);
      const filePath = path.join(__dirname, '..', 'public', 'images', filename);
  
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
          let deleteQuery = `DELETE FROM cabang WHERE id = '${id}'`;
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
  editCabang: async (req, res) => {
    const id = req.body.id; // Ambil ID dari request body

    if (!id) {
      return res.status(400).json({ code: 400, message: "Error", error: "ID tidak ditemukan di request body" });
    }

    let nama = req.body.name;
    let category = req.body.category;
    let leader = req.body.leader;
    let contact = req.body.contact;
    let day = req.body.day;
    let time = req.body.time;
    let area = req.body.area;

    let updateFields = [];
    if (nama) updateFields.push(`name = '${nama}'`);
    if (category) updateFields.push(`category = '${category}'`);
    if (leader) updateFields.push(`leader = '${leader}'`);
    if (contact) updateFields.push(`contact = '${contact}'`);
    if (day) updateFields.push(`day = '${day}'`);
    if (time) updateFields.push(`time = '${time}'`);
    if (area) updateFields.push(`area = '${area}'`);

    let filename = null; // Nama file gambar baru
    let url = null; // URL gambar baru
    let imageFile = req.files && req.files.img;

    if (imageFile) {
      let filesize = imageFile.size;
      let ext = path.extname(imageFile.name);
      filename = imageFile.md5 + ext;
      url = `https://api.gppkcbn.org/images/${filename}`;
      let allowedType = [".png", ".jpg", ".jpeg"];

      if (!allowedType.includes(ext.toLowerCase())) {
        return res.status(422).json({ msg: "invalid Image" });
      }
      if (filesize > 5000000) {
        return res.status(422).json({ msg: " Size overload" });
      }

      await imageFile.mv(`./public/images/${filename}`);
      updateFields.push(`image = '${url}'`);

      // Delete old image if it exists
      try {
        let oldUrlQuery = `SELECT image FROM kka WHERE id = '${id}'`;
        let oldUrlResult = await db.query(oldUrlQuery);
        if (oldUrlResult && oldUrlResult.length > 0 && oldUrlResult[0].image) {
          const oldFileUrl = oldUrlResult[0].image.replace('https://api.gppkcbn.org/images/', '');
          const oldFilePath = path.join(__dirname, '..', 'public', 'images', oldFileUrl);
          fs.unlink(oldFilePath, (err) => {
            if (err && err.code !== 'ENOENT') {
              console.log("Error deleting old image:", err);
            } else {
              console.log(`Old image ${oldFileUrl} deleted`);
            }
          });
        }
      } catch (error) {
        console.log("Error deleting old image:", error);
      }
    }

    if (updateFields.length === 0) {
      return res.status(200).json({ code: 200, message: "No data to update" });
    }

    const updateQuery = `UPDATE kka SET ${updateFields.join(', ')} WHERE id = '${id}'`;

    try {
      const result = await db.query(updateQuery);
      console.log(result);
      res.status(200).json({ code: 200, message: "Data updated successfully", data: result });
    } catch (error) {
      console.error(error);
      res.status(500).json({ code: 500, message: "Error updating data", error: error });
    }
  },
  

};
module.exports = cabang;
