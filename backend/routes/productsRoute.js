var express = require("express");
var router = express.Router();
const path = require("path");
const multer = require("multer");
var productsController = require("../controllers/productsController");
const {isAuthenticatedUser, authorizeRoles} = require("../middlewares/authenticate");


const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, "..", "uploads/products"));
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  }),
});
 
router.get("/products", productsController.getProducts);
router.get("/products/:id", productsController.getSingleProducts); 
router.put("/review",isAuthenticatedUser, productsController.createReview);

//Admin routes
router.post("/admin/products/addNew",isAuthenticatedUser, authorizeRoles('admin'), upload.array("images") ,productsController.addNewProducts);
router.get("/admin/products",isAuthenticatedUser, authorizeRoles('admin'), productsController.getAdminProducts);
router.delete("/admin/products/:id",isAuthenticatedUser, authorizeRoles('admin'), productsController.deleteProducts);
router.put("/admin/products/:id",isAuthenticatedUser, authorizeRoles('admin'), upload.array("images") ,productsController.UpdateProducts);
router.get("/admin/reviews",isAuthenticatedUser, productsController.getReviews);
router.delete("/admin/reviews",isAuthenticatedUser, productsController.deleteReview);

module.exports = router;
