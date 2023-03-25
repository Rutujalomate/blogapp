const express=require("express");
const { db } = require("./user.model");
const User=require("./user.model");

const app=express.Router()


app.use(express.urlencoded({extended:true}))


const jwt=require("jsonwebtoken")
const blacklist=[]


app.post("/signup",async(req,res)=>{
    const {name,email,password,age}=req.body
const token=req.headers["token"]
    try{
        if(token){
        const decoded=jwt.decode(token)
        if(decoded){
            if(decoded.role=="admin"){
                let user=new User({name,email,password,age,role:"writer"})
                console.log('user1',user)
                await user.save()
              return  res.send('writer created sucessfully')

            }else{
                res.status(403).send("you are not allowed to create writer")
            }
        }

    }

    }catch(e){
        res.send("Non admin side is try to create writer")
    }
    
   // let user=new User({name,email,password,age})
   // console.log('user2',user)
   // await user.save()
   try {
    let user=await User.create({
        name,email,password,age})
    console.log("user",user)
      return  res.status(201).send(user)
   } catch (error) {
    return res.send(error.message)
   }
   

})

















app.post("/login",async(req,res)=>{
    const {email,password}=req.body
    console.log(email,password)

    try{
       let user=await User.findOne({email})
       //console.log(user)
       if(user){
        if(user.password===password){
            const token=jwt.sign({id:user._id,name:user.name,age:user.age,role:user.role},"Secreate123",
            {expiresIn:'12 day'}
            )

            const refreshtoken=jwt.sign({},"Secreaterefresh123",
            {expiresIn:'13 days'})
            res.send({message:'Login Successfull',token,refreshtoken,user})

        }
        else{
            res.status(404).send({message:` Athentication failed incorrect password`})
        }
       }else{
        res.status(404).send({message:`user with email ${email} not found`})

       }

    }catch(e){
        res.send(e.message)
    }
    
})











app.use((req,res,next)=>{
    const token=req.headers.token
    //const{email,password}=req.body
      ///console.log("email",email,password)
      if(!token){
        res.send("missung token")
      }
      //const verification=jwt.verify(token,"Secreate123")

      try{
        const verification=jwt.verify(token,"Secreate123")
console.log(verification);
        if(verification.exp>new Date().getTime()){
           // let user=await User.findById({"_id":id})

            res.send('token is expired')

        }
        if(blacklist.includes(token)){
            return res.send('token already used')
               }
               next()

  }catch(e){
      res.send(e.message)
  }
  
  })
  //app.use(authMiddleware)





  app.post("/logout",async(req,res)=>{
    const token=req.headers.token
blacklist.push(token)
return res.send('user logged out sucessfully')
})









app.post("/refresh", async(req,res)=>{
    let id=req.params
   const refreshtoken=req.headers['refreshtoken']
   if(!refreshtoken){
    res.send("token not found")
   }
    //console.log(req.method,req.url)
    //let product=db.products.find((products)=> products.id===num)
const verification=jwt.verify(refreshtoken,"Secreaterefresh123")
    try{
        if(verification){
           // let user=await User.findById({"_id":id})
const newtoken=jwt.sign({id:verification.id,age:verification.age},'Secreate123',
{expiresIn:'10 days'}
)
            res.send({token:newtoken})
        }else{
            res.send("user not found")
        }
    }catch(e){
        res.send(e.message)
    }
  
    })





    app.patch("/:id", async(req,res)=>{
        let id=req.params.id
       
  
        const token=req.headers["token"]
  
        try{
            
            const decoded=jwt.decode(token)
            console.log(decoded);
    
            

    if(decoded.role ==="admin"  ){
        //let blog1=await Blog.findById({"_id":id});
        //console.log("blog",blog1)
        //if(decoded.id==blog1.author){
            let user=await User.findByIdAndUpdate({"_id":id},{...req.body},{new:true})

            if(user){
            res.send(user)
        }else{
            res.send("user is not found to update")
        }  
      //}else{
         // res.send(' cant update other writers blog')
      //}

    }
else{
return  res.status(403).send('not allowed to update blog')
   
//res.send(blog)

}        
 }catch(e){
            res.send(e.message)
        }
  
      })







app.get("/user/:id", async(req,res)=>{
    let {id}=req.params
   const token=req.headers['token']
   if(!token){
    console.log('hiiii')
    return res.send('Unauthrized')
   }
//    if(blacklist.includes(token)){
// return res.send('token already expired')
//    }
    //console.log(req.method,req.url)
    //let product=db.products.find((products)=> products.id===num)
// if(verification){
//     return res.send("verify")
// }
    try{
        const verification=jwt.verify(token,"Secreate123")

        if(verification){
            let user=await User.findOne({_id:id})

            res.send({user})
        }else{
            res.send("user not found")
        }
    }catch(e){
        console.log(e.message);

        if(e.message=="jwt expired"){
            console.log('jklhguiop');

blacklist.push(token)
        }
       return res.send(blacklist)

    }
  
    })





    module.exports=app


    
      //app.use(authMiddleware)












