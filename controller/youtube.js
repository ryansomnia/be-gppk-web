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
function getYouTubeId(url) {
  // Regular expression to match YouTube video IDs from various URL formats
  const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|v\/|.+\?.*v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null; // Return the ID if matched, otherwise null
}

let youtube = {
  getAllData: async (req, res) => {
    try {
      let qry = "SELECT * FROM YoutubeLink ORDER BY id DESC";
      let hasil = await db.query(qry);
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
  addData: async (req, res) => {
    let { title, speaker, url} = req.body;

  const videoId = getYouTubeId(url);
  let link =  `https://www.youtube.com/embed/${videoId}`

    try {
      let qry = `INSERT INTO YoutubeLink (title, speaker, url) VALUES ('${title}','${speaker}','${link}');`;
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
  deleteData: async (req, res) => {
    let id= req.body.id;

    try {
      let qry = `DELETE FROM YoutubeLink WHERE id = ${id}`;
      let result = await db.query(qry);
      console.log("====================================");
      console.log(result);
      console.log("====================================");

   
        let response = {
          code: 200,
          message: "success delete",
          data: result,
        };
        res.status(200).send(response);
   
    } catch (error) {
      let response = {
        code: 500,
        message: "error",
        data: error.message,
      };
      res.status(500).send(response);
    }
  },
  updateData: async (req, res) => {
    let id = req.body.id;
    let title = req.body.title;
    let speaker = req.body.speaker;
    let url = req.body.url;

    if (!id || !title || !speaker || !url) {
      return res.status(400).send({
        code: 400,
        message: "Missing required fields (id, title, speaker, url).",
      });
    }

    try {
      let qry = `UPDATE YoutubeLink SET title = ?, speaker = ?, url = ? WHERE id = ?`;
      let result = await db.query(qry, [title, speaker, url, id]);
      console.log("====================================");
      console.log(result);
      console.log("====================================");

      // Fetch the updated data to return in the response
      let selectQry = `SELECT * FROM YoutubeLink WHERE id = ?`;
      let updatedData = await db.query(selectQry, [id]);

      if (updatedData && updatedData.length > 0) {
        let response = {
          code: 200,
          message: "success update",
          data: updatedData[0], // Send the first row (updated data)
        };
        res.status(200).send(response);
      } else {
        let response = {
          code: 404,
          message: "Data not found after update.",
        };
        res.status(404).send(response);
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
module.exports = youtube;
