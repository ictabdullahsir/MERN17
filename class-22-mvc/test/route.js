// const express = require("express");

// const router = express.Router();

// // customMiddleware 

// // const checkUser = (req, res, next) => {

// //     console.log("Checking user...");

// //     const isLoggedIn = true; // Replace with your actual authentication logic

// //     if (!isLoggedIn) {
// //         return res.status(401).json({
// //             success: false,
// //             message: "Unauthorized"
// //         });
// //     }

// //     next();
// // };

// // end customMiddleware



// router.get("/test", checkUser, (req, res) => {
//   res.send("Test route is working");
// });


// module.exports = { router, checkUser };









const express = require("express");

const router = express.Router();

const {
    testController,
    userController
} = require("./controller");

const { checkUser } = require("./middleware");

// Test Route
router.get("/test", checkUser, testController);



module.exports = {
    checkUser
};