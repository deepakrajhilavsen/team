const jwt = require("jsonwebtoken");

const generateToken = (id, username) => {
  const accesToken = jwt.sign(
    {
      id: id,
      username: username,
    },
    process.env.SECRET,
    { expiresIn: "1h" }
  );

  return accesToken;
};

module.exports = generateToken;
