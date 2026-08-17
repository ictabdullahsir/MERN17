// customMiddleware 

async function checkUser(req, res, next)  {

    console.log("Checking user...");

    const isLoggedIn = true; // Replace with your actual authentication logic

    if (!isLoggedIn) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized"
        });
    }

    next();
};



module.exports = { checkUser };