import { UserSchema } from "../models/UserSchema.js";
import users from "../data/users.js";
import { Products } from "../models/ProductSchema.js";
import products from "../data/products.js";
import generateToken from "../tokenGenerator.js";
import { Order } from "../models/OrderSchema.js";

export const addUsers = async (req, res) =>{
  await UserSchema.deleteMany({})
  const UserSeeder = await UserSchema.insertMany(users)
  res.send({UserSeeder})
}

export const addProducts = async (req, res) =>{
  await Products.deleteMany({})
  const productSeeder = await Products.insertMany(products)
  res.send({productSeeder})
}
//login function
export const getUser = async (req, res)=>{
  const {email, password} = req.body;

  const user = await UserSchema.findOne({email})
 
  if(user && (await user.matchPassword(password))){
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      isAdmin: user.admin,
      token: generateToken(user._id),
      createdAt: user.createdAt
    })
  }else{
    res.status(401);
    throw new Error("Invalid Email or Password")
  }
}
//register user
export const registerUser = async (req,res)=>{
  const user = req.body
  const {email, password} = user
  const existUser = await UserSchema.findOne({email});
  if (!user.name || !user.email || !user.password) {
    return res
      .status(401)
      .json({ success: false, message: "Please provide all the fields" });
  }

  const newUser = UserSchema(user)

 try{
    await newUser.save()
    res.status(201).json({success:true, data: newUser})
  }catch{
    res.status(400);
    throw new Error("User Already exists")
  }

}
//get user profile
export const getUserProfile = async(req, res)=>{

  
  const user = await UserSchema.findById(req.user._id);

  if(user){
    res.status(201).json({success:true, data: user})
  }else{
    res.status(404).json({success: false, message:"User not found"})
  }

}

//update user profile
export const updateUser = async (req,res) =>{
  const user = await UserSchema.findById(req.user._id)

  const{ name,email, password}= req.body
  if(user){
    user.name = name || user.name
    user.email = email || user.email
    if(password){
      user.password = password

    }

    const updatedUser = await user.save();
    res.status(201).json( {data: {
      id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      // Exclude password from the response
  }})
  }else{
    res.status(404).json({success: false, message:"User not found"})
  }
}

//get all products api
export const getProducts = async(req,res)=> {
  const product = await Products.find({});

  res.status(201).json({success: true, data:product})
}

//get a single product

export const getProduct = async(req,res)=>{
  const {id}= req.params;

  const product = await Products.findById(id)

  if(product){
    res.status(201).json({success: true, data: product})
  }else{
    res.status(404).json({success:false, message:"Product not found"})
  }
}

//get order

export const createOrders = async (req, res)=> {
  const{orderItems, shippingAddress, paymentMethods, shippingPrice, taxPrice, totalPrice, price} = req.body

  if(orderItems && orderItems.length === 0){
    res.status(404).json({success: false, message: "No Order Item found"})
  }else{
    const order = new Order({
      orderItems, paymentMethods, shippingPrice, taxPrice, totalPrice, price, user:req.user._id, shippingAddress
    })
    const createdOrder = await order.save()
    res.status(201).json(createdOrder)
  }
}

//update order payment status
export const updateOrder = async (req,res)=> {
  const {id} = req.params
  const {paymentid, status, updated_time, email_address}= req.body
  const order = await Order.findById(id);

  if (order){
    order.isPaid =true;
    order.paidAt= Date.now();

    order.paymentResult ={
      id: paymentid,
      status: status,
      updatedTime: updated_time,
      email: email_address,
    }

    const updatedOrder = await order.save()
    res.json(updatedOrder)
  }else{
    res.status(404).json({message:"No order found"})
  }
}

//get all orders
export const getAllOrders = async(req,res)=>{
  const orders = await Order.find({user:req.user._id}).sort({_id: -1})
  if(orders){
    res.status(201).json(orders)
  }else{
    res.status(404).josn({message: "Orders not found!"})
  }
}

//get one order by id
export const getOneOrder = async(req,res)=>{
  const order = await Order.findById(req.params.id).populate('user', 'email');

  if(order){
    res.status(200).json(order)
  }else{
    res.status(400).json({message:'Order Not found'})
  }
}