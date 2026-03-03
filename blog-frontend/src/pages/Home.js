import { useEffect, useState } from "react";
import API from "../api";

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    API.get("/posts")
      .then(res => setPosts(res.data));
  }, []);

  return (
    <div>
      <h2>Published Posts</h2>
      {posts.map(post => (
        <div key={post._id} style={{border:"1px solid black", margin:10, padding:10}}>
          <h3>{post.title}</h3>
          <p>{post.content}</p>
          <p><b>Author:</b> {post.author?.name}</p>
        </div>
      ))}
    </div>
  );
}