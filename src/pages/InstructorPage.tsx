import React, { useEffect, useState } from "react";
import mockData from "../data/mockData.json";
import SidebarLayout from "../components/SideBarLayout";

interface Instructor {
  id: string;
  name: string;
  email: string;
  telefone: string;
  habilitacoes: string[];
}

const InstructorPage: React.FC = () => {
  const [instructors, setInstructors] = useState<Instructor[]>([]);

  useEffect(() => {
    setTimeout(() => {
      setInstructors(mockData.instructors);
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
      <h1>Gestão de Instrutores</h1>
      <button style={buttonStyle}>Adicionar Instrutor</button>
      {instructors.map((instructor) => (
        <div key={instructor.id} style={cardStyle}>
          <h2>{instructor.name}</h2>
          <p>Email: {instructor.email}</p>
          <p>Telefone: {instructor.telefone}</p>
          <p>Habilitações: {instructor.habilitacoes.join(", ")}</p>
        </div>
      ))}
    </div>
      </SidebarLayout>
  );
};

export default InstructorPage;