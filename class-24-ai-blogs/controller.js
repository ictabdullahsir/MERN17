const { userModel, blogModel } = require("./model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

async function register(req,res){
    let info = req.body;
    if(info.password.length < 6){
        return res.status(400).json({ message: "Password must be at least 6 characters long!" });
    }
    info.password = bcrypt.hashSync(info.password, 10);
    try{
        const newUser = await userModel.create(info);
        res.status(200).json({ message: "User registered successfully!", user: newUser });
    } catch (error) {
        res.status(500).json({ message: "Error registering user!" });
    }
}

async function login(req,res){
    const info = req.body;
    try {
        const user = await userModel.findOne({email: info.email})
        if(!user) {
            return res.status(401).json({ message: "Invalid email or password!" });
        }
        const isMatch = bcrypt.compareSync(info.password, user.password);
        if(!isMatch) {
            return res.status(401).json({ message: "Invalid email or password!" });
        }
        const token = jwt.sign({ userId: user._id }, "your_secret_key", { expiresIn: "1h" });
        res.status(200).json({ message: "Login successful!", token });
    } catch (error) {
        res.status(500).json({ message: "Error logging in!" });
    }
}

async function getLoggedinUser(token){
    
    const decoded = jwt.verify(token.split(" ")[1], "your_secret_key");
    console.log("Decoded Token:", decoded);
    const userId = decoded.userId;
    const user = await userModel.findById(userId);
    return user;
}

async function blogCreate(req,res){
    const info = req.body;
    try {
        const author = await getLoggedinUser(req.headers.authorization);
        console.log("Author:", author);
        const newBlog = await blogModel.create({...info, userId: author._id});
        res.status(200).json({ message: "Blog created successfully!", blog: newBlog });
    } catch (error) {
        res.status(500).json({ message: "Error creating blog!" });
    }
}

async function createBlogWithAI(req,res){
    const title = req.body.title;
    const prompt = `Write a blog post about ${title}, in 100 words. Just give me the content, no title, no headings, no bullet points.`;
    try {
        const response = await fetch(process.env.GROQ_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${process.env.GROQ_API_KEY}`
                },
                body: JSON.stringify({
                    "model": "llama-3.1-8b-instant",
                    "messages": [
                        { role: "user", content: prompt, }
                    ]
                })
            })
            if(!response.ok) {
                if(response.status === 429) {
                    // createBlogWithAI(req, res); // Retry the request
                    return res.status(429).json({ message: "Rate limit exceeded. Please try again later." });
                }
                res.status(500).json({ message: "Error creating blog with AI!" });
            }

            const data = await response.json()
            const author = await getLoggedinUser(req.headers.authorization);
            console.log("Author:", author);
            const newBlog = await blogModel.create({title: title, content: data?.choices?.[0]?.message?.content?.trim(), userId: author._id});
            res.status(201).json({ message: "Blog created successfully with AI!", blogContent: data?.choices?.[0]?.message?.content?.trim() });
    } catch (error) {
        res.status(500).json({ message: "Error creating blog with AI!" });
    }
}

async function getBlogs(req,res){
    try {
        const blogs = await blogModel.find()
        res.status(200).json({ message: "Blogs fetched successfully!", blogs });
    } catch (error) {
        res.status(500).json({ message: "Error fetching blogs!" });
    }
}

module.exports = { register, login, blogCreate, getBlogs, createBlogWithAI };