import mongoose from "mongoose";
import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const schema = new mongoose.Schema({
 name:{
    type: String,
    required: [true, 'Please Enter Name'],
 },
 email: {
    type: String,
    required: [true, 'Please Enter Email'],
    unique: [true, 'Email Already exist'],
    validator:validator.isEmail,
 },
 password: {
    type: String,
    required: [true, 'Please Enter Password'],
    minLength: [6, 'Password Must be at least 6 characters long'],
    select: false,
 },
 address: {
    type: String,
    required: true,
 },
 city: {
    type: String,
    required: true,
 },
 country: {
    type: String,
    required: true,
 },
 pinCode: {
    type: Number,
    required: true,
 },
 role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user',
 },
 avatar: {
    public_id: String,
    url: String
 },
 otp: Number,
 otp_expire: Date,

});
// encrypting the password
schema.pre("save", async function(next){
 if(!this.isModified('password')) return next();
this.password = await bcrypt.hash(this.password, 10);

});

// compare password entered
schema.methods.comparePassword = async function (enteredPassword){
return await bcrypt.compare(enteredPassword, this.password)

}
// generate jsonwebtoken
schema.methods.generateToken = function(){
   return jwt.sign({_id: this._id}, process.env.JWT_SECRET, {
      expiresIn: '15d'
   });
}

// export Use Model
export const User = mongoose.model('User', schema);
