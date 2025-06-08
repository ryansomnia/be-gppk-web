"use strict";
const moment = require("moment");
let dotenv = require("dotenv");
let env = dotenv.config();

const path = require("path");
const fs = require("fs");
const db = require("../config/db");
const { log } = require("console");

let jemaat = { 
    getData: async (req, res) => {
    try {
      let qry = `SELECT * FROM PersonalDataJemaat;`;

      console.log("==============qry======================");
      console.log(qry);
      console.log("====================================");
      let result = await db.query(qry);
      console.log("====================================");
      console.log(result);
      console.log("====================================");

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
      console.log("====================================");
      console.log(response);
      console.log("====================================");
      res.status(500).send(response);
    }
  }, addData: async (req, res) => {
    const {
        full_name,
        tanggal_lahir, // Diharapkan dalam format ISO string (misal: '1999-11-13T17:00:00.000Z')
        tempat_lahir,
        address,
        phone_number,
        email,
        pendidikan,
        pekerjaan,
        kka,
        statusNikah,
        kepercayaan_lama,
        tanggal_join, // Diharapkan dalam format ISO string
        baptisan_air,
        baptisan_roh
      } = req.body;


      if (!full_name || !tanggal_lahir || !tempat_lahir || !address || !phone_number) {
        return res.status(400).json({ message: 'Kolom wajib tidak lengkap. Silakan lengkapi semua data yang diperlukan.' });
      }


    try {
    const sql = `
    INSERT INTO PersonalDataJemaat (
      full_name,
      tanggal_lahir,
      tempat_lahir,
      address,
      phone_number,
      email,
      pendidikan,
      pekerjaan,
      kka,
      statusNikah,
      kepercayaan_lama,
      tanggal_join,
      baptisan_air,
      baptisan_roh
    ) VALUES ('${full_name}', '${tanggal_lahir}', '${tempat_lahir}', '${address}', '${phone_number}', 
     '${email}', '${pendidikan}', '${pekerjaan}', '${kka}', '${statusNikah}', '${kepercayaan_lama}', '${tanggal_join}',
      '${baptisan_air}', '${baptisan_roh}')
  `;


      let result = await db.query(sql);

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
      console.log("====================================");
      console.log(response);
      console.log("====================================");
      res.status(500).send(response);
    }
  }, editData: async(req, res)=>{
    const {
        id, // ID dari record yang akan diupdate
        full_name, username, tanggal_lahir, tempat_lahir, address, phone_number,
        email, pendidikan, pekerjaan, kka, statusNikah, kepercayaan_lama,
        tanggal_join, baptisan_air, baptisan_roh
      } = req.body;


  // Tanggal diharapkan sudah dalam format YYYY-MM-DD dari frontend
  const formattedTanggalLahir = tanggal_lahir;
  const formattedTanggalJoin = tanggal_join;

  // Query SQL untuk mengupdate data di tabel `PersonalDataJemaat`
  const sql = `
    UPDATE PersonalDataJemaat SET
      full_name = ?,
      username = ?,
      tanggal_lahir = ?,
      tempat_lahir = ?,
      address = ?,
      phone_number = ?,
      email = ?,
      pendidikan = ?,
      pekerjaan = ?,
      kka = ?,
      statusNikah = ?,
      kepercayaan_lama = ?,
      tanggal_join = ?,
      baptisan_air = ?,
      baptisan_roh = ?
    WHERE id = ?
  `;

  const values = [
    full_name, username, formattedTanggalLahir, tempat_lahir, address, phone_number,
    email, pendidikan, pekerjaan, kka, statusNikah, kepercayaan_lama,
    formattedTanggalJoin, baptisan_air, baptisan_roh,
    id // ID untuk klausa WHERE
  ];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error updating personal data:', err);
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(409).json({ message: 'Pembaruan gagal: username atau email sudah ada.' });
      }
      return res.status(500).json({ message: 'Gagal memperbarui data pribadi jemaat', error: err.message });
    }
    if (result.affectedRows === 0) {
      // Jika tidak ada baris yang terpengaruh, berarti ID tidak ditemukan
      return res.status(404).json({ message: 'Data jemaat tidak ditemukan dengan ID yang diberikan.' });
    }
    res.status(200).json({
      message: 'Data pribadi jemaat berhasil diperbarui',
      affectedRows: result.affectedRows
    });
  });
  },
deleteData: async(req, res)=>{
    let id = req.body.id;
    try {
        let qry = `DELETE FROM PersonalDataJemaat WHERE id = '${id}'`;
        console.log("============tttt========================");
        console.log(qry);
        console.log("====================================");
        let result = await db.query(qry);
        console.log("====================================");
        console.log(qry);
  
        console.log(result);
        console.log("====================================");
  
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
      } catch (error) {
        let response = {
          code: 500,
          message: "error",
          data: error.message,
        };
        console.log("====================================");
        console.log(response);
        console.log("====================================");
        res.status(500).send(response);
      }    
} 

}
  module.exports = jemaat;
