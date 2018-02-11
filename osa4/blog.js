const mongoose = require("mongoose");

const Blog = mongoose.model("Blog", {
  title: String,
  author: String,
  url: String,
  likes: Number
});

const mongoUrl = "mongodb://localhost/bloglist";
mongoose.connect(mongoUrl);
mongoose.Promise = global.Promise;

module.exports = Blog;
