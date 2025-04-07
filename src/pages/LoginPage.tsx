import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import mockData from "../data/mockData.json";
import logo from "../assets/ACPB.png";
import { login } from "../services/authService";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  const handleLogin = async(e: React.FormEvent) => {
    e.preventDefault();
    try{
      const {token} = await login(email, senha);
      localStorage.setItem("token",token);
      navigate("/profile")
    } catch (error){
      alert("Email ou senha inválidos");
    }
    const admin = mockData.admin.find(
      (user) => user.email === email && user.senha === senha
    );
    if (admin) {
      navigate("/profile");
    } else {
      alert("Email ou senha inválidos");
    }
  };

  const containerStyle: React.CSSProperties = {
    display: "flex",
    minHeight: "100vh",
    backgroundColor: "#f7f7f7",
    overflow: "hidden"
  };

  const logoSectionStyle: React.CSSProperties = {
    width: "40%",
    display: "flex",
    justifyContent: "flex-end", 
    alignItems: "center",
    paddingRight: "20px" 
  };
  

  const formSectionStyle: React.CSSProperties = {
    width: "45%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "0 40px" 
  };
  

  const formStyle: React.CSSProperties = {
    width: "100%",
    maxWidth: "400px",
    padding: "20px",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)"
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "12px",
    marginBottom: "12px",
    fontSize: "16px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    boxSizing: "border-box"
  };
  

  const buttonStyle: React.CSSProperties = {
    width: "100%",
    padding: "10px",
    fontSize: "16px",
    backgroundColor: "#C00000",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    borderRadius: "4px"
  };

  return (
    <div style={containerStyle}>
      <div style={logoSectionStyle}>
        <img src={logo} alt="ACPB Logo" style={{ maxWidth: "60%", maxHeight: "80vh" }} />
      </div>
      <div style={formSectionStyle}>
        <div style={formStyle}>
          <h1>ACPB Manager - Login</h1>
          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={inputStyle}
            />
            <input
              type="password"
              placeholder="Senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              style={inputStyle}
            />
            <button type="submit" style={buttonStyle}>Entrar</button>
          </form>
          <a href="#" style={{ marginTop: "10px", color: "#C00000", textDecoration: "none" }}>
            Esqueci a senha
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
