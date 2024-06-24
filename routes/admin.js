const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const jwt = require("jsonwebtoken");
const { Admin, Course } = require("../db");
const { jwt_secret } = require("../config");


// Admin Routes
router.post('/signup', async (req, res) => {
    // Implement admin signup logic
    const username = req.body.username
    const password = req.body.password

    //check if user with the username already exist
    let value = await Admin.findOne({
        username, password
    })
    if (!value) {
        await Admin.create({
            username: username,
            password: password
        })
        res.status(200).json({
            msg: "Admin User Created Successfully"
        })

    } else {
        res.status(403).json({
            msg: "username already exists"
        })
    }
});

router.post('/signin', async (req, res) => {
    // Implement admin signup logic
    const username = req.body.username
    const password = req.body.password

    const user = await Admin.findOne({
        username,
        password
    })
    if (user) {
        const token = jwt.sign({ username }, jwt_secret)
        res.json({
            token
        })
    } else {
        res.status(411).json({
            message: "Incorrect username or password"
        })
    }
});

router.post('/courses', adminMiddleware, async (req, res) => {
    // Implement course creation logic
    const title = req.body.title;
    const desc = req.body.description;
    const price = req.body.price;
    console.log(typeof (price))
    const imageLink = req.body.imageLink;

    const newCourse = await Course.create({
        title: title,
        description: desc,
        price: price,
        imageLink: imageLink

    })
    
    res.status(200).json({
        msg: "Course added successfully",
        courseId: newCourse._id
    })
});

router.get('/courses', adminMiddleware, async (req, res) => {
    // Implement fetching all courses logic
    const response = await Course.find({});
    res.json({
        courses:response
    })
});

module.exports = router;


