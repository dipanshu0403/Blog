const Comment = require("../models/Comment");
const Post = require("../models/Post");

exports.addComment = async (req, res) => {
  const post = await Post.findById(req.params.postId);

  if (!post || post.status !== "published")
    return res.status(400).json({ message: "Invalid Post" });

  const comment = await Comment.create({
    content: req.body.content,
    user: req.user._id,
    post: req.params.postId,
  });

  res.json(comment);
};

exports.deleteComment = async (req, res) => {
  const comment = await Comment.findById(req.params.id);

  if (
    comment.user.toString() !== req.user._id.toString() &&
    req.user.role !== "admin"
  ) {
    return res.status(403).json({ message: "Not allowed" });
  }

  await comment.deleteOne();
  res.json({ message: "Comment deleted" });
};