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
  getAll:async (req, res) =>{
    try {
      let qry = `SELECT id, full_name, user_name, contact_info, description, DATE_FORMAT(submission_date, '%d-%m-%Y') tanggal FROM serviceForms WHERE service_type = 'Permohonan Doa';`
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
  }
};
module.exports = service;
