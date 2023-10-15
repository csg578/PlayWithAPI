const express=require("express");
const app=express();
const port=8090;
const path=require("path");
const { v4: uuidv4 } = require('uuid');
const methodOverride=require("method-override"); 
app.use(methodOverride("_method"));
app.use(express.urlencoded({extended:true}));
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));
let posts=[
    {
        id:uuidv4(),
        username:"apnaccollege",
        content:"i love coding",
        
    },
    {
        id:uuidv4(),
        username:"apnikaksha",
        content:"i love decoding",
        
    },
    { 
        id:uuidv4(),
        username:"apnakatta",
        content:"i love debugging",
       
    },
    {
        id:uuidv4(),
        username:"apnbhai",
        content:"i love coding",
        
    },
]
app.listen(port,()=>{
    console.log("server is running on port",port);
});
app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts});
});
app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
});
app.post("/posts",(req,res)=>{
  let {username,content}=req.body;
  let id=uuidv4();
  posts.push({id,username,content});
    // res.send("post request working")
     res.redirect("/posts");
});
app.get("/posts/:id",(req,res)=>{
    let {id}=req.params;
    // console.log(id);
    let post=posts.find((p)=>id===p.id);
    console.log(post);
    res.render("show.ejs",{post});

 });
 app.patch("/posts/:id",(req,res)=>{
    let {id}=req.params;
    // console.log(id);
    let post=posts.find((p)=>id===p.id);
    let newContent=req.body.content;

    post.content=newContent;
    // console.log(newContent);
    console.log(post);
    // res.send("patch request working");
    res.redirect("/posts");
 });
 app.get("/posts/:id/edit",(req,res)=>{
    let{id}=req.params;
    let post=posts.find((p)=>id===p.id);
    res.render("edit.ejs",{post});
 });
app.delete("/posts/:id",(req,res)=>{
    let {id}=req.params;
    posts=posts.filter((p)=>id!==p.id);
    // posts.splice(posts.indexOf(post),1);
    res.redirect("/posts");
})