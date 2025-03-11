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

    let image = req.files.img;
    console.log("img", image);
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
  deleteKKA: async (req, res) => {
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
  editKKA: async (req, res) => {
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
  

};
module.exports = kka;
