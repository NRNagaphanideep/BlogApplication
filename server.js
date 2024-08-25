// server.js
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

let posts = []; // This would normally be your database

// Route to create a new post
app.post("/posts", (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).json({ error: "Title and content are required" });
  }
  const newPost = { id: posts.length + 1, title, content };
  posts.push(newPost);
  res.status(201).json(newPost);
});

// Route to get all posts
app.get("/posts", (req, res) => {
  res.json(posts);
});

// Route to get a post by ID
app.get("/posts/:id", (req, res) => {
  const { id } = req.params;
  const post = posts.find((p) => p.id === parseInt(id));
  if (!post) {
    return res.status(404).json({ error: "Post not found" });
  }
  res.json(post);
});

// Route to update a post by ID
app.put("/posts/:id", (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  let post = posts.find((p) => p.id === parseInt(id));
  if (!post) {
    return res.status(404).json({ error: "Post not found" });
  }
  post = { ...post, title, content };
  posts = posts.map((p) => (p.id === parseInt(id) ? post : p));
  res.json(post);
});

// Route to delete a post by ID
app.delete("/posts/:id", (req, res) => {
  const { id } = req.params;
  const postIndex = posts.findIndex((p) => p.id === parseInt(id));
  if (postIndex === -1) {
    return res.status(404).json({ error: "Post not found" });
  }
  posts.splice(postIndex, 1);
  res.status(204).end();
});

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
