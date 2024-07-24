const { REGISTER_SUCCESS } = require("../../Utils/constants");
const asyncErrorHandler = require("../../middlewares/asyncErrorHandler");
const createUserService = require("../services/createUserService");

const createUserController = asyncErrorHandler(async (req, res) => {
  const authId = req.user.id;
  const userDetails = {
    authId,
    ...req.body,
    mobile_no: req.body.mobile_no ? String(req.body.mobile_no) : undefined,
  };

  const user = await createUserService(userDetails);

  res.status(REGISTER_SUCCESS.status).send({
    user: user,
    message: REGISTER_SUCCESS.message,
  });
});

module.exports = createUserController;
