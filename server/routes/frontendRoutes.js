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
  //if logged in, redirect to the appropriate dashboard, if logged out, redirect to login page
  homeRedirect(req, res);

});

//login route
router.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "../../client/html/auth/login.html"));
});

//forgot password route
router.get("/forgot-password", (req, res) => {
  res.sendFile(
    path.join(__dirname, "../../client/html/auth/forgotPassword.html")
  );
});

//reset password route
router.get("/reset-password", (req, res) => {
  res.sendFile(
    path.join(__dirname, "../../client/html/auth/resetPassword.html")
  );
});

//user registration route
router.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname, "../../client/html/auth/register.html"));
});

//user Facial Registration Login route
router.get("/verify-face", (req, res) => {
  res.sendFile(path.join(__dirname, "../../client/html/auth/facialAuth.html"));
});

//dashboard pages

//Admin frontend route
router.get(
  "/admin",
  (req, res, next) => admin.isAdmin(req, res, next),
  (req, res) => {
    res.sendFile(path.join(__dirname, "../../client/html/admin/admin.html"));
  }
);

//Resident frontend route
router.get(
  "/resident",
  (req, res, next) => resident.isResident(req, res, next),
  (req, res) =>
    res.sendFile(
      path.join(__dirname, "../../client/html/resident/resident.html")
    )
);

//Staff frontend route
router.get(
  "/staff",
  (req, res, next) => staff.isStaff(req, res, next),
  (req, res) =>
    res.sendFile(path.join(__dirname, "../../client/html/staff/staff.html"))
);

/* Admin Frontend Routes */

//Admin page for generating registration code
router.get(
  "/admin/generateCode",
  (req, res, next) => admin.isAdmin(req, res, next),
  (req, res) => {
    res.sendFile(
      path.join(__dirname, "../../client/html/admin/generateCode.html")
    );
  }
);

//Admin page for managing users
router.get(
  "/admin/manageUsers",
  (req, res, next) => admin.isAdmin(req, res, next),
  (req, res) => {
    res.sendFile(
      path.join(__dirname, "../../client/html/admin/manageUsers.html")
    );
  }
);

//Admin page for signing in visitors
router.get(
  "/admin/checkInVisitor",
  (req, res, next) => admin.isAdmin(req, res, next),
  (req, res) => {
    res.sendFile(
      path.join(__dirname, "../../client/html/admin/checkInVisitor.html")
    );
  }
);

//Admin page for managing visitors(E.g. viewing visitor details, logging them out when they leave, etc.)

router.get(
  "/admin/manageVisitors",
  (req, res, next) => admin.isAdmin(req, res, next),
  (req, res) => {
    res.sendFile(
      path.join(__dirname, "../../client/html/admin/manageVisitors.html")
    );
  }
);

//admin issue fines page
router.get(
  "/admin/issueFine",
  (req, res, next) => admin.isAdmin(req, res, next),
  (req, res) => {
    res.sendFile(
      path.join(__dirname, "../../client/html/admin/issueFine.html")
    );
  }
);

//admin view fines page
router.get(
  "/admin/manageFines",
  (req, res, next) => admin.isAdmin(req, res, next),
  (req, res) => {
    res.sendFile(
      path.join(__dirname, "../../client/html/admin/manageFines.html")
    );
  }
);

//admin send notification page
router.get(
  "/admin/sendNotification",
  (req, res, next) => admin.isAdmin(req, res, next),
  (req, res) => {
    res.sendFile(
      path.join(__dirname, "../../client/html/user/sendNotification.html")
    );
  }
);

//admin view reports
router.get(
  "/admin/viewReports",
  (req, res, next) => admin.isAdmin(req, res, next),
  (req, res) => {
    res.sendFile(
      path.join(__dirname, "../../client/html/admin/viewReports.html")
    );
  }
);

/* Resident Frontend Routes */

//Resident page for generating visitor password and checking current visitor password if one is generated
router.get(
  "/resident/generatevisitorPassword",
  (req, res, next) => resident.isResident(req, res, next),
  (req, res) => {
    res.sendFile(
      path.join(
        __dirname,
        "../../client/html/resident/generateVisitorPassword.html"
      )
    );
  }
);

//Resident page for managing issues
router.get(
  "/resident/manageIssues",
  (req, res, next) => resident.isResident(req, res, next),
  (req, res) => {
    res.sendFile(
      path.join(
        __dirname,
        "../../client/html/resident/manageIssuesResident.html"
      )
    );
  }
);

//Resident page for logging an issue
router.get(
  "/resident/logIssue",
  (req, res, next) => resident.isResident(req, res, next),
  (req, res) => {
    res.sendFile(
      path.join(__dirname, "../../client/html/resident/logIssue.html")
    );
  }
);

//Resident page for viewing fines
router.get(
  "/resident/viewFines",
  (req, res, next) => resident.isResident(req, res, next),
  (req, res) => {
    res.sendFile(
      path.join(__dirname, "../../client/html/resident/viewFines.html")
    );
  }
);

router.get(
  "/resident/viewNotifications",
  (req, res, next) => resident.isResident(req, res, next),
  (req, res) => {
    res.sendFile(
      path.join(__dirname, "../../client/html/resident/viewNotifications.html")
    );
  }
);

/* Staff Frontend Routes */
router.get(
  "/staff/manageIssues",
  (req, res, next) => staff.isStaff(req, res, next),
  (req, res) => {
    res.sendFile(
      path.join(__dirname, "../../client/html/staff/manageIssuesStaff.html")
    );
  }
);

router.get(
  "/staff/sendNotification",
  (req, res, next) => staff.isStaff(req, res, next),
  (req, res) => {
    res.sendFile(
      path.join(__dirname, "../../client/html/user/sendNotification.html")
    );
  }
);

router.get(
  "/staff/register-face",
  (req, res, next) => staff.isStaff(req, res, next),
  (req, res) => {
    res.sendFile(
      path.join(__dirname, "../../client/html/user/setUpFacialAuth.html")
    );
  }
);

router.get(
  "/resident/register-face",
  (req, res, next) => resident.isResident(req, res, next),
  (req, res) => {
    res.sendFile(
      path.join(__dirname, "../../client/html/user/setUpFacialAuth.html")
    );
  }
);

router.get(
  "/admin/register-face",
  (req, res, next) => admin.isAdmin(req, res, next),
  (req, res) => {
    res.sendFile(
      path.join(__dirname, "../../client/html/user/setUpFacialAuth.html")
    );
  }
);

module.exports = router;
