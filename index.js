const express = require("express");
const app = express();
var cors = require("cors");
const mongoose = require("mongoose");

const dotenv = require("dotenv");
const userRoute = require("./Routes/users");
const userAuth = require("./Routes/auth");
const productRoute = require("./Routes/products");
const orderRoute = require("./Routes/order");
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://polarized-store.onrender.com",
      "https://polarized-admin.onrender.com",
    ],
  })
);

dotenv.config();
mongoose
  .connect(process.env.SECRET_MONGO)
  .then(() => console.log("connected"))
  .catch((err) => console.log(err));
app.use(express.json());
app.use("/api/user", userRoute);
app.use("/api/user/auth", userAuth);
app.use("/api/products", productRoute);
app.use("/api/orders", orderRoute);

const PORT = 5000 || process.env.PORT;
app.listen(PORT, () => {
  console.log("server is running on port " + PORT);
});
