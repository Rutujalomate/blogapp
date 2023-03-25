const mongoose=require("mongoose")

const blogSchema=new mongoose.Schema({
    
    
        title:{
type:String,
required:true
        },
    author:{
        type:mongoose.Schema.Types.ObjectId, 
        ref:"user",
        required:true
    },
    content:{type:String,required:true},
    name:{type:String,required:true},
    create:{type:Number,required:true},

    image:{ type: String,
        data: Buffer},
    category:{type:String,       
       enum:["newz","food","lifestyle","personal","photography","fashion","travel","general"],
       default:"general",

    required:true}
     
    })
     const Blog=mongoose.model("blog",blogSchema)
     module.exports=Blog