const db = require("../config/db");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {

  try {

    const { name, email, password } = req.body;

    const hashedPassword =
      await bcrypt.hash(password, 10);

    const newUser = await db.query(

      `
      INSERT INTO users
      (name,email,password)

      VALUES($1,$2,$3)

      RETURNING *
      `,
      [name, email, hashedPassword]
    );

    res.json({
      message: "User Registered",
      user: newUser.rows[0],
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      error: "Registration Failed",
    });

  }
};

const loginUser = async (req, res) => {

  try {

    const { email, password } = req.body;

    const user = await db.query(

      `
      SELECT * FROM users
      WHERE email = $1
      `,
      [email]
    );

    if (user.rows.length === 0) {

      return res.status(400).json({
        error: "User Not Found",
      });

    }

    const validPassword =
      await bcrypt.compare(
        password,
        user.rows[0].password
      );

    if (!validPassword) {

      return res.status(400).json({
        error: "Invalid Password",
      });

    }

    const token = jwt.sign(

  {
    id: user.rows[0].id,
    email: user.rows[0].email,
  },

  "mysecretkey123",

  {
    expiresIn: "7d",
  }
);

    res.json({

      message: "Login Successful",

      token,

      user: user.rows[0],

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      error: "Login Failed",
    });

  }
};
const getProfile = async (req, res) => {

  try {

    const user = req.user;

    res.json(user);

  } catch (error) {

    res.status(500).json({
      message: "Server Error",
    });

  }
};

module.exports = {
  registerUser,
  loginUser,
  getProfile,
};