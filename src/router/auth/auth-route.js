const express = require("express");
const {
  registerValidator,
  loginValidator,
} = require("../../validators/authvalidation");
const handleValidationErrors = require("../../middlewares/validate");
const authCtrl = require("../../controllers/auth-controllers");

const router = express.Router();

router.post(
  "/register",
  registerValidator,
  handleValidationErrors,
  authCtrl.register
);
router.post("/login", loginValidator, handleValidationErrors, authCtrl.login);
router.post("/logout", authCtrl.logout);
router.get("/me", authCtrl.me);

module.exports = router;
