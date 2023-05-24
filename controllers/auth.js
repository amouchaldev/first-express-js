const User = require('../Models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (user) {
      if (await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({ user }, process.env.JWT_SECRET_KEY, {
          expiresIn: "15m",
        });
        return res.json({ token });
      } else return res.json({ error: "invalid username or password" }, 403);
    } else {
      return res.json({ error: "invalid username or password" }, 403);
    }
  } catch (err) {
    console.log(err.message);
  }
};

const register = async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await hashIt(password);
    const user = {
      username,
      password: hashedPassword,
    };
    const create = await User.create(user);
    return res.status(201).json(create);
  } catch (err) {
    console.log(err.message);
  }
};

async function hashIt(password) {
  const salt = await bcrypt.genSalt(6);
  const hashed = await bcrypt.hash(password, salt);
  return hashed;
}

// compare the password user entered with hashed pass.
async function compareIt(password) {
  const validPassword = await bcrypt.compare(password, hashedPassword);
}

module.exports = {login, register}