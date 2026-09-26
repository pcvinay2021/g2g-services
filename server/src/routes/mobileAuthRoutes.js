const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");
const MobileUser = require("../models/MobileUser");
const { mobileAuth } = require("../middleware/mobileAuth");

const router = express.Router();
const safeUser = u => ({ id:u._id, name:u.name, mobile:u.mobile||"", loginId:u.loginId||"", role:u.role, active:u.active, mustChangePassword:!!u.mustChangePassword });

router.post("/register", async (req,res) => {
  try {
    const { name, mobile, password } = req.body;
    if (!name || !mobile || !password || String(password).length < 4) return res.status(400).json({success:false,message:"Name, mobile and a password of at least 4 characters are required."});
    const exists = await MobileUser.findOne({ mobile:String(mobile).trim() });
    if (exists) return res.status(409).json({success:false,message:"Mobile number is already registered."});
    const user = await MobileUser.create({ name:String(name).trim(), mobile:String(mobile).trim(), password:await bcrypt.hash(password,12), role:"CUSTOMER", active:true });
    res.status(201).json({success:true,message:"Registration successful.",user:safeUser(user)});
  } catch (e) { console.error(e); res.status(500).json({success:false,message:"Unable to register."}); }
});

router.post("/login", async (req,res) => {
  try {
    const { role, loginId, password } = req.body;
    if (!role || !loginId || !password) return res.status(400).json({success:false,message:"Role, Login ID/mobile and password are required."});
    let user, okRole = String(role).toUpperCase();
    if (okRole === "ADMIN") {
      user = await Admin.findOne({ $or:[{email:String(loginId).toLowerCase().trim()},{name:String(loginId).trim()}] });
      if (!user || !(await bcrypt.compare(password,user.password))) return res.status(401).json({success:false,message:"Invalid login credentials."});
    } else {
      const id = String(loginId).trim();
      user = await MobileUser.findOne({ role:okRole, active:true, $or:[{loginId:id.toUpperCase()},{mobile:id},{name:id}] });
      if (!user || !(await bcrypt.compare(password,user.password))) return res.status(401).json({success:false,message:"Invalid login credentials."});
    }
    const payload = { id:String(user._id), role:okRole, name:user.name, loginId:user.loginId||user.email||"" };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn:"7d"});
    res.json({success:true,token,user: okRole === "ADMIN" ? {id:user._id,name:user.name,email:user.email,role:"ADMIN",active:true,mustChangePassword:false} : safeUser(user)});
  } catch(e) { console.error(e); res.status(500).json({success:false,message:"Unable to login."}); }
});

router.get("/me", mobileAuth, async (req,res) => {
  try {
    if (req.user.role === "ADMIN") { const u=await Admin.findById(req.user.id).select("-password"); return res.json({success:true,user:{id:u._id,name:u.name,email:u.email,role:"ADMIN",active:true}}); }
    const u=await MobileUser.findById(req.user.id); if(!u) return res.status(404).json({success:false,message:"User not found."});
    res.json({success:true,user:safeUser(u)});
  } catch(e){res.status(500).json({success:false,message:"Unable to fetch profile."});}
});

router.patch("/password", mobileAuth, async (req,res) => {
  try {
    if (req.user.role === "ADMIN") return res.status(403).json({success:false,message:"Admin password is managed separately."});
    const { currentPassword, newPassword }=req.body;
    const u=await MobileUser.findById(req.user.id);
    if(!u || !(await bcrypt.compare(currentPassword||"",u.password))) return res.status(400).json({success:false,message:"Current password is incorrect."});
    if(!newPassword || String(newPassword).length<4) return res.status(400).json({success:false,message:"New password must be at least 4 characters."});
    u.password=await bcrypt.hash(newPassword,12); u.mustChangePassword=false; await u.save();
    res.json({success:true,message:"Password changed successfully."});
  } catch(e){res.status(500).json({success:false,message:"Unable to change password."});}
});

module.exports=router;
