const express = require("express");
const authController = require("../controllers/authController");
const router = express.Router();
const path = require("path");
const multer = require("multer");
const {isAuthenticatedUser, authorizeRoles} = require("../middlewares/authenticate")

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, "..", "uploads/user"));
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  }),
});

router.post("/register", upload.single("avatar"), authController.registerUser);
router.post("/login", authController.loginUser);
router.get("/logout", authController.logoutUser);
router.post("/password/forgot", authController.forgotPassword);
router.post("/password/reset/:token", authController.resetPassword);
router.put("/password/change", isAuthenticatedUser, authController.changePassword);
router.get("/myprofile", isAuthenticatedUser, authController.getUserProfile);
router.put("/update", isAuthenticatedUser,upload.single("avatar"), authController.updateProfile);

//Admin routes
router.get("/admin/users/", isAuthenticatedUser, authorizeRoles('admin'), authController.getAllUsers);
router.get("/admin/user/:id", isAuthenticatedUser, authorizeRoles('admin'), authController.getUser);
router.put("/admin/user/:id", isAuthenticatedUser, authorizeRoles('admin'), authController.updateUser);
router.delete("/admin/user/:id", isAuthenticatedUser, authorizeRoles('admin'), authController.deleteUser);

module.exports = router;
