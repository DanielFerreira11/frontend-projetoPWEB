import React from "react";
import { Link } from "react-router-dom";

const Dashboard: React.FC = () => {
  const containerStyle: React.CSSProperties = { padding: "20px" };
  const headerStyle: React.CSSProperties = { marginBottom: "20px" };
  const menuStyle: React.CSSProperties = { display: "flex", gap: "15px", marginBottom: "20px" };
  const contentStyle: React.CSSProperties = { display: "flex", gap: "20px" };
  const cardStyle: React.CSSProperties = {
    flex: 1,
    backgroundColor: "#f7f7f7",
    padding: "20px",
    borderRadius: "8px",
    textAlign: "center",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"
  };

  return (
    <div style={containerStyle}>
      <header style={headerStyle}>
        <h1>Dashboard</h1>
      </header>
      <nav style={menuStyle}>
        <Link to="/aircraft">Aeronaves</Link>
        <Link to="/class">Turmas</Link>
        <Link to="/instructor">Instrutores</Link>
        <Link to="/student">Alunos</Link>
        <Link to="/profile">Perfil</Link>
      </nav>
      <div style={contentStyle}>
        <div style={cardStyle}>
          <h2>Aeronaves Disponíveis</h2>
          <p>10</p>
        </div>
        <div style={cardStyle}>
          <h2>Turmas Ativas</h2>
          <p>5</p>
        </div>
        <div style={cardStyle}>
          <h2>Instrutores</h2>
          <p>3</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
