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
    let { username, fullName, contactInfo, pokokDoa } = req.body;

    try {
      let qry = `INSERT INTO serviceForms (service_type, full_name, user_name, contact_info, description, form_data, submission_date)
VALUES('Permohonan Doa', '${fullName}', '${username}', '${contactInfo}', '${pokokDoa}', null, NOW());`;
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
      isi,
    } = req.body;

    try {
      let qry = `INSERT INTO konsultasi (jenisKonsultasi,fullName,tanggalLahir,sex,statusPernikahan,noHP,alamat,isi
) VALUES ('${jenisKonsultasi}', '${fullName}', '${tanggalLahir}','${sex}', '${statusPernikahan}','${noHP}', '${alamat}','${isi}');`;
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
  addPelayanData: async (req, res) => {
    let { namaLengkap, nomorHandphone, bidangPelayanan } = req.body;

    try {
      let qry = `INSERT INTO pelayanBaru (namaLengkap, nomorHandphone, bidangPelayanan) 
      VALUES ('${namaLengkap}', '${nomorHandphone}', '${bidangPelayanan}');`;
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
  addPernikahanData: async (req, res) => {
    const {

      tanggalPernikahan,
      jamPernikahan,
      tempatPernikahan,

      namaLengkapPria,
      tempatLahirPria,
      tanggalLahirPria,
      alamatPria,
      teleponPria,
      pekerjaanPria,
      AgamaPriaDahulu,
      GerejaPriaDahulu,
      NoKartuPria,
      PernikahanPertamaPria,
      JumlahAnakPria,

      namaLengkapWanita,
      tempatLahirWanita,
      tanggalLahirWanita,
      alamatWanita,
      teleponWanita,
      pekerjaanWanita,
      AgamaWanitaDahulu,
      GerejaWanitaDahulu,
      NoKartuWanita,
      PernikahanPertamaWanita,
      JumlahAnakWanita,

      BergerejaSejak,
      ArtiLahirBaru,
      LamaPerkenalan,
      KomitmenSuci
    } = req.body;

    try {
      let qry = `INSERT INTO formPernikahan (
    tanggalPernikahan,
    jamPernikahan,
    tempatPernikahan,
    namaLengkapPria,
    tempatLahirPria,
    tanggalLahirPria,
    alamatPria,
    teleponPria,
    pekerjaanPria,
    agamaPriaDahulu,
    gerejaPriaDahulu,
    noKartuPria,
    pernikahanPertamaPria,
    jumlahAnakPria,
    namaLengkapWanita,
    tempatLahirWanita,
    tanggalLahirWanita,
    alamatWanita,
    teleponWanita,
    pekerjaanWanita,
    agamaWanitaDahulu,
    gerejaWanitaDahulu,
    noKartuWanita,
    pernikahanPertamaWanita,
    jumlahAnakWanita,
    bergerejaSejak,
    artiLahirBaru,
    lamaPerkenalan,
    komitmenSuci,
    createdAT
) VALUES (
    '${tanggalPernikahan}',
    '${jamPernikahan}',
    '${tempatPernikahan}',
    '${namaLengkapPria}',
    '${tempatLahirPria}',
      '${tanggalLahirPria}',
      '${alamatPria}',
      '${teleponPria}',
     '${pekerjaanPria}',
      '${AgamaPriaDahulu}',
      '${GerejaPriaDahulu}',
      '${NoKartuPria}',
      '${PernikahanPertamaPria}',
      '${JumlahAnakPria}',
      '${namaLengkapWanita}',
      '${tempatLahirWanita}',
      '${tanggalLahirWanita}',
      '${alamatWanita}',
      '${teleponWanita}',
      '${pekerjaanWanita}',
      '${AgamaWanitaDahulu}',
      '${GerejaWanitaDahulu}',
      '${NoKartuWanita}',
      '${PernikahanPertamaWanita}',
      '${JumlahAnakWanita}',
       '${BergerejaSejak}',
      '${ArtiLahirBaru}',
      '${LamaPerkenalan}',
      '${KomitmenSuci}',
      '${getFullTime}'
)`;

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
  },
  editPernikahan: async(req, res) =>{
    const {
      id, // The ID of the record to update
      tanggalPernikahan,
      jamPernikahan,
      tempatPernikahan,
      namaLengkapPria,
      tempatLahirPria,
      tanggalLahirPria,
      alamatPria,
      teleponPria,
      pekerjaanPria,
      AgamaPriaDahulu,
      GerejaPriaDahulu,
      NoKartuPria,
      PernikahanPertamaPria, // This will be 0 or 1 from frontend
      JumlahAnakPria,
      namaLengkapWanita,
      tempatLahirWanita,
      tanggalLahirWanita,
      alamatWanita,
      teleponWanita,
      pekerjaanWanita,
      AgamaWanitaDahulu,
      GerejaWanitaDahulu,
      NoKartuWanita,
      PernikahanPertamaWanita, // This will be 0 or 1 from frontend
      JumlahAnakWanita,
      BergerejaSejak,
      ArtiLahirBaru,
      LamaPerkenalan,
      KomitmenSuci // This will be 0 or 1 from frontend
    } = req.body;

    if (!id) {
      return res.status(400).json({ message: 'ID is required for update.' });
    }

    const qry = `
    UPDATE formPernikahan SET
      tanggalPernikahan = '${tanggalPernikahan}',
      jamPernikahan = '${jamPernikahan}',
      tempatPernikahan = '${tempatPernikahan}',
      namaLengkapPria = '${namaLengkapPria}',
      tempatLahirPria = '${tempatLahirPria}',
      tanggalLahirPria = '${tanggalLahirPria}',
      alamatPria = '${alamatPria}',
      teleponPria = '${teleponPria}',
      pekerjaanPria = '${pekerjaanPria}',
      AgamaPriaDahulu = '${AgamaPriaDahulu}',
      GerejaPriaDahulu = '${GerejaPriaDahulu}',
      NoKartuPria = '${NoKartuPria}',
      PernikahanPertamaPria = '${PernikahanPertamaPria}',
      JumlahAnakPria = '${JumlahAnakPria}',
      namaLengkapWanita = '${namaLengkapWanita}',
      tempatLahirWanita = '${tempatLahirWanita}',
      tanggalLahirWanita = '${tanggalLahirWanita}',
      alamatWanita = '${alamatWanita}',
      teleponWanita = '${teleponWanita}',
      pekerjaanWanita = '${pekerjaanWanita}',
      AgamaWanitaDahulu = '${AgamaWanitaDahulu}',
      GerejaWanitaDahulu = '${GerejaWanitaDahulu}',
      NoKartuWanita = '${NoKartuWanita}',
      PernikahanPertamaWanita = '${PernikahanPertamaWanita}',
      JumlahAnakWanita = '${JumlahAnakWanita}',
      BergerejaSejak = '${BergerejaSejak}',
      ArtiLahirBaru = '${ArtiLahirBaru}',
      LamaPerkenalan = '${LamaPerkenalan}',
      KomitmenSuci = '${KomitmenSuci}'
    WHERE id = ${id}
  `;

  await db.query(qry);
  
      let response = {
        code: 200,
        message: "success",
        data: "Data berhasil diperbarui",
      };
      return res.status(200).send(response);
  
  },
  addPemberkatanRumahData: async (req, res) => {
    const { namaLengkap, alamat, nomorHandphone, tanggalPelaksanaan } =
      req.body;

    try {
      let qry = `INSERT INTO pemberkatanRumah (nama_lengkap, alamat, nomor_handphone, tanggal_pelaksanaan)
       VALUES ('${namaLengkap}', '${alamat}', '${nomorHandphone}', '${tanggalPelaksanaan}')`;

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
  },
  addPenyerahanAnak: async (req, res) => {
    try {
      const {
        namaAyah,
        tempatTanggalLahirAyah,
        alamatAyah,
        teleponAyah,
        tempatTanggalBaptisAyah,
        pendidikanTerakhirAyah,
        pekerjaanAyah,
        kkaAyah,
        wilayahAyah,
        namaIbu,
        tempatTanggalLahirIbu,
        alamatIbu,
        teleponIbu,
        tempatTanggalBaptisIbu,
        pendidikanTerakhirIbu,
        pekerjaanIbu,
        kkaIbu,
        wilayahIbu,
        namaAnak,
        tempatTanggalLahirAnak,
      } = req.body;

      let qry = `INSERT INTO penyerahanAnak (nama_ayah, tempat_tanggal_lahir_ayah, alamat_ayah, telepon_ayah, tempat_tanggal_baptis_ayah, pendidikan_terakhir_ayah, pekerjaan_ayah, kka_ayah, wilayah_ayah, nama_ibu, tempat_tanggal_lahir_ibu, alamat_ibu, telepon_ibu, tempat_tanggal_baptis_ibu, pendidikan_terakhir_ibu, pekerjaan_ibu, kka_ibu, wilayah_ibu, nama_anak, tempat_tanggal_lahir_anak) 
      VALUES ('${namaAyah}', '${tempatTanggalLahirAyah}', '${alamatAyah}', '${teleponAyah}', '${tempatTanggalBaptisAyah}', '${pendidikanTerakhirAyah}', '${pekerjaanAyah}', '${kkaAyah}', '${wilayahAyah}', '${namaIbu}', '${tempatTanggalLahirIbu}', '${alamatIbu}', '${teleponIbu}', '${tempatTanggalBaptisIbu}', '${pendidikanTerakhirIbu}', '${pekerjaanIbu}', '${kkaIbu}', '${wilayahIbu}', '${namaAnak}', '${tempatTanggalLahirAnak}')`;

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
      keluarga,
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
        JSON.stringify(keluarga),
      ];
      console.log("==============qry======================");
      console.log(qry);
      console.log("====================================");
      let result = await db.query(qry, values);
      console.log("====================================");
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
  },
  getFormBaptisan: async (req, res) => {
    try {
      let qry = `SELECT * FROM formBaptisanAir`;

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
  },
  getKonselingData: async (req, res) => {
    try {
      let qry = `SELECT * FROM konsultasi`;

      console.log("==============qry======================");
      console.log(qry);
      console.log("====================================");
      let result = await db.query(qry);
      console.log("====================================");
      console.log(result);
      console.log(result.length);

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
  },
  getPelayanData: async (req, res) => {
    try {
      let qry = `SELECT * FROM pelayanBaru`;

      console.log("==============qry======================");
      console.log(qry);
      console.log("====================================");
      let result = await db.query(qry);
      console.log("====================================");
      console.log(result);
      console.log(result.length);

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
  },
  getPernikahanData: async (req, res) => {
    try {
      let qry = `SELECT * FROM formPernikahan`;

      console.log("==============qry======================");
      console.log(qry);
      console.log("====================================");
      let result = await db.query(qry);
      console.log("====================================");
      console.log(result);
      console.log(result.length);

      console.log("====================================");

      if (0 < result.length) {
        let response = {
          code: 200,
          message: "success",
          data: result,
        };
        res.status(200).send(response);
      }else{
        let response = {
          code: 204,
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
  },
  getPemberkatanRumah: async (req, res) => {
    try {
      let qry = `SELECT * FROM pemberkatanRumah`;

      console.log("==============qry======================");
      console.log(qry);
      console.log("====================================");
      let result = await db.query(qry);
      console.log("====================================");
      console.log(result);
      console.log(result.length);

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
  },
  getPenyerahanAnak: async (req, res) => {
    try {
      let qry = `SELECT * FROM penyerahanAnak`;

      console.log("==============qry======================");
      console.log(qry);
      console.log("====================================");
      let result = await db.query(qry);
      console.log("====================================");
      console.log(result);
      console.log(result.length);

      console.log("====================================");

      if (0 < result.length) {
        let response = {
          code: 200,
          message: "success",
          data: result,
        };
        res.status(200).send(response);

      }
      else{ 
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
  },
  deleteDataBaptisan: async (req, res) => {
    let id = req.body.id;

    try {
      let qry = `DELETE FROM formBaptisanAir WHERE ID = '${id}'`;
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
  },
  deleteDataPelayan: async (req, res) => {
    let id = req.body.id;
    try {
      let qry = `DELETE FROM pelayanBaru WHERE id = '${id}'`;
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
  },
  deleteDataKonsultasi: async (req, res) => {
    let id = req.body.id;
    try {
      let qry = `DELETE FROM konsultasi WHERE id = '${id}'`;
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
  },
  deleteDataPernikahan: async (req, res) => {
    let id = req.body.id;
    try {
      let qry = `DELETE FROM formPernikahan WHERE id = '${id}'`;
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
  },

  deleteDataPemberkatanRumah: async (req, res) => {
    let id = req.body.id;
    try {
      let qry = `DELETE FROM pemberkatanRumah WHERE id = '${id}'`;
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
  },
  deleteDataPenyerahanAnak: async (req, res) => {
    let id = req.body.id;
    try {
      let qry = `DELETE FROM penyerahanAnak WHERE id = '${id}'`;
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
  },
  getAll: async (req, res) => {
    try {
      let qry = `SELECT id, full_name, user_name, contact_info, description, DATE_FORMAT(submission_date, '%d-%m-%Y') tanggal FROM serviceForms WHERE service_type = 'Permohonan Doa' ORDER BY submission_date DESC;`;
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
  },
};
module.exports = service;
