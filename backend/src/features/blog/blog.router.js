const express=require("express")
const Blog = require("./blog.model")
const User=require("../user/user.model");
const jwt=require("jsonwebtoken")

const app=express.Router()

// const authMiddleware=async(req,res,next)=>{
//   const token=req.headers.token
//   //const{email,password}=req.body
//     ///console.log("email",email,password)
//     if(!token){
//       res.send("missung token")
//     }
//     let[id,email,password]=token.split(":")

//     try{
//     let user=await User.findOne({email})
//     console.log("user",user)
//     if(user){
//         if(password===user.password){
//             console.log("in")
//             req.userId=user.id;
//             next()

//             //res.send({token:`${email}_#_${password}`,user})
//         }
//         else{
//             res.status(404).send(` Athentication failed incorrect password`)
//         }
//     }else{
//         res.status(401).send(`Operation not allowed.`)

//     }
// }catch(e){
//     res.send(e.message)
// }

// }
// app.use(authMiddleware)


app.get("/",async(req,res)=>{
  //console.log("token",token)
  const id=req.headers.id
  console.log('userid',id);

  const {limit=10,page=1}=req.query

    try{
        let user=await User.findById({"_id":id})
console.log(user);
        if(user){
    let blogs=await Blog.find({"author":id}).limit(limit).skip((page-1)*limit)
res.send(blogs)
        }
        else{
            res.send("please signup")
        }
    
}catch(e){
    res.send(e.message)
}
})


app.get("/getall",async(req,res)=>{
    //console.log("token",token)
    //const id=req.headers.id
    //console.log(id);
  
    const {limit=10,page=1,category, q}=req.query
    let query = {};
    if(q) {
      query = {$text: {$search: q}};
    }
    if(category) query.category = category;
   
      try{
          let user=await User.find()
  console.log(user);
          if(user){
      let blogs=await Blog.find(query).limit(limit).skip((page-1)*limit).populate("author")

  res.send(blogs)
          }
          else{
              res.send("please signup")
          }
      
  }catch(e){
      res.send(e.message)
  }
  })


app.post("/blogpost",async(req,res)=>{
   const token=req.headers["token"]

    try{
        
        const decoded=jwt.decode(token)
        console.log('decoded',decoded.id);
        //console.log('req.body',req.body.author);

        if(decoded.role =="user" && req.body.author==decoded.id){
            let blog=await Blog.create({...req.body,name:decoded.name,create:decoded.iat})
    
  res.send({blog,decoded})
}
    else{
        return  res.status(403).send('You are not allowed to create blog')
    
}        

    }catch(e){
        res.send(e.message)
    }
})


app.get("/:id", async(req,res)=>{
  let id=req.params.id
 // let num=Number(id)
  //console.log(req.method,req.url)
  //let product=db.products.find((products)=> products.id===num)
  let user=await Blog.findById({"_id":id})
  try{
      if(user){
          res.send(user)
      }else{
          res.send("user not found")
      }
  }catch(e){
      res.send(e.message)
  }

  })





  
  
     app.delete("/:id", async(req,res)=>{
      let id=req.params.id
     console.log("id",id);

      const token=req.headers["token"]

      try{
          
          const decoded=jwt.decode(token)
          console.log(decoded);
  
          if(decoded.role ==="user" || decoded.role==="admin" ){
              let blog1=await Blog.findById({"_id":id});
              console.log("blog",blog1)
              if(decoded.id==blog1.author){
                let blog=await Blog.findByIdAndDelete({"_id":id});

                  if(blog){
                  res.send('blog deleted')
              }else{
                  res.send("blog is not found to delete")
              }  
            }else{
                res.send(' cant delete other writers blog')
            }
  
          }
  else{
    return  res.status(403).send('not allowed to delete blog')
         
    //res.send(blog)
  
  }        
  
      }catch(e){
          res.send('can not find blog by this id ')
      }

    })



    app.patch("/:id", async(req,res)=>{
        let id=req.params.id
       
  
        const token=req.headers["token"]
  
        try{
            
            const decoded=jwt.decode(token)
            console.log(decoded);
    
            

    if(decoded.role ==="user"  ){
        let blog1=await Blog.findById({"_id":id});
        console.log("blog",blog1)
        if(decoded.id==blog1.author){
            let blog=await Blog.findByIdAndUpdate({"_id":id},{...req.body},{new:true})

            if(blog){
            res.send(blog)
        }else{
            res.send("blog is not found to update")
        }  
      }else{
          res.send(' cant update other writers blog')
      }

    }
else{
return  res.status(403).send('not allowed to update blog')
   
//res.send(blog)

}        
 }catch(e){
            res.send(e.message)
        }
  
      })
  
module.exports=app