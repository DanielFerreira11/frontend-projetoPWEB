import React from "react";
import SidebarLayout from "../components/SideBarLayout";
import { FaUserCircle } from "react-icons/fa";

const FaUserCircleIcon = FaUserCircle as unknown as React.FC<{ style?: React.CSSProperties }>;

const ProfilePage: React.FC = () => {
  const containerStyle: React.CSSProperties = {
    padding: "20px",
    textAlign: "center",
  };

  const profileIconStyle: React.CSSProperties = {
    fontSize: "150px",
    color: "#ccc",
    marginBottom: "20px",
  };

  const infoStyle: React.CSSProperties = {
    marginBottom: "20px",
    fontSize: "18px",
  };

  const buttonStyle: React.CSSProperties = {
    padding: "10px 20px",
    backgroundColor: "#C00000",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  };

  const userData = localStorage.getItem("user");
  const user = userData
    ? JSON.parse(userData)
    : { name: "Admin Exemplo", email: "admin@exemplo.com" };

  return (
    <SidebarLayout>
      <div style={containerStyle}>
        <h1>Perfil do Usuário</h1>
        <FaUserCircleIcon style={profileIconStyle} />
        <div style={infoStyle}>
          <p>
            <strong>Nome:</strong> {user.name}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
        </div>
        <button style={buttonStyle}>Editar Perfil</button>
      </div>
    </SidebarLayout>
  );
};

export default ProfilePage;
