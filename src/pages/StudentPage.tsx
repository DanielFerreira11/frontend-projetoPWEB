import React, { useEffect, useState } from "react";
import mockData from "../data/mockData.json";
import SidebarLayout from "../components/SideBarLayout";

interface Student {
  id: string;
  name: string;
  email: string;
  telefone: string;
  status: string;
  licencas: string[];
}

const StudentPage: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);

  useEffect(() => {
    setTimeout(() => {
      setStudents(mockData.students);
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
      <h1>Gestão de Alunos</h1>
      <button style={buttonStyle}>Adicionar Aluno</button>
      {students.map((student) => (
        <div key={student.id} style={cardStyle}>
          <h2>{student.name}</h2>
          <p>Email: {student.email}</p>
          <p>Telefone: {student.telefone}</p>
          <p>Status: {student.status}</p>
          <p>Licenças: {student.licencas.join(", ")}</p>
        </div>
      ))}
    </div>
      </SidebarLayout>
  );
};

export default StudentPage;