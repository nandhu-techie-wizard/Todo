const catchAsyncError=require('../middlewares/catchAsyncError')
const User=require('../models/userModel')
const ErrorHandler =require('../utils/errorHandler')
const sendToken =require('../utils/jwt')


//create
exports.registerUser =catchAsyncError(async(req,res,next)=>{
    const {name,email,password}=req.body

    const user =await User.create({
        name,
        email, 
        password
    });
//token
sendToken(user,201,res);
})

//login api

exports.loginUser =catchAsyncError(async(req,res,next)=>{
    const{email ,password}  = req.body;

    if(!email || !password ){
        return next(new ErrorHandler('please enter email & password',401))

    }
    //finding the data user
   const user=await  User.findOne({email}).select('+password')

   if(!user){
    return next ( new ErrorHandler ('Invalid email or password' ,401));
   }

   if(!await user.isVaildPassword(password)){
    return next ( new ErrorHandler ('Invalid email or password' ,401));
   }
   //generate a jwt token and send it to client side
   sendToken(user,201,res);
})