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

let artikel = {
  getAllData: async (req, res) => {
    try {
      let qry = "SELECT * FROM articles ORDER BY idArtikel DESC";
      
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
  newBahanKKA: async(req, res) =>{
    try {
      let qry = "SELECT * FROM materiKKA WHERE status = '1' ;";
      
      const [hasil] = await db.query(qry);

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
  getBahanKKA: async(req, res) =>{
    try {
      let qry = "SELECT * FROM materiKKA ORDER BY idMateri DESC;";
      
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
  getDataByKategori: async (req, res) => {
    let kategori = req.body.kategori;
    try {
      let qry = `SELECT * FROM articles WHERE kategori = '${kategori}' ORDER BY idArtikel DESC`;

      let result = await db.query(qry);
      console.log('====================================');
      console.log(result);
      console.log('====================================');

      if (0 < result.length) {
        let response = {
          code: 200,
          message: "success",
          data: result,
        };
        res.status(200).send(response);
      } else {
        let response = {
          code: 201,
          message: "success",
          data: [],
        };
        res.status(201).send(response);
      }
    } catch (error) {
      let response = {
        code: 500,
        message: "error",
        data: error.message,
      };
      res.status(500).send(response);
    }
  },
  getOneMembacaAlkitab: async (req, res) => {
    try {
      let qry =`SELECT * FROM articles WHERE kategori = 'schedule3m' ORDER BY idArtikel DESC LIMIT 1`;

      let result = await db.query(qry);
      console.log('====================================');
      console.log(result);
      console.log('====================================');

      if (0 < result.length) {
        let response = {
          code: 200,
          message: "success",
          data: result,
        };
        res.status(200).send(response);
      } else {
        let response = {
          code: 201,
          message: "success",
          data: [],
        };
        res.status(201).send(response);
      }
    } catch (error) {
      let response = {
        code: 500,
        message: "error",
        data: error.message,
      };
      res.status(500).send(response);
    }
  },
  addArtikel: async (req, res) => {
    let judulArtikel = req.body.judulArtikel;
    if (judulArtikel == 0 || judulArtikel == null) {
      let response = {
        code: 400,
        message: "Error",
        error: "Judul Artikel tidak terisi",
      };
      res.status(400).send(response);
      return response;
    }

    let isiArtikel = req.body.isiArtikel;
    if (isiArtikel == 0 || isiArtikel == null) {
      let response = {
        code: 400,
        message: "Error",
        error: "Isi Artikel tidak terisi",
      };
      res.status(400).send(response);
      return response;
    }

    let kategori = req.body.kategori;
    if (kategori == 0 || kategori == null) {
      let response = {
        code: 400,
        message: "Error",
        error: "kategori tidak terisi",
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
        let insertQry = `INSERT INTO articles (title, content, kategori, tag, created_at, image, url)
        VALUES ('${judulArtikel}', '${isiArtikel}', '${kategori}', '${tag}', '${getFullTime()}', '${filename}', '${url}')`;

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
  uploadBahanSharing: async (req, res) => {
    let judulMateri = req.body.judulMateri;
    if (judulMateri == 0 || judulMateri == null) {
      let response = {
        code: 400,
        message: "Error",
        error: "judulMateri tidak terisi",
      };
      res.status(400).send(response);
      return response;
    }

    let file = req.files.file;
    console.log("file", file);
    let filesize = file.size;
    console.log("=================filesize===================");
    console.log(filesize);
    console.log("====================================");
    let ext = path.extname(file.name);
    console.log("================ext====================");
    console.log(ext);
    console.log("====================================");
    let filename = file.md5 + ext;
    console.log("=================filename===================");
    console.log(filename);
    console.log("====================================");
    const url = `https://api.gppkcbn.org/fileSharing/${filename}`;

    // const url = `${req.protocol}://${req.get("host")}/fileSharing/${filename}`;
    let allowedType = [".pdf", ".doc", ".docx"];

    if (!allowedType.includes(ext.toLowerCase())) {
      return res.status(422).json({ msg: "invalid Document" });
    }
    if (filesize > 5000000) {
      return res.status(422).json({ msg: " Size overload" });
    }

    if (file == 0 || file == null) {
      let response = {
        code: 400,
        message: "Error",
        error: "articlefile   tidak terisi",
      };
      res.status(400).send(response);
      return response;
    }

    file.mv(`./public/fileSharing/${filename}`, async (err) => {
      if (err) {
        return res.status(500).json({ msg: err.message });
      }

      try {
        let insertQry = `INSERT INTO materiKKA (judulMateri, waktuPembuatan, url)
                VALUES ('${judulMateri}','${getFullTime()}', '${url}')`;

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
    try {
      // Query to get the URL of the file you want to delete
      let urlQuery = `SELECT image FROM articles WHERE idArtikel = '${id}'`;
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
          let deleteQuery = `DELETE FROM articles WHERE idArtikel = '${id}'`;
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
  
  // editOneData : async(req, res) =>{

  // }
};
module.exports = artikel;
