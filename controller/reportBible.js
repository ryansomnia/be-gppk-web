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

let reportBible = {
  inputSchedule: async (req, res) => {
    let { tgl, chapter1, chapter2, chapter3 } = req.body;

    try {
      let qry = `INSERT INTO readingSchedules (date, chapter_1, chapter_2, chapter_3, created_at)
VALUES('${tgl}', '${chapter1}', '${chapter2}', '${chapter3}', NOW());`;
      console.log("==============qry======================");
      console.log(qry);
      console.log("====================================");
      let result = await db.query(qry);
      console.log("====================================");
      console.log(result);
      console.log("====================================");

      if (0 < result.length) {
        let response = {
          code: 201,
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
  readingProgress: async (req, res) => {
    let {
      username,
      scheduleId,
      chapter1Checked,
      chapter2Checked,
      chapter3Checked,
      note,
    } = req.body;

    try {
      let qry = `INSERT INTO UserReadingProgress (username, scheduleId, chapter1Checked, chapter2Checked, chapter3Checked,note, completedAt)
  VALUES ('${username}', '${scheduleId}', ${chapter1Checked}, ${chapter2Checked}, ${chapter3Checked},'${note}', NOW())`;
      console.log("====================================");
      console.log(qry);
      console.log("====================================");
      let result = await db.query(qry);
      if (0 < result.length) {
        let response = {
          code: 201,
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
  getAll: async (req, res) => {
    try {
      let qry = `SELECT * FROM readingSchedules`;
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
      } else {
        let response = {
          code: 204,
          message: "No Content",
          data: result,
        };
        res.status(204).send(response);
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
  getTodaySchedule: async (req, res) => {
    try {
      let qry = `SELECT * FROM readingSchedules WHERE date = CURDATE();`;
      let result = await db.query(qry);

      if (0 < result.length) {
        let response = {
          code: 200,
          message: "success",
          data: result,
        };
        res.status(200).send(response);
      } else {
        let response = {
          code: 204,
          message: "No Content",
          data: result,
        };
        res.status(204).send(response);
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
};
module.exports = reportBible;
