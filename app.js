const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const lod = require('lodash');
const { MongoClient } = require("mongodb");
const mongoose = require('mongoose');

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit t dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcuon sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculuss vitae ultricies. Adipiscing elit ut ilus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";

const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum  sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem frinemper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";

const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere loipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();
let port = 3000;
let posts = [];
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

// Database>>>>>>>>>>>>>>>>>

    // Connecting to database>>>>>

    mongoose.connect("mongodb+srv://panditmukki5:50abc%40MP@cluster0.qbfgn8a.mongodb.net/blogDB?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log(`CONNECTED TO MONGO!`);
    })
    .catch((err) => {
        console.log(`OH NO! MONGO CONNECTION ERROR!`);
        console.log(err);
    })

const postsSchema = new mongoose.Schema({
    title: String,
    content: String
});

const Post = mongoose.model("Post", postsSchema);



//  **************************************************


app.get("/", function(req, res) {   
    Post.find({})
        .then(function(posts){
            res.render("home", {homeContent: homeStartingContent, posts: posts});
        });
});

app.get("/about", function(req, res) {
    res.render("about",{aboutContent: aboutContent});
});

app.get("/contact", function(req, res) {
    res.render("contact",{contactContent: contactContent});
});

app.get("/compose", function(req, res) {
    res.render("compose");
});

app.post("/compose", function(req, res) {
    const post = new Post({
        title: req.body.postTitle,
        content: req.body.postBody
    });
    post.save();
    res.redirect("/")
})

app.get("/posts/:postId", function(req, res){
    const requestedPostId = req.params.postId;
    Post.findOne({_id: requestedPostId})
        .then(function(post){
            res.render("post", {post: post.title, postContent: post.content})
        });

});

app.listen(process.env.PORT || 3000, function () {
    console.log("Server is running on Port 3000");
});
