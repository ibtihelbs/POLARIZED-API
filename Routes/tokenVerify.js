const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    console.log("token is" + token);
    jwt.verify(token, process.env.JWT, (err, user) => {
      if (err) res.status(403).json("ur not valid");
      req.user = user;
      console.log("user" + req.user, user);
      next();
    });
  } else {
    return res.status(401).json("ur not auth");
  }
};
const verifandAuth = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("not valid");
    }
  });
};
const verifandAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("not admin");
    }
  });
};

module.exports = { verifyToken, verifandAuth, verifandAdmin };
