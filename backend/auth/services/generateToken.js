const jwt = require("jsonwebtoken");

const generateToken = (id, username) => {
  const accesToken = jwt.sign(
    {
      id: id,
      username: username,
      exp: Math.floor(Date.now() / 1000) + 60 * 60,
    },
    process.env.SECRET
  );

  return accesToken;
};

module.exports = generateToken;
