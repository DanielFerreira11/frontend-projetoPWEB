import React, { useEffect, useState } from "react";
import planeImage from "../assets/ab115.png";
import mockData from "../data/mockData.json";
import SidebarLayout from "../components/SideBarLayout";

interface Aircraft {
  id: string;
  model: string;
  register: string;
  status: string;
}

const AircraftPage: React.FC = () => {
  const [aircrafts, setAircrafts] = useState<Aircraft[]>([]);

  useEffect(() => {
    setTimeout(() => {
      setAircrafts(mockData.aircraft);
    }, 500);
  }, []);

  const containerStyle: React.CSSProperties = { padding: "20px" };
  const imageContainerStyle: React.CSSProperties = { textAlign: "center", marginBottom: "20px" };
  const buttonStyle: React.CSSProperties = {
    padding: "10px 20px",
    backgroundColor: "#C00000",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    marginBottom: "20px"
  };
  const tableStyle: React.CSSProperties = { width: "100%", borderCollapse: "collapse" };
  const thStyle: React.CSSProperties = { border: "1px solid #ddd", padding: "8px", textAlign: "left", backgroundColor: "#f2f2f2" };
  const tdStyle: React.CSSProperties = { border: "1px solid #ddd", padding: "8px" };

  return (
    <SidebarLayout>
    <div style={containerStyle}>
      <h1>Gestão de Aeronaves</h1>
      <div style={imageContainerStyle}>
        <img src={planeImage} alt="Aeronave AB115" style={{ maxWidth: "200px", height: "auto" }} />
      </div>
      <button style={buttonStyle}>Adicionar Aeronave</button>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Modelo</th>
            <th style={thStyle}>Registro</th>
            <th style={thStyle}>Status</th>
          </tr>
        </thead>
        <tbody>
          {aircrafts.map((aircraft) => (
            <tr key={aircraft.id}>
              <td style={tdStyle}>{aircraft.model}</td>
              <td style={tdStyle}>{aircraft.register}</td>
              <td style={tdStyle}>{aircraft.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
      </SidebarLayout>
  );
};

export default AircraftPage;