const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const UserSchema = new mongoose.Schema(
  {
    fname: {
      required: [true, "Please Enter Your First Name"],
      type: String,
    },
    lname: {
      required: [true, "Please Enter Your Last Name"],
      type: String,
    },
    email: {
      required: [true, "Please Enter Your Email"],
      type: String,
      unique: true,
    },
    password: {
      required: [true, "Please Enter Your Password"],
      type: String,
    },
    frontId: {
      type: String,
      required: [true, "Please upload front image of CNIC"],
    },
    backId: {
      type: String,
      required: [true, "Please upload back image of CNIC"],
    },
    profileImage: {
      type: String,
    },
    code: {
      type: Number,
    },
    balance: {
      type: Number,
      default: 0
    },
    referralCode: { // The code of Person , who's code I've added during signUp as Referral
      type: String,
    },
    myReferral:{ //To invite people
      type: String
    },
    role:{
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    fundPassword: {
        type: String,
        required: [true, 'Please Enter fund Password']
    },
    walletAddress: {
      type: String,
    },
    directReferrals: [{ //type A
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }],
    indirectReferrals: [{ //type B
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }],
    referrer: { //The person who's referral code I've used
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  { timestamps: true }
);

UserSchema.methods.getFullName = function () {
  return `${this.fname} ${this.lname}`;
};

UserSchema.pre("save", async function () {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
});

UserSchema.pre("save", async function () {
  if (this.isModified("fundPassword")) {
    const salt = await bcrypt.genSalt(10);
    this.fundPassword = await bcrypt.hash(this.fundPassword, salt);
  }
});

UserSchema.methods.createToken = function () {
  const token = jwt.sign(
    { userId: this._id, name: this.getFullName() },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_LIFETIME }
  );
  return token;
};

UserSchema.methods.createOTPToken = function () {
  const token = jwt.sign(
    { userId: this._id, name: this.getFullName() },
    process.env.JWT_SECRET,
    { expiresIn: "2m" }
  );
  return token;
};

UserSchema.methods.comparePassword = async function (reqPassword) {
  const isMatch = await bcrypt.compare(reqPassword, this.password);
  return isMatch;
};

UserSchema.methods.compareFundPassword = async function (reqPassword) {
  const isMatch = await bcrypt.compare(reqPassword, this.fundPassword);
  return isMatch;
};

module.exports = mongoose.model("User", UserSchema);
