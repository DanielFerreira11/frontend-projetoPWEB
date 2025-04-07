import React, { useEffect, useState } from "react";
import planeImage from "../assets/ab115.png";
import SidebarLayout from "../components/SideBarLayout";
import {
  Aircraft,
  getAircrafts,
  createAircraft,
  updateAircraft,
  deleteAircraft,
} from "../services/aircraftService";

const AircraftPage: React.FC = () => {
  const [aircrafts, setAircrafts] = useState<Aircraft[]>([]);
  const [formData, setFormData] = useState<Omit<Aircraft, "id">>({
    model: "",
    register: "",
    status: "Available",
  });
  const [editingId, setEditingId] = useState<string | null>(null);

  const fetchAircrafts = async () => {
    try {
      const data = await getAircrafts();
      setAircrafts(data);
    } catch (error) {
      console.error("Erro ao buscar aeronaves:", error);
    }
  };

  useEffect(() => {
    fetchAircrafts();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        // Atualiza aeronave
        const updated = await updateAircraft(editingId, formData);
        setAircrafts((prev) =>
          prev.map((a) => (a.id === editingId ? updated : a))
        );
        setEditingId(null);
      } else {
        // Cria nova aeronave
        const newAircraft = await createAircraft(formData);
        setAircrafts((prev) => [...prev, newAircraft]);
      }
      setFormData({ model: "", register: "", status: "Available" });
    } catch (error) {
      console.error("Erro ao salvar aeronave:", error);
    }
  };

  const handleEdit = (aircraft: Aircraft) => {
    setEditingId(aircraft.id);
    setFormData({
      model: aircraft.model,
      register: aircraft.register,
      status: aircraft.status,
    });
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteAircraft(id);
      setAircrafts((prev) => prev.filter((a) => a.id !== id));
    } catch (error) {
      console.error("Erro ao deletar aeronave:", error);
    }
  };

  const containerStyle: React.CSSProperties = { padding: "20px" };
  const imageContainerStyle: React.CSSProperties = {
    textAlign: "center",
    marginBottom: "20px",
  };
  const buttonStyle: React.CSSProperties = {
    padding: "10px 20px",
    backgroundColor: "#C00000",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    marginBottom: "20px",
  };
  const tableStyle: React.CSSProperties = { width: "100%", borderCollapse: "collapse" };
  const thStyle: React.CSSProperties = {
    border: "1px solid #ddd",
    padding: "8px",
    textAlign: "left",
    backgroundColor: "#f2f2f2",
  };
  const tdStyle: React.CSSProperties = { border: "1px solid #ddd", padding: "8px" };

  return (
    <SidebarLayout>
      <div style={containerStyle}>
        <h1>Gestão de Aeronaves</h1>
        <div style={imageContainerStyle}>
          <img
            src={planeImage}
            alt="Aeronave AB115"
            style={{ maxWidth: "200px", height: "auto" }}
          />
        </div>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Modelo:</label>
            <input
              type="text"
              name="model"
              value={formData.model}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Registro:</label>
            <input
              type="text"
              name="register"
              value={formData.register}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Status:</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              required
            >
              <option value="Available">Available</option>
              <option value="Under maintenance">Under maintenance</option>
            </select>
          </div>
          <button type="submit" style={buttonStyle}>
            {editingId ? "Atualizar Aeronave" : "Adicionar Aeronave"}
          </button>
        </form>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Modelo</th>
              <th style={thStyle}>Registro</th>
              <th style={thStyle}>Status</th>
              <th style={thStyle}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {aircrafts.map((aircraft) => (
              <tr key={aircraft.id}>
                <td style={tdStyle}>{aircraft.model}</td>
                <td style={tdStyle}>{aircraft.register}</td>
                <td style={tdStyle}>{aircraft.status}</td>
                <td style={tdStyle}>
                  <button onClick={() => handleEdit(aircraft)}>Editar</button>
                  <button onClick={() => handleDelete(aircraft.id)}>Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SidebarLayout>
  );
};

export default AircraftPage;
