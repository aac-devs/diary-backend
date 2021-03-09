const { Router } = require("express");
const { create, login, renewToken } = require("../controllers/user.controller");
const router = Router();

router.post("/new", create);
router.post("/", login);
router.get("/renew", renewToken);

module.exports = router;
