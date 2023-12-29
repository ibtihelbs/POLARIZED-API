const router = require("express").Router();
const { verifyToken, verifandAuth, verifandAdmin } = require("./tokenVerify");
const Product = require("../models/Products");

router.post("/", verifandAdmin, async (req, res) => {
  const newProduct = new Product(req.body);
  try {
    const savedProduct = await newProduct.save();
    console.log(savedProduct);
    res.status(200).json(savedProduct);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});
router.put("/:id", verifandAdmin, async (req, res) => {
  try {
    const updatedProducts = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      {
        new: true,
      }
    );
    console.log(updatedProducts);
    res.status(200).json(updatedProducts);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete("/:id", verifandAdmin, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json("deteted");
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/find/:id", async (req, res) => {
  console.log(req.params.id);
  try {
    const product = await Product.findById(req.params.id);
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/", async (req, res) => {
  const query = req.query.new;
  const categories = req.query.categories;
  try {
    let product;
    if (query) {
      product = await Product.find().sort({ createdAt: -1 }).limit(5);
    } else if (categories) {
      console.log(categories);
      product = await Product.find({
        categories: {
          $in: [categories],
        },
      });
    } else {
      product = await Product.find();
    }
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json(error);
  }
}); /*
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
});*/
module.exports = router;
