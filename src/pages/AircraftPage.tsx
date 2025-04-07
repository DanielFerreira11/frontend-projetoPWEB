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
import { FiCheck, FiX, FiEdit, FiTrash2 } from "react-icons/fi";

const FiCheckIcon = FiCheck as unknown as React.FC<{ color?: string }>;
const FiXIcon = FiX as unknown as React.FC<{ color?: string }>;
const FiEditIcon = FiEdit as unknown as React.FC<{ color?: string }>;
const FiTrash2Icon = FiTrash2 as unknown as React.FC<{ color?: string }>;

const AircraftPage: React.FC = () => {
  const [aircrafts, setAircrafts] = useState<Aircraft[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState<Omit<Aircraft, "id">>({
    model: "",
    register: "",
    status: "Available",
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editFormData, setEditFormData] = useState<Omit<Aircraft, "id">>({
    model: "",
    register: "",
    status: "Available",
  });

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
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    isEdit: boolean = false
  ) => {
    const { name, value } = e.target;
    if (isEdit) {
      setEditFormData((prev) => ({ ...prev, [name]: value }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newAircraft = await createAircraft(formData);
      setAircrafts((prev) => [...prev, newAircraft]);
      setFormData({ model: "", register: "", status: "Available" });
      setModalOpen(false);
    } catch (error) {
      console.error("Erro ao criar aeronave:", error);
    }
  };

  const handleEditClick = (aircraft: Aircraft) => {
    setEditingId(aircraft.id);
    setEditFormData({
      model: aircraft.model,
      register: aircraft.register,
      status: aircraft.status,
    });
  };

  const handleEditSubmit = async (id: string) => {
    try {
      const updated = await updateAircraft(id, editFormData);
      setAircrafts((prev) => prev.map((a) => (a.id === id ? updated : a)));
      setEditingId(null);
    } catch (error) {
      console.error("Erro ao atualizar aeronave:", error);
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteAircraft(id);
      setAircrafts((prev) => prev.filter((a) => a.id !== id));
    } catch (error) {
      console.error("Erro ao deletar aeronave:", error);
    }
  };

  const containerStyle: React.CSSProperties = { marginLeft: "2em" };
  const imageContainerStyle: React.CSSProperties = {
    textAlign: "center",
    marginTop: "5em",
  };
  const addButtonStyle: React.CSSProperties = {
    padding: "10px 20px",
    backgroundColor: "#C00000",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    marginBottom: "20px",
    alignItems: "center",
  };
  const tableStyle: React.CSSProperties = { width: "100%", borderCollapse: "collapse" };
  const thStyle: React.CSSProperties = {
    border: "1px solid #ddd",
    padding: "8px",
    textAlign: "center",
    backgroundColor: "#f2f2f2",
  };
  const tdStyle: React.CSSProperties = {
    border: "1px solid #ddd",
    padding: "8px",
    textAlign: "center",
  };

  const modalOverlayStyle: React.CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const modalContentStyle: React.CSSProperties = {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    width: "90%",
    maxWidth: "400px",
    textAlign: "center",
    margin: "0 auto",
  };

  const modalInputStyle: React.CSSProperties = {
    width: "80%",
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    fontSize: "16px",
    textAlign: "left",
    marginLeft: "auto",
    marginRight: "auto",
    boxSizing: "border-box",
  };

  const modalSelectStyle: React.CSSProperties = {
    ...modalInputStyle,
    width: "80%",
    boxSizing: "border-box",
  };

  const modalButtonStyle: React.CSSProperties = {
    padding: "10px 20px",
    backgroundColor: "#C00000",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    marginRight: "10px",
  };

  const modalCancelButtonStyle: React.CSSProperties = {
    ...modalButtonStyle,
    backgroundColor: "#555",
    marginRight: 0,
  };

  const iconButtonStyle = (bgColor: string): React.CSSProperties => ({
    backgroundColor: bgColor,
    border: "none",
    borderRadius: "4px",
    padding: "6px",
    cursor: "pointer",
    marginRight: "6px",
  });

  return (
    <SidebarLayout>
      <div style={containerStyle}>
        <h1>Gestão de Aeronaves</h1>
        {modalOpen && (
          <div style={modalOverlayStyle}>
            <div style={modalContentStyle}>
              <h2>Adicionar Aeronave</h2>
              <form onSubmit={handleAddSubmit} style={{ width: "100%" }}>
                <input
                  type="text"
                  name="model"
                  placeholder="Modelo"
                  value={formData.model}
                  onChange={(e) => handleInputChange(e, false)}
                  style={modalInputStyle}
                  required
                />
                <input
                  type="text"
                  name="register"
                  placeholder="Registro"
                  value={formData.register}
                  onChange={(e) => handleInputChange(e, false)}
                  style={modalInputStyle}
                  required
                />
                <select
                  name="status"
                  value={formData.status}
                  onChange={(e) => handleInputChange(e, false)}
                  style={modalSelectStyle}
                  required
                >
                  <option value="Available">Available</option>
                  <option value="Under maintenance">Under maintenance</option>
                </select>
                <div style={{ marginTop: "10px" }}>
                  <button type="submit" style={modalButtonStyle}>
                    Salvar
                  </button>
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    style={modalCancelButtonStyle}
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <button style={addButtonStyle} onClick={() => setModalOpen(true)}>
          ADICIONAR AERONAVES
        </button>

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
                <td style={tdStyle}>
                  {editingId === aircraft.id ? (
                    <input
                      type="text"
                      name="model"
                      value={editFormData.model}
                      onChange={(e) => handleInputChange(e, true)}
                      style={{ ...modalInputStyle, marginBottom: 0 }}
                    />
                  ) : (
                    aircraft.model
                  )}
                </td>
                <td style={tdStyle}>
                  {editingId === aircraft.id ? (
                    <input
                      type="text"
                      name="register"
                      value={editFormData.register}
                      onChange={(e) => handleInputChange(e, true)}
                      style={{ ...modalInputStyle, marginBottom: 0 }}
                    />
                  ) : (
                    aircraft.register
                  )}
                </td>
                <td style={tdStyle}>
                  {editingId === aircraft.id ? (
                    <select
                      name="status"
                      value={editFormData.status}
                      onChange={(e) => handleInputChange(e, true)}
                      style={{ ...modalSelectStyle, marginBottom: 0 }}
                    >
                      <option value="Available">Available</option>
                      <option value="Under maintenance">Under maintenance</option>
                    </select>
                  ) : (
                    aircraft.status
                  )}
                </td>
                <td style={tdStyle}>
                  {editingId === aircraft.id ? (
                    <>
                      <button
                        type="button"
                        onClick={() => handleEditSubmit(aircraft.id)}
                        style={iconButtonStyle("black")}
                      >
                        <FiCheckIcon color="white" />
                      </button>
                      <button
                        type="button"
                        onClick={handleCancelEdit}
                        style={iconButtonStyle("gray")}
                      >
                        <FiXIcon color="white" />
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        type="button"
                        onClick={() => handleEditClick(aircraft)}
                        style={iconButtonStyle("black")}
                      >
                        <FiEditIcon color="white" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(aircraft.id)}
                        style={iconButtonStyle("#C00000")}
                      >
                        <FiTrash2Icon color="white" />
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div style={imageContainerStyle}>
          <img
            src={planeImage}
            alt="Aeronave AB115"
            style={{ maxWidth: "3000px", height: "auto" }}
          />
        </div>
      </div>
    </SidebarLayout>
  );
};

export default AircraftPage;
