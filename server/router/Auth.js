const bcrypt = require("bcryptjs/dist/bcrypt");
const express=require("express");
const router=express.Router();
const jwt=require("jsonwebtoken")
const Authenticate =require("../middleware/Authenticate")

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
        let token;
        const {email,password}=req.body;

        if(!email || !password){
            res.status(400).json({error:"Please Fill The Fields Properly.."})
        }

        const userLogin=await UserCrud.findOne({email:email});

        if(userLogin){
            const isMatch=await bcrypt.compare(password,userLogin.password);

        if(!isMatch){
            res.status(400).json({error : "Invalid Credentials"})
        }else{
            token=await userLogin.generateAuthToken();
            console.log(token);
          
            res.cookie("jwtoken", token, {
              expires: new Date(Date.now() + 25892000000),
              httpOnly: true,
            });
             res.json({ message: "User Login Successfully" });
        }
        }else{
            res.status(400).json({ error: "Invalid Credientials " });
        }
    
    } catch (error) {
        console.log(error)
    }
 
})


router.get("/products", Authenticate, (req, res) => {
  res.send(req.rootUser);
});

router.get("/home", Authenticate, (req, res) => {
  res.send(req.rootUser);
});



router.post("/userproducts",Authenticate,async (req,res)=>{
    try {
        
   const { ProductName, ProductPrice, ProductQuantity, ProductDescription } =
   req.body;
   if(!ProductName || !ProductPrice || !ProductQuantity || !ProductDescription){
       return res.status(422).json({error: "Please Fill The Fields Properly"});
   }
    const userAvailable = await UserCrud.findOne({ _id: req.userID });

    if(userAvailable){
          const userProduct = await userAvailable.addProduct(
            ProductName,
            ProductPrice,
            ProductQuantity,
            ProductDescription
          );

          await userAvailable.save();
          res.status(201).json({ message: "Product Saved Successfully" });
    }

    } catch (error) {
        console.log(error)
    }
   
})



module.exports = router;