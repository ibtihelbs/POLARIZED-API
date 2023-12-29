const router = require("express").Router();
const User = require("../models/Users");
const cryptoJs = require("crypto-js");

const jwt = require("jsonwebtoken");
router.post("/register", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: cryptoJs.AES.encrypt(
      req.body.password,
      process.env.PASS
    ).toString(),
  });
  try {
    const savedUser = await newUser.save();
    console.log(savedUser);
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json(error);
  }
});
router.post("/login", async (req, res) => {
  console.log(req.body);
  try {
    const user = await User.findOne({ username: req.body.username });

    !user && res.status(404).json("username not found");
    const hash = cryptoJs.AES.decrypt(user.password, process.env.PASS);
    const Orpassword = hash.toString(cryptoJs.enc.Utf8);

    Orpassword !== req.body.password && res.status(401).json("wrong password");
    console.log(Orpassword, jwt);
    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT,
      { expiresIn: "3d" }
    );

    const { password, ...others } = user._doc;
    return res.status(201).json({ ...others, accessToken });
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
