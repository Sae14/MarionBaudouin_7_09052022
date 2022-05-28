const express = require("express");
const router = express.Router();
const likeCtrl = require("../controllers/like");
const auth = require("../middleware/auth");

// router.get("/:id", auth, likeCtrl.getAllLikes);
// router.get("/:id", auth, likeCtrl.getOneLike);
router.post("/", auth, likeCtrl.handleLike);
// router.put("/:id", auth, likeCtrl.modifyLike);
// router.delete("/:id", auth, likeCtrl.deleteLike);

module.exports = router;
