import React, { useEffect, useState } from "react";
import SidebarLayout from "../components/SideBarLayout";
import {
  ClassModel,
  getClasses,
  createClass,
  updateClass,
  deleteClass,
} from "../services/classService";
import { FiCheck, FiX, FiEdit, FiTrash2 } from "react-icons/fi";

const FiCheckIcon = FiCheck as unknown as React.FC<{ color?: string }>;
const FiXIcon = FiX as unknown as React.FC<{ color?: string }>;
const FiEditIcon = FiEdit as unknown as React.FC<{ color?: string }>;
const FiTrash2Icon = FiTrash2 as unknown as React.FC<{ color?: string }>;

const ClassPage: React.FC = () => {
  const [classes, setClasses] = useState<ClassModel[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState<Omit<ClassModel, "id">>({
    name: "",
    schedule: "",
    instructor: "",
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editFormData, setEditFormData] = useState<Omit<ClassModel, "id">>({
    name: "",
    schedule: "",
    instructor: "",
  });

  const fetchClasses = async () => {
    try {
      const data = await getClasses();
      setClasses(data);
    } catch (error) {
      console.error("Erro ao buscar turmas:", error);
    }
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
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
      const newClass = await createClass(formData);
      setClasses((prev) => [...prev, newClass]);
      setFormData({ name: "", schedule: "", instructor: "" });
      setModalOpen(false);
    } catch (error) {
      console.error("Erro ao criar turma:", error);
    }
  };

  const handleEditClick = (classe: ClassModel) => {
    setEditingId(classe.id);
    setEditFormData({
      name: classe.name,
      schedule: classe.schedule,
      instructor: classe.instructor,
    });
  };

  const handleEditSubmit = async (id: string) => {
    try {
      const updated = await updateClass(id, editFormData);
      setClasses((prev) => prev.map((c) => (c.id === id ? updated : c)));
      setEditingId(null);
    } catch (error) {
      console.error("Erro ao atualizar turma:", error);
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteClass(id);
      setClasses((prev) => prev.filter((c) => c.id !== id));
    } catch (error) {
      console.error("Erro ao deletar turma:", error);
    }
  };

  const containerStyle: React.CSSProperties = { marginLeft: "2em", padding: "20px" };
  const addButtonStyle: React.CSSProperties = {
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
        <h1>Gestão de Turmas</h1>
        <button style={addButtonStyle} onClick={() => setModalOpen(true)}>
          Criar Turma
        </button>

        {modalOpen && (
          <div style={modalOverlayStyle}>
            <div style={modalContentStyle}>
              <h2>Criar Turma</h2>
              <form onSubmit={handleAddSubmit} style={{ width: "100%" }}>
                <input
                  type="text"
                  name="name"
                  placeholder="Nome"
                  value={formData.name}
                  onChange={(e) => handleInputChange(e, false)}
                  style={modalInputStyle}
                  required
                />
                <input
                  type="text"
                  name="schedule"
                  placeholder="Horário"
                  value={formData.schedule}
                  onChange={(e) => handleInputChange(e, false)}
                  style={modalInputStyle}
                  required
                />
                <input
                  type="text"
                  name="instructor"
                  placeholder="Instrutor"
                  value={formData.instructor}
                  onChange={(e) => handleInputChange(e, false)}
                  style={modalInputStyle}
                  required
                />
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

        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Nome</th>
              <th style={thStyle}>Horário</th>
              <th style={thStyle}>Instrutor</th>
              <th style={thStyle}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {classes.map((classe) => (
              <tr key={classe.id}>
                <td style={tdStyle}>
                  {editingId === classe.id ? (
                    <input
                      type="text"
                      name="name"
                      value={editFormData.name}
                      onChange={(e) => handleInputChange(e, true)}
                      style={{ ...modalInputStyle, marginBottom: 0 }}
                    />
                  ) : (
                    classe.name
                  )}
                </td>
                <td style={tdStyle}>
                  {editingId === classe.id ? (
                    <input
                      type="text"
                      name="schedule"
                      value={editFormData.schedule}
                      onChange={(e) => handleInputChange(e, true)}
                      style={{ ...modalInputStyle, marginBottom: 0 }}
                    />
                  ) : (
                    classe.schedule
                  )}
                </td>
                <td style={tdStyle}>
                  {editingId === classe.id ? (
                    <input
                      type="text"
                      name="instructor"
                      value={editFormData.instructor}
                      onChange={(e) => handleInputChange(e, true)}
                      style={{ ...modalInputStyle, marginBottom: 0 }}
                    />
                  ) : (
                    classe.instructor
                  )}
                </td>
                <td style={tdStyle}>
                  {editingId === classe.id ? (
                    <>
                      <button
                        type="button"
                        onClick={() => handleEditSubmit(classe.id)}
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
                        onClick={() => handleEditClick(classe)}
                        style={iconButtonStyle("black")}
                      >
                        <FiEditIcon color="white" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(classe.id)}
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
      </div>
    </SidebarLayout>
  );
};

export default ClassPage;
