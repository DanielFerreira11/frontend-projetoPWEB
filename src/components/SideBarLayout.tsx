import React from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/ACPB.png";

const SidebarLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();

  const sidebarStyle: React.CSSProperties = {
    width: "220px",
    backgroundColor: "#000",
    color: "#fff",
    padding: "20px",
    height: "100vh",
    position: "fixed",
    top: 0,
    left: 0,
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  };

  const logoStyle: React.CSSProperties = {
    width: "100%",
    maxWidth: "120px",
    cursor: "pointer",
    marginBottom: "30px"
  };

  const linkStyle: React.CSSProperties = {
    display: "block",
    width: "100%",
    padding: "10px 15px",
    margin: "5px 0",
    borderRadius: "6px",
    color: "#fff",
    textDecoration: "none",
    fontWeight: "bold",
    textAlign: "left",
    transition: "background 0.2s"
  };

  const activeStyle = {
    backgroundColor: "#C00000"
  };

  const hoverStyle = {
    backgroundColor: "#C00000"
  };

  const navItems = [
    { label: "Perfil", to: "/profile" },
    { label: "Aeronaves", to: "/aircraft" },
    { label: "Turmas", to: "/class" },
    { label: "Instrutores", to: "/instructor" },
    { label: "Alunos", to: "/student" }
  ];

  const contentStyle: React.CSSProperties = {
    marginLeft: "220px",
    padding: "30px"
  };

  return (
    <div>
      <aside style={sidebarStyle}>
        <Link to="/profile">
          <img src={logo} alt="Logo" style={logoStyle} />
        </Link>
        {navItems.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            style={{
              ...linkStyle,
              ...(location.pathname === item.to ? activeStyle : {})
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#C00000")}
            onMouseLeave={(e) => {
              if (location.pathname !== item.to) {
                e.currentTarget.style.backgroundColor = "transparent";
              }
            }}
          >
            {item.label}
          </Link>
        ))}
           <Link
                to="/"
                style={{
                    marginTop: "100%",
                    backgroundColor: "#C00000",
                    color: "#fff",
                    padding: "10px 15px",
                    borderRadius: "6px",
                    textDecoration: "none",
                    fontWeight: "bold",
                    width: "50%",
                    textAlign: "center",
                    transition: "background-color 0.2s"
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#900000")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#C00000")}
                >
                Sair
            </Link>
      </aside>
      <main style={contentStyle}>
        {children}
      </main>
    </div>
  );
};

export default SidebarLayout;
