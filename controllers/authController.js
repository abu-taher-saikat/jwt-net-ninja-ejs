const User = require('../models/User')

// Handle Errors
const HandleErrors = (err)=>{
    console.log(err.message, err.code);
    let errors = {email : '', password : ''}


    // Duplicate Error code
    if (err.code === 11000){
        errors.email = "that email is already registerd";
    }

    // Validation Error
    if(err.message.includes('user validation failed')){
        Object.values(err.errors).forEach(({properties})=>{
            // console.log(properties);
            errors[properties.path] = properties.message;
        })
    }

    return errors
}

module.exports.signup_get = (req,res)=>{
    res.render('signup')
}

module.exports.login_get = (req,res)=>{
    res.render('login')
}
module.exports.signup_post = async(req,res)=>{
    const {email, password} = req.body;

    try{
    const user =  await User.create({email, password})
        res.status(201).json(user)
    }catch(err){
        const errors = HandleErrors(err)
        res.status(400).json({errors})
    }
}
module.exports.login_post = async (req,res)=>{
    const {email, password} = req.body;

    console.log(req.body);
    res.send('user login')
} 