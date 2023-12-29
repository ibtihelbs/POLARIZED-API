const router = require("express").Router();
const { verifyToken, verifandAuth, verifandAdmin } = require("./tokenVerify");
const User = require("../models/Users");
router.put("/:id", verifandAuth, async (req, res) => {
  if (req.body.password) {
    cryptoJs.AES.encrypt(req.body.password, process.env.PASS).toString();
  }
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      {
        new: true,
      }
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json(error);
  }
});
router.delete("/:id", verifandAuth, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("deteted");
  } catch (error) {
    res.status(500).json(error);
  }
});
router.get("/find/:id", verifandAuth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.status(201).json(others);
  } catch (error) {
    res.status(500).json(error);
  }
});
router.get("/", verifandAdmin, async (req, res) => {
  const query = req.query.new;
  try {
    const user = query
      ? await User.find().sort({ _id: -1 }).limit(5)
      : await User.find();
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});
router.get("/stats", verifandAdmin, async (req, res) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
  try {
    const data = await User.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      {
        $project: {
          month: {
            $month: "$createdAt",
          },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
});
module.exports = router;
