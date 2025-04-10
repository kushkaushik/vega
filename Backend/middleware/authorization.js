const { STATUS_CODES, MESSAGES } = require("../constants/constant");
const jwt = require("jsonwebtoken");

const authorization = (req, res, next) => {
    const token = req.header("Authorization");
    if (!token) {
      return res.status(STATUS_CODES.UNAUTHORIZED).json({ message: MESSAGES.NO_TOKEN });
    }
    try {
      const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
      console.log({decoded})
      req.user = decoded;
      next();
    } catch (
      err
    ) {
      res.status(STATUS_CODES.BAD_REQUEST).json({ message: MESSAGES.UNAUTHORIZED_INVALID_TOKEN });
    }
};

module.exports = authorization