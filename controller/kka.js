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

let kka = {
  getAllData: async (req, res) => {
    try {
      let qry = "SELECT * FROM kka";
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



  addKKA: async (req, res) => {
    let name = req.body.name;
    if (!name) {
      return res.status(400).json({ code: 400, message: "Error", error: "Nama KKA tidak terisi" });
    }

    let category = req.body.category;
    if (!category) {
      return res.status(400).json({ code: 400, message: "Error", error: "Kategori tidak terisi" });
    }

    let leader = req.body.leader;
    if (!leader) {
      return res.status(400).json({ code: 400, message: "Error", error: "Nama Leader tidak terisi" });
    }

    let contact = req.body.contact;
    if (!contact) {
      return res.status(400).json({ code: 400, message: "Error", error: "Kontak Leader tidak terisi" });
    }

    let day = req.body.day;
    if (!day) {
      return res.status(400).json({ code: 400, message: "Error", error: "Hari tidak terisi" });
    }

    let time = req.body.time;
    if (!time) {
      return res.status(400).json({ code: 400, message: "Error", error: "Waktu tidak terisi" });
    }

    let area = req.body.area;
    if (!area) {
      return res.status(400).json({ code: 400, message: "Error", error: "Wilayah tidak terisi" });
    }

    let imageFile = req.files && req.files.img;
    let url = null;

    if (imageFile) {
      let filesize = imageFile.size;
      let ext = path.extname(imageFile.name);
      let filename = imageFile.md5 + ext;
      url = `https://api.gppkcbn.org/images/${filename}`;
      let allowedType = [".png", ".jpg", ".jpeg"];

      if (!allowedType.includes(ext.toLowerCase())) {
        return res.status(422).json({ msg: "invalid Image" });
      }
      if (filesize > 5000000) {
        return res.status(422).json({ msg: " Size overload" });
      }

      try {
        await imageFile.mv(`./public/images/${filename}`);
      } catch (err) {
        console.error("Error moving image:", err);
        return res.status(500).json({ code: 500, message: "Error uploading image", error: err });
      }
    } else {
      return res.status(400).json({ code: 400, message: "Error", error: "Gambar tidak terisi" });
    }

    try {
      let insertQry = `INSERT INTO kka (name, category, leader, contact, image, day, time, area)
        VALUES ('${name}', '${category}', '${leader}', '${contact}', '${url}', '${day}', '${time}', '${area}')`;

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
      console.error(err);
      let response = {
        code: 500,
        message: "error",
        error: err,
      };
      return res.status(500).send(response);
    }
  },
  deleteKKA: async (req, res) => {
    let id = req.body.id;
    try {
      // Query to get the URL of the file you want to delete
      let urlQuery = `SELECT image FROM kka WHERE id = '${id}'`;
      console.log('===============urlQuery=====================');
      console.log(urlQuery);
      console.log('====================================');
      let urlResult = await db.query(urlQuery);
      console.log('================bbbb====================');
      console.log(urlResult);
      console.log('====================================');
      const fileURL = urlResult[0].image;
      console.log(fileURL);

      // Extract the filename from the URL
      const filename = fileURL.substring(fileURL.lastIndexOf('/') + 1);
      const filePath = path.join(__dirname, '..', 'public', 'images', filename);

      // Deleting the file
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
          console.log(`File ${filename} has been deleted`);

          // Delete the record from the database
          let deleteQuery = `DELETE FROM kka WHERE id = '${id}'`;
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
  editKKA: async (req, res) => {
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
module.exports = kka;
