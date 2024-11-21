import mongoose from 'mongoose'

const orderItemSchema = mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    qty:{
        type:Number,
        required: true
    },
    image:{
        type:String,
        required: true
    },
    price:{
        type:Number,
        required: true
    },
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
});

const orderSchema = mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required: true
    },
    orderItems: [orderItemSchema],

    shippingAddress:{
         address:{
        type:String,
        required: true
    },
    city:{
        type:String,
        required: true
    },
    postalCode:{
        type:Number,
        required: true
    },
    country:{
        type:String,
        required: true
    },
    },
    paymentMethod:{
        type:String,
        required: true,
        default: "Stripe"
    },
    paymentResult:{
        id:{
            type:String,
        },
        status:{
            type:String,
        },
        updatedTime:{
            type:String,
        },
        email:{
            type:String,
        },
    },
    taxPrice:{
        type:Number,
        required: true,
        default:0.0
    },
    shoppingPrice:{
        type:Number,
        required: true,
        default:0.0
    },
    totalPrice:{
        type:Number,
        required: true,
        default:0.0
    },
    isPaid:{
        type:Boolean,
        required: true,
        default:false
    },
    paidAt:{
        type:Date,
    },
    isDelivered:{
        type:Number,
        required: true,
        default:false
    },
    deliveredAt:{
        type:Date,
    },
},{
    timestamps:true
}
)

export const Order = mongoose.model("Order", orderSchema)