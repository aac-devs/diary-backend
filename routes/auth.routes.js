const { Router } = require("express");
const { check } = require("express-validator");
const {
  userCreate,
  userLogin,
  userRenewToken,
} = require("../controllers/auth.controller");
const { validateFields } = require("../middlewares/validate-fields");
const { validateJWT } = require("../middlewares/validate-jwt");
const router = Router();

router.post(
  "/new",
  [
    check("name", "Name is required!").not().isEmpty(),
    check("email", "Email is required!").isEmail(),
    check("password", "Password must contain at least 6 characters!").isLength({
      min: 6,
    }),
    validateFields,
  ],
  userCreate
);
router.post(
  "/",
  [
    check("email", "Email is required!").isEmail(),
    check("password", "Password must contain at least 6 characters!").isLength({
      min: 6,
    }),
    validateFields,
  ],
  userLogin
);
router.get("/renew", validateJWT, userRenewToken);

module.exports = router;
