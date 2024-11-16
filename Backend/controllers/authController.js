const jwt = require('jsonwebtoken');
const User = require('../models/User');

const generateToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:'15m'});
};

const generateRefreshToken = (id) => {
    return jwt.sign({id},process.env.REFRESH_SECRET,{expiresIn:'30d'});
}

exports.register = async(req,res) => {
    const {firstName , lastName , email , phoneNumber , password} = req.body;

    const userExists = await User.findOne({email});
    if(userExists){
        return res.status(400).json({message:'User already exists'});
    }

    const user = await User.create({firstName,lastName,email,phoneNumber,password});

    const accessToken = generateToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    res.cookie('refreshToken',refreshToken,{
        httpOnly : true,
        secure : process.env.NODE_ENV === 'production',
        sameSiyte : 'Strict',
        maxAge : 30*24*60*60*1000,
    })

    res.status(201).json({
        _id : user._id,
        email : user.email,
        accessToken
    })
};

exports.login = async (req,res) => {
    const {email,password} = req.body;
    const user = await User.findOne({email});

    if(user && (await user.matchPassword(password))){
        const accessToken = generateToken(user._id);
        const refreshToken = generateRefreshToken(user._id);


        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict',
            maxAge: 30 * 24 * 60 * 60 * 1000,
        });

        res.json({
            _id: user._id,
            email: user.email,
            accessToken,
        });
    
    }else{
        res.status(401).json({message : 'Invalid email or password'});
    }
};

exports.refreshToken = (req,res) => {
    const refreshToken = req.cookies.refreshToken;
    if(!refreshToken){
        return res.status(401).json({message:'Refresh token not found'});
    }

    try{
        const decoded = jwt.verify(refreshToken,process.env.REFRESH_SECRET);
        const newAccessToken = generateToken(decoded.id);
        res.json({accessToken:newAccessToken});
    }catch(error){
        res.status(403).json({message:'Invalid refresh token'});
    }
};

exports.logout = (req,res) => {
    res.clearCookie('refreshToken',{httpOnly:true,sameSite:'Strict'});
    res.json({message:'Logged out successfully'});
}