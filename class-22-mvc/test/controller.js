// controller.js

const testController = (req, res) => {
    res.send("Test route is working from controller");
};


module.exports = { testController, userController };