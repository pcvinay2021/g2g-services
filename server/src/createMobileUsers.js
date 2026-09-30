require("dotenv").config();
const mongoose=require("mongoose");
const bcrypt=require("bcryptjs");
const MobileUser=require("./models/MobileUser");
const connectDB=require("./config/db");

(async()=>{
  await connectDB();
  const users=[
    {name:process.env.MOBILE_MANAGER_NAME,mobile:process.env.MOBILE_MANAGER_MOBILE,loginId:process.env.MOBILE_MANAGER_LOGIN_ID,password:process.env.MOBILE_MANAGER_PASSWORD,role:"MANAGER"},
    {name:process.env.MOBILE_TECHNICIAN_NAME,mobile:process.env.MOBILE_TECHNICIAN_MOBILE,loginId:process.env.MOBILE_TECHNICIAN_LOGIN_ID,password:process.env.MOBILE_TECHNICIAN_PASSWORD,role:"TECHNICIAN"}
  ].filter(u=>u.name&&u.loginId&&u.password);
  for(const x of users){
    const existing=await MobileUser.findOne({loginId:String(x.loginId).toUpperCase()});
    if(existing){console.log(`${x.role} ${x.loginId} already exists`);continue;}
    await MobileUser.create({...x,loginId:String(x.loginId).toUpperCase(),password:await bcrypt.hash(x.password,12),mustChangePassword:true,active:true});
    console.log(`Created ${x.role}: ${x.loginId}`);
  }
  await mongoose.connection.close();
})().catch(e=>{console.error(e);process.exit(1)});
