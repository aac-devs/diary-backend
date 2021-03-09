const { Router } = require("express");
const {
  getAll,
  create,
  update,
  remove,
} = require("../controllers/note.controller");
const router = Router();

router.get("/", getAll);
router.post("/", create);
router.put("/:id", update);
router.delete("/:id", remove);

module.exports = router;
