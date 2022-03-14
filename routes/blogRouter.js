const express = require('express');
const Blog = require('../model/blogModel');
const router = express.Router();

if(process.env.NODE_ENV !== 'production')
   require('dotenv').config();


router.get('/', async (req, res) => {
    await Blog.find().sort({ createdAt: 'desc' })
      .then((blogs)=>{
                res.render('index', { blogs : blogs });
          })
       .catch((err)=>{
         //console.log(err.message);
       }) 
  })


router.get('/new', (req, res) => {

  res.render('new', { blog: Blog });
})


router.get('/edit/:id', async (req, res) => {
await Blog.findById(req.params.id)
 .then((blog)=>{
  res.render('edit', { blog: blog });
 }) 
 .catch((err)=>{
           //console.log(err.message);
 })
})


router.get('/:id', async (req, res) => {

await Blog.findById(req.params.id)
  .then((blog)=>{
    if (blog == null)
      res.redirect('/');

     res.render('show', { blog:blog });
   }) 
   .catch((err)=>{
        //console.log(err.message);
     }); 

})


router.post('/new', async (req, res) => {
   const blog=req.body;
   
   await Blog.create(blog)
   .then((response)=>{
    res.redirect('/');
   })  
   .catch((err)={
     //console.log(err.message);
   }) 
   
  })


router.patch('/edit/:id', async (req, res) => {
  const {id} =req.params;
  const updatedBlog = req.body;
  await Blog.findByIdAndUpdate(id,updatedBlog)
  .then((response)=>{
    res.redirect('/');
  })  
   .catch((err)={
     //console.log(err.message);
   }) 
  
})


router.delete('/delete/:id', async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id)
  .then((response)=>{
    res.redirect('/');
    })  
   .catch((err)={
     //console.log(err.message);
   }) 
})


module.exports = router;