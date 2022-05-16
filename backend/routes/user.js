const express = require("express");
const password = require("../middleware/password");
const router = express.Router();
const auth = require("../middleware/auth");
const userCtrl = require("../controllers/user");
const multer = require("../middleware/multer-config");

// Mise en place des routers user :
// password,
router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);

// router.get("/", auth, userCtrl.getAllUsers);
// router.get("/:id", auth, userCtrl.getOneUser);
// router.put("/:id", auth, multer, userCtrl.modifyUser);
// router.delete("/:id", auth, userCtrl.deleteUser);

module.exports = router;
