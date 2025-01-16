const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../config/db"); // Assuming a database connection is set up

let user = {
  register: async (req, res) => {
    const { username, password, fullName,alamat, noHP, status } = req.body;
   

      const hashedPassword = await bcrypt.hash(password, 10);
      let insertQry = `INSERT INTO users (username, password, fullName, alamat, noHP, tglCreated, status)
      VALUES ('${username}', '${hashedPassword}', '${fullName}', '${alamat}', '${noHP}', NOW(), '${status}')`;

      await db.query(insertQry);
      let response = {
        code: 201,
        status: "success",
        message: "Register Berhasil",

      };
      console.log(response);
      return res.status(201).send(response);

  },
  login: async(req, res)=>{
    const { username, password } = req.body;

    let qry = `SELECT * FROM users WHERE username = '${username}'`
    const result = await db.query(qry);

    if (result.length === 0) {
      // Jika user tidak ditemukan
      return res.status(404).json({ code: 404, message: "failed", data: "User not found" });
    }

    const user = result[0];

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ code: 401,message:"failed", data: "Invalid password or Username" });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET, // Pastikan menyimpan secret di variabel lingkungan
      { expiresIn: "3h" } // Token berlaku selama 1 jam
    );
   let ress = {
      code: 200,
      message: "Login successful",
      data: {
        token: token,
        username: username,
        status: user.status
      }
    }
    return res.status(200).send(ress);

  }
};
module.exports = user;

