const bcrypt = require("bcryptjs/dist/bcrypt");
const express=require("express");
const router=express.Router();

require("../db/Conn");
const UserCrud = require("../model/UserSchema");

router.post("/register",async(req,res)=>{
    const { username, email,password,age,gender} = req.body;

    if(!username || !email || !password || !age || !gender){
        return res.status(422).json({error:"Please Fill the Fields Properly.."})
    }

    try{
        const UserExist=await UserCrud.findOne({email:email});

        if(UserExist){
            return res.status(422).json({error:"Email Already Exist.."})
        }
        else{
            const usercrud=new UserCrud({username, email,password,age,gender})

            await usercrud.save();
            res.status(201).json({
                message:"User Registered Successfully.."
            })
        }
    }catch(err){
        console.log(err);
    }
})

router.post("/signin",async(req,res)=>{
    try {
        const {email,password}=req.body;

        if(!email || !password){
            res.status(422).json({error:"Please Fill The Fields Properly.."})
        }

        const userLogin=await UserCrud.findOne({email:email});

        if(userLogin){
            const isMatch=await bcrypt.compare(password,userLogin.password);

        if(!isMatch){
            res.status(400).json({error : "Invalid Credentials"})
        }else{
           res.json({message:"User Login Successfully.."})
        }
    }else{
        res.status(400).json({error:"Invalid Credentials"})
    }
    
    } catch (error) {
        console.log(error)
    }
 
})

router.post("/userproducts",async(req,res)=>{
    try{
      const {productName,productPrice,productQuantity,productDescription}=req.body
      console.log(productName);
      if(!productName || !productPrice || !productQuantity || ! productDescription){
        res.status(422).json({error:"Please Fill The Fields Properly.."})
      }else{
        const Product=await UserCrud.findOne({_id:req.id});

        if(Product){
            const newProduct=await productName.addMessage(
                productName,productPrice,productQuantity,productDescription
            )
            await userContact.save();

            res.status(201).json({ message: "user Contact successfully" });
        }
      }
       
    }catch(error){
        console.log(error)
    }
})

module.exports = router;