const express = require("express");
const router = express.Router();

const path = require("path");

//Middleware
const admin = require("../middleware/isAdmin");
const staff = require("../middleware/isStaff");
const resident = require("../middleware/isResident");
const { homeRedirect } = require("../middleware/homeRedirect");

//home route
router.get("/", (req, res) => {
  homeRedirect(req, res);
});

//login route
router.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "../../client/login.html"));
});

// login with google route
router.get("/login-with-google", (req, res) => {
  res.sendFile(path.join(__dirname, "../../client/loginWithGoogle.html"));
});

//forgot password route
router.get("/forgot-password", (req, res) => {
  res.sendFile(path.join(__dirname, "../../client/forgotPassword.html"));
});

//reset password route
router.get("/reset-password", (req, res) => {
  res.sendFile(path.join(__dirname, "../../client/resetPassword.html"));
});

//user registration route
router.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname, "../../client/register.html"));
});

//user Facial Registration Login route
router.get("/facialAuth", (req, res) => {
  res.sendFile(path.join(__dirname, "../../client/facialAuth.html"));
});

//user Facial Registration Registration route
router.get("/setUpFacialAuth", (req, res) => {
  res.sendFile(path.join(__dirname, "../../client/setUpFacialAuth.html"));
});

//Admin frontend route
router.get(
  "/admin",
  (req, res, next) => admin.isAdmin(req, res, next),
  (req, res) => {
    res.sendFile(path.join(__dirname, "../../client/admin.html"));
  }
);

//Resident frontend route
router.get(
  "/resident",
  (req, res, next) => resident.isResident(req, res, next),
  (req, res) => res.sendFile(path.join(__dirname, "../../client/resident.html"))
);

//Staff frontend route
router.get(
  "/staff",
  (req, res, next) => staff.isStaff(req, res, next),
  (req, res) => res.sendFile(path.join(__dirname, "../../client/staff.html"))
);

//Generate code page for user registration, admin only access
router.get(
  "/admin/generateCode",
  (req, res, next) => admin.isAdmin(req, res, next),
  (req, res) => {
    res.sendFile(path.join(__dirname, "../../client/generateCode.html"));
  }
);

module.exports = router;
