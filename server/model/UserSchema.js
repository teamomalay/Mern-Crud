const mongoose=require("mongoose");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken")


const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  products: [
    {
      
      ProductName: {
        type: String,
        required: true,
      },
      ProductPrice: {
        type: Number,
        required: true,
      },
      ProductQuantity: {
        type: Number,
        required: true,
      },
      ProductDescription: {
        type: String,
        required: true,
      },
    },
  ],
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

UserSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
      console.log("Hii I am pre password ");
      this.password = await bcrypt.hash(this.password, 12);
    }
    next();
  });

UserSchema.methods.generateAuthToken = async function () {
  try {
    let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
    this.tokens = this.tokens.concat({ token: token });
    await this.save();
    return token;
  } catch (err) {
    console.log(err);
  }
};

UserSchema.methods.addProduct = async function (
  ProductName,
  ProductPrice,
  ProductQuantity,
  ProductDescription
) {
  try {
    this.products = this.products.concat({
      ProductName,
      ProductPrice,
      ProductQuantity,
      ProductDescription,
    });
    await this.save();
    return this.products;
  } catch (error) {
    console.log(error);
  }
};

UserSchema.methods.deleteProduct = async function(id){
  try {
    this.products=this.products.filter((product)=>{
      return product._id !=  id;
    })
    await this.save();
    return this.products;
  } catch (error) {
    console.log(error)
  }
}


const UserCrud = mongoose.model("USERCRUD", UserSchema);

module.exports = UserCrud;