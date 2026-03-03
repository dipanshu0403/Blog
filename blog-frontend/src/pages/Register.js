import { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "reader",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.post("/auth/register", form);
    navigate("/login");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>
      <input placeholder="Name" onChange={e => setForm({...form,name:e.target.value})}/>
      <input placeholder="Email" onChange={e => setForm({...form,email:e.target.value})}/>
      <input placeholder="Password" type="password" onChange={e => setForm({...form,password:e.target.value})}/>
      <select onChange={e => setForm({...form,role:e.target.value})}>
        <option value="reader">Reader</option>
        <option value="writer">Writer</option>
        <option value="admin">Admin</option>
      </select>
      <button>Register</button>
    </form>
  );
}