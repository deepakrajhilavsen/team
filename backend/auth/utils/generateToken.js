const jwt = require("jsonwebtoken");

const generateToken = (id, username) => {
  const accesToken = jwt.sign(
    {
      id: id,
      username: username,
    },
    process.env.SECRET,
    { expiresIn: process.env.JWT_EXPIRY_IN }
  );

  return accesToken;
};

module.exports = generateToken;
