const express = require("express");
const {
  createPost,
  getPosts,
  updatePost,
  deletePost,
} = require("../controllers/postController");

const { protect } = require("../middleware/authMiddleware");
const { authorize } = require("../middleware/roleMiddleware");

const router = express.Router();

router.get("/", getPosts);

router.post(
  "/",
  protect,
  authorize("writer", "admin"),
  createPost
);

router.put("/:id", protect, authorize("writer", "admin"), updatePost);

router.delete("/:id", protect, authorize("admin"), deletePost);

module.exports = router;