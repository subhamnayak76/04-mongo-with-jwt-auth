const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const {User,Course} = require("../db/index")
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

// User Routes
router.post('/signup', (req, res) => {
    // Implement user signup logic
    const username = req.body.username
    const password = req.body.password
    User.create({
        username,
        password
    })
    .then(()=>{
        res.json({
            msg : "user is created"
        })
    })
    .catch(()=>{
        res.json({
            msg : "user is not created due some error"
        })
    })

});

router.post('/signin', (req, res) => {
    // Implement admin signup logic
    const username = req.headers.username
    const password = req.headers.password
    Course.find({
        username,
        password
    })
    .then(() => {const token = jwt.sign({username},JWT_SECRET) 
    res.json({
        token
    })  
    })
    

});

router.get('/courses', (req, res) => {
    // Implement listing all courses logic
    Course.find({}).then((response)=>{
        res.json({response})
    })

});

router.post('/courses/:courseId', userMiddleware, (req, res) => {
    // Implement course purchase logic
    const username = req.username
    console.log(username)
    const courseId = req.params.courseId
    User.updateOne({
        username: username
    }, {
        "$push": {
            purchasedCourse: courseId
        }
    })
        .then(() => {
            res.json({
                msg: "Course in purchased"
            })
        })
        .catch(() => {
            res.json({
                msg: "error "
            })
        })

});

router.get('/purchasedCourses', userMiddleware, async(req, res) => {
    // Implement fetching purchased courses logic const user = await User.findOne({
        const user = await User.findOne({
            username: req.username
        });



    const courses = await Course.find({
        _id: {
            "$in": user.purchasedCourse
        }
    });

    res.json({
        courses: courses
    })
});

module.exports = router