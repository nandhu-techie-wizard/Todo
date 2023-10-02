const mongoose =require('mongoose');
const validator =require('validator')
const bcrypt =require('bcrypt')
const jwt =require('jsonwebtoken')
const userSchema =new mongoose.Schema({
    Name:{
        type:String,
        required:[true,'Please enter name']
    },
    email :{
        type:'string',required:[true,"please add email"],
        unique: true,
        validate:[validator.isEmail, 'please Enter the vaild Email address']
    },
    password:{
        type:"string",
        required:[true,'please Enter Password'],
        maxlength: [8, 'Password cannot exceed 8 characters'],
        select:false
    },
    resetPasswordToken:{
        type:String
    },
    resetPasswordExpire:{type:Date},
    createdAt:{
        type:Date, 
        default: Date.now()
    }
})

userSchema.pre('save',async function(next){
    this.password = await bcrypt.hash(this.password, 10)
})

userSchema.methods.getJwtToken =function () {
   return  jwt.sign({id: this.id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRES_TIME// expires in two days
    })
    
}
userSchema.methods.isVaildPassword = async function(enterpassword){
    return bcrypt.compareSync(enterpassword,this.password);

}
let model =mongoose.model('user',userSchema)

module.exports =model;