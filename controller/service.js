"use strict";
const moment = require("moment");
let dotenv = require("dotenv");
let env = dotenv.config();

const path = require("path");
const fs = require("fs");
const db = require("../config/db");
const { log } = require("console");
function getFullTime() {
  let asiaTimeStart = new Date().toLocaleString("en-US", {
    timeZone: "Asia/Jakarta",
  });
  console.log(asiaTimeStart);
  let time = moment(asiaTimeStart, "MM/DD/YYYY").format("YYYY-MM-DD");
  console.log(time);
  return time;
}

let service = {
  formDoa: async (req, res) => {
    let {
      
        username,
        fullName,
        contactInfo,
        pokokDoa,
    } = req.body



    try {
      let qry = `INSERT INTO serviceForms (service_type, full_name, user_name, contact_info, description, form_data, submission_date)
VALUES('Permohonan Doa', '${fullName}', '${username}', '${contactInfo}', '${pokokDoa}', null, NOW());`;
console.log('==============qry======================');
console.log(qry);
console.log('====================================');      
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
  addKonsultasiData: async (req, res) => {
    let {
        jenisKonsultasi,
        fullName,
        tanggalLahir,
        sex,
        statusPernikahan,
        noHP,
        alamat,
        isi
    } = req.body



    try {
      let qry = `INSERT INTO konsultasi (jenisKonsultasi,fullName,tanggalLahir,sex,statusPernikahan,noHP,alamat,isi
) VALUES ('${jenisKonsultasi}', '${fullName}', '${tanggalLahir}','${sex}', '${statusPernikahan}','${noHP}', '${alamat}','${isi}');`;
console.log('==============qry======================');
console.log(qry);
console.log('====================================');      
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
  formBaptisan: async (req, res) => {
    const {
      namaLengkap,
      tempatLahir,
      tanggalLahir,
      alamat,
      noHP,
      pendidikanTerakhir,
      pekerjaan,
      kka,
      status,
      tanggalMenikah,
      kepercayaanLama,
      jumlahKeluarga,
      keluarga
    } = req.body;
  



    try {
      let qry = `
      INSERT INTO formBaptisanAir (
        NamaLengkap, TempatLahir, TanggalLahir, Alamat, NoHP, PendidikanTerakhir, Pekerjaan, KKA, StatusPernikahan, TanggalMenikah, KepercayaanLama, JumlahKeluarga, Keluarga
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    let values = [
      namaLengkap,
      tempatLahir,
      tanggalLahir,
      alamat,
      noHP,
      pendidikanTerakhir,
      pekerjaan,
      kka,
      status,
      tanggalMenikah, // Gunakan nilai langsung
      kepercayaanLama,
      jumlahKeluarga,
      JSON.stringify(keluarga)    ];
      console.log('==============qry======================');
console.log(qry);
console.log('====================================');      
let result = await db.query(qry, values);
console.log('====================================');
      console.log(result);
      console.log('====================================');
      

      if (result && result.affectedRows > 0) {
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
    }catch (error) {
      let response = {
        code: 500,
        message: "error",
        data: error.message,
      };
      console.log('====================================');
      console.log(response);
      console.log('====================================');
      res.status(500).send(response);
    }
  },
  getFormBaptisan: async (req, res) => {
 
    try {
      let qry = `SELECT * FROM formBaptisanAir`;
   
      console.log('==============qry======================');
console.log(qry);
console.log('====================================');      
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
      }
    }catch (error) {
      let response = {
        code: 500,
        message: "error",
        data: error.message,
      };
      console.log('====================================');
      console.log(response);
      console.log('====================================');
      res.status(500).send(response);
    }
  },
  deleteDataBaptisan: async (req, res) => {
    
  let id = req.body.id



    try {
      let qry = `DELETE FROM formBaptisanAir WHERE ID = '${id}'`;
     console.log('============tttt========================');
     console.log(qry);
     console.log('====================================');
let result = await db.query(qry);
      console.log('====================================');
      console.log(qry);

      console.log(result);
      console.log('====================================');
      

      if (result && result.affectedRows > 0) {
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
    }catch (error) {
      let response = {
        code: 500,
        message: "error",
        data: error.message,
      };
      console.log('====================================');
      console.log(response);
      console.log('====================================');
      res.status(500).send(response);
    }
  },
  getAll:async (req, res) =>{
    try {
      let qry = `SELECT id, full_name, user_name, contact_info, description, DATE_FORMAT(submission_date, '%d-%m-%Y') tanggal FROM serviceForms WHERE service_type = 'Permohonan Doa' ORDER BY submission_date DESC;`
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
  deleteOneData: async (req, res) => {
    let id = req.body.id;
    try {

          // Delete the record from the database
          let deleteQuery = `DELETE FROM serviceForms 
          WHERE id = '${id}' AND service_type = 'Permohonan Doa'`;
          db.query(deleteQuery)
            .then((result) => {
              console.log(result);
              let response = {
                code: 200,
                message: "record deleted successfully",
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
  }
};
module.exports = service;
