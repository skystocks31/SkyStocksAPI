const jwt = require("jsonwebtoken");

module.exports = {
  APIauth: async (req, res, next) => {
    try {
      let token = req.headers.authorization;
      if (token) {
        token = token.split(" ")[1];
        let user = jwt.verify(token, process.env.SECRET_KEY);
        req.userId = user.id;
      } else {
        res.status(401).json({ message: "Unauthorized User" });
      }
      next();
    } catch (error) {
      res.status(401).json({ message: "Unauthorized User, Please try again!" });
    }
  },
};
