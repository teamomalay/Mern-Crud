const mongoose=require("mongoose");
const bcrypt=require("bcryptjs")

const UserSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    },
    products:[
        {
       ProductName : {
            type:String,
            required:true
        },
        ProductPrice: {
            type:Number,
            required:true
        },
        ProductQuantity: {
            type:Number,
            required:true
        },
        ProductDescription: {
            type:String,
            required:true
        }
    }
    ]
})

UserSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
      console.log("Hii I am pre password ");
      this.password = await bcrypt.hash(this.password, 12);
    }
    next();
  });

const UserCrud = mongoose.model("USERCRUD", UserSchema);

module.exports = UserCrud;