const Post = require("../models/Post");

exports.createPost = async (req, res) => {
  const post = await Post.create({
    ...req.body,
    author: req.user._id,
  });
  res.json(post);
};

exports.getPosts = async (req, res) => {
  const page = +req.query.page || 1;
  const limit = +req.query.limit || 5;
  const search = req.query.search || "";

  const query = {
    status: "published",
    $or: [
      { title: { $regex: search, $options: "i" } },
      { content: { $regex: search, $options: "i" } },
      { tags: { $regex: search, $options: "i" } },
    ],
  };

  const posts = await Post.find(query)
    .skip((page - 1) * limit)
    .limit(limit)
    .populate("author", "name");

  res.json(posts);
};

exports.updatePost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ message: "Not found" });

  if (
    req.user.role === "writer" &&
    post.author.toString() !== req.user._id.toString()
  ) {
    return res.status(403).json({ message: "Not allowed" });
  }

  const updated = await Post.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.json(updated);
};

exports.deletePost = async (req, res) => {
  await Post.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};