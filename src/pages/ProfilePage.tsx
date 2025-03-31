import React from "react";
import SidebarLayout from "../components/SideBarLayout";

const ProfilePage: React.FC = () => {
  const containerStyle: React.CSSProperties = { padding: "20px" };
  const infoStyle: React.CSSProperties = { marginBottom: "20px" };
  const buttonStyle: React.CSSProperties = {
    padding: "10px 20px",
    backgroundColor: "#C00000",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer"
  };

  return (
    <SidebarLayout>
    <div style={containerStyle}>
      <h1>Perfil do Usuário</h1>
      <div style={infoStyle}>
        <p><strong>Nome:</strong> Usuário Exemplo</p>
        <p><strong>Email:</strong> usuario@exemplo.com</p>
      </div>
      <button style={buttonStyle}>Editar Perfil</button>
    </div>
      </SidebarLayout>
  );
};

export default ProfilePage;