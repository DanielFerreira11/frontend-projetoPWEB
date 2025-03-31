import React, { useEffect, useState } from "react";
import mockData from "../data/mockData.json";
import SidebarLayout from "../components/SideBarLayout";

interface Class {
  id: string;
  name: string;
  horario: string;
  instrutor: string;
}

const ClassPage: React.FC = () => {
  const [classes, setClasses] = useState<Class[]>([]);

  useEffect(() => {
    setTimeout(() => {
      setClasses(mockData.classes);
    }, 500);
  }, []);

  const containerStyle: React.CSSProperties = { padding: "20px" };
  const buttonStyle: React.CSSProperties = {
    padding: "10px 20px",
    backgroundColor: "#C00000",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    marginBottom: "20px"
  };
  const cardStyle: React.CSSProperties = {
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    marginBottom: "10px"
  };

  return (
    <SidebarLayout>
    <div style={containerStyle}>
      <h1>Gestão de Turmas</h1>
      <button style={buttonStyle}>Criar Turma</button>
      {classes.map((classe) => (
        <div key={classe.id} style={cardStyle}>
          <h2>{classe.name}</h2>
          <p>Horário: {classe.horario}</p>
          <p>Instrutor: {classe.instrutor}</p>
        </div>
      ))}
    </div>
      </SidebarLayout>
  );
};

export default ClassPage;