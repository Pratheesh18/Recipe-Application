const jwt = require('jsonwebtoken');
const User = require('../models/User');

const generateToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:'30d'});
};

exports.register = async(req,res) => {
    const {firstName , lastName , email , phoneNumber , password , confirmPassword} = req.body;

    if(password !== confirmPassword){
        return res.status(400).json({message:'Passwords do not match'});
    }

    const userExists = await User.findOne({email});

    const user = await User.create({firstName,lastName,email,phoneNumber,password});

    res.status(201).json({
        _id : user._id,
        email : user.email,
        token : generateToken(user._id),
    })
};

exports.login = async (req,res) => {
    const {email , password} = req.body;
    const user = await User.findOne({email});

    if(user && (await user.matchPassword(password))){
        res.json({
            _id : user._id,
            email : user.email,
            token : generateToken(user._id),
        })
    }else{
        res.status(401).json({message : 'Invalid email or password'});
    }
}