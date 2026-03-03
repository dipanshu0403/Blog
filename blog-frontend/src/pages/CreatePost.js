import { useState } from "react";
import API from "../api";

export default function CreatePost() {
  const [form, setForm] = useState({
    title: "",
    content: "",
    tags: "",
    status: "draft",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.post("/posts", {
      ...form,
      tags: form.tags.split(","),
    });
    alert("Post Created");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Post</h2>
      <input placeholder="Title" onChange={e => setForm({...form,title:e.target.value})}/>
      <textarea placeholder="Content" onChange={e => setForm({...form,content:e.target.value})}/>
      <input placeholder="Tags (comma separated)" onChange={e => setForm({...form,tags:e.target.value})}/>
      <select onChange={e => setForm({...form,status:e.target.value})}>
        <option value="draft">Draft</option>
        <option value="published">Published</option>
      </select>
      <button>Create</button>
    </form>
  );
}