const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Blog = require('./model/blogModel');
const blogRouter = require('./routes/blogRouter');
const path=require("path");
const methodOverride = require('method-override');

if(process.env.NODE_ENV !== 'production')
   require('dotenv').config();

mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('DB Connected'))
    .catch((err) => console.log(err));

app.set('view engine', 'ejs');
app.set('views',path.join(__dirname,'views'));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.use(blogRouter);





app.listen(process.env.PORT || 5000,()=>{
    console.log(`server running at port 5000`);
})