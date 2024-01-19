const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb+srv://admin:2GDz9pddchpSNPb7@cluster0.1gk0os9.mongodb.net/cousre_selling_app2');

// Define schemas
const AdminSchema = new mongoose.Schema({
    // Schema definition here
    username: String,
    password : String 
});

const UserSchema = new mongoose.Schema({
    // Schema definition here
    username : String,
    password : String, 
    purchasedCourse: [{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Course'
    }]   
});

const CourseSchema = new mongoose.Schema({
    // Schema definition here
    title : String,
    description : String,
    ImageLink : String,
    price : Number
});

const Admin = mongoose.model('Admin', AdminSchema);
const User = mongoose.model('User', UserSchema);
const Course = mongoose.model('Course', CourseSchema);

module.exports = {
    Admin,
    User,
    Course
}