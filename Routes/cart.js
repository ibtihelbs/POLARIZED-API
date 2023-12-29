const router = require("express").Router();
const { verifyToken, verifandAuth, verifandAdmin } = require("./tokenVerify");
const Cart = require("../models/Cart");

router.post("/", verifandAuth, async (req, res) => {
  const newCart = new Cart(req.body);
  try {
    const savedCart = await newCart.save();
    res.status(200).json(savedCart);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});
router.put("/:id", verifandAuth, async (req, res) => {
  try {
    const updatedCart = await Cart.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      {
        new: true,
      }
    );
    res.status(200).json(updatedCart);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete("/:id", verifandAuth, async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.status(200).json("deteted");
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/find/:id", async (req, res) => {
  try {
    const Cart = await Cart.findById(req.params.id);
    res.status(201).json(Cart);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/", async (req, res) => {
  const query = req.query.new;
  const categories = req.query.categories;
  try {
    let Cart;
    if (query) {
      Cart = await Cart.find().sort({ createdAt: -1 }).limit(5);
    } else if (categories) {
      console.log(categories);
      Cart = await Cart.find({
        category: {
          $in: [categories],
        },
      });
    } else {
      Cart = await Cart.find();
    }
    res.status(201).json(Cart);
  } catch (error) {
    res.status(500).json(error);
  }
});
router.get("/income", verifandAdmin, async (req, res) => {
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

  try {
    const income = await Order.aggregate([
      { $match: { createdAt: { $gte: previousMonth } } },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$amount",
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ]);
    res.status(200).json(income);
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
