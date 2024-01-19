const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const {JWT_SECRET} = require("../config")
const {Admin, Course} = require("../db/index")
const jwt = require("jsonwebtoken")
// Admin Routes
router.post('/signup', (req, res) => {
    // Implement admin signup logic
    const username = req.body.username
    const password = req.body.password
    Admin.create({
        username,
        password
    })
    .then(() =>{
        res.json({
            msg : "admin is created successfully"
        })
    })
    .catch((error) => {
        console.error("Error creating admin:", error);
        res.status(500).json({
            msg: "admin not created"
        });
    })
    
});

router.post('/signin', (req, res) => {
    // Implement admin signup logic
    const username = req.body.username
    const password = req.body.password
    Admin.find({
        username,
        password
    })
    .then(() => {
        const token = jwt.sign({username},JWT_SECRET)
        console.log(token)
        res.json({
            token
        })
    })
});

router.post('/courses', adminMiddleware, (req, res) => {
    // Implement course creation logic
    const title = req.body.title
    const description = req.body.description
    const ImageLink = req.body.ImageLink;
    const price = req.body.price

     Course.create({
        title : title,
        description : description,
        ImageLink : ImageLink,
        price : price

    })
    .then((course) => {
        res.json({
            msg : "course are successfully created",
            courseid  : course._id
        })
    })
    .catch(() =>{
        res.json({
            msg : "course are not created"
        })
    })



});

router.get('/courses', adminMiddleware, (req, res) => {
    // Implement fetching all courses logic
    Course.find({}).then((value) => {
        res.json({
            msg : value
        })
    })
});

module.exports = router;