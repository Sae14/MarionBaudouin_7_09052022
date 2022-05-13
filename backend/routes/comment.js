const express = require("express");
const router = express.Router();
const commentCtrl = require("../controllers/comment");
const auth = require("../middleware/auth");

// Mise en place des routes commentaires avec authentification obligatoire :

router.get("/", auth, commentCtrl.getAllComments);
router.get("/:id", auth, commentCtrl.getOneComment);
router.post("/", auth, commentCtrl.createComment);
router.put("/:id", auth, commentCtrl.modifyComment);
router.delete("/:id", auth, commentCtrl.deleteComment);

module.exports = router;
