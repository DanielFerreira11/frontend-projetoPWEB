import React, { useEffect, useState } from "react";
import SidebarLayout from "../components/SideBarLayout";
import {
  Student,
  getStudents,
  createStudent,
  updateStudent,
  deleteStudent,
} from "../services/studentService";
import { FiCheck, FiX, FiEdit, FiTrash2 } from "react-icons/fi";

const FiCheckIcon = FiCheck as unknown as React.FC<{ color?: string }>;
const FiXIcon = FiX as unknown as React.FC<{ color?: string }>;
const FiEditIcon = FiEdit as unknown as React.FC<{ color?: string }>;
const FiTrash2Icon = FiTrash2 as unknown as React.FC<{ color?: string }>;

interface StudentFormData {
  name: string;
  email: string;
  password: string;
  phone: string;
  status: "Active" | "Inactive";
  classId?: string;
}

const StudentPage: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState<StudentFormData>({
    name: "",
    email: "",
    password: "",
    phone: "",
    status: "Active",
    classId: "",
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editFormData, setEditFormData] = useState<StudentFormData>({
    name: "",
    email: "",
    password: "",
    phone: "",
    status: "Active",
    classId: "",
  });

  const fetchStudents = async () => {
    try {
      const data = await getStudents();
      setStudents(data);
    } catch (error) {
      console.error("Erro ao buscar alunos:", error);
    }
  };

  useEffect(() => {
    fetchStudents();
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
      const newStudent = await createStudent(formData);
      setStudents((prev) => [...prev, newStudent]);
      setFormData({ name: "", email: "", password: "", phone: "", status: "Active", classId: "" });
      setModalOpen(false);
    } catch (error) {
      console.error("Erro ao criar aluno:", error);
    }
  };

  const handleEditClick = (student: Student) => {
    setEditingId(student.id);
    setEditFormData({
      name: student.name,
      email: student.email,
      password: "", 
      phone: student.phone || "",
      status: student.status as "Active" | "Inactive",
      classId: student.classId || "",
    });
  };

  const handleEditSubmit = async (id: string) => {
    try {
      const updated = await updateStudent(id, editFormData);
      setStudents((prev) => prev.map((stu) => (stu.id === id ? updated : stu)));
      setEditingId(null);
    } catch (error) {
      console.error("Erro ao atualizar aluno:", error);
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteStudent(id);
      setStudents((prev) => prev.filter((stu) => stu.id !== id));
    } catch (error) {
      console.error("Erro ao deletar aluno:", error);
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

  const modalSelectStyle: React.CSSProperties = { ...modalInputStyle };

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
        <h1>Gestão de Alunos</h1>
        <button style={addButtonStyle} onClick={() => setModalOpen(true)}>
          Criar Aluno
        </button>

        {modalOpen && (
          <div style={modalOverlayStyle}>
            <div style={modalContentStyle}>
              <h2>Criar Aluno</h2>
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
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) => handleInputChange(e, false)}
                  style={modalInputStyle}
                  required
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Senha"
                  value={formData.password}
                  onChange={(e) => handleInputChange(e, false)}
                  style={modalInputStyle}
                  required
                />
                <input
                  type="text"
                  name="phone"
                  placeholder="Telefone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange(e, false)}
                  style={modalInputStyle}
                />
                <select
                  name="status"
                  value={formData.status}
                  onChange={(e) => handleInputChange(e, false)}
                  style={modalSelectStyle}
                  required
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
                <input
                  type="text"
                  name="classId"
                  placeholder="ID da Turma (opcional)"
                  value={formData.classId}
                  onChange={(e) => handleInputChange(e, false)}
                  style={modalInputStyle}
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
              <th style={thStyle}>Email</th>
              <th style={thStyle}>Telefone</th>
              <th style={thStyle}>Status</th>
              <th style={thStyle}>Turma</th>
              <th style={thStyle}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td style={tdStyle}>
                  {editingId === student.id ? (
                    <input
                      type="text"
                      name="name"
                      value={editFormData.name}
                      onChange={(e) => handleInputChange(e, true)}
                      style={{ ...modalInputStyle, marginBottom: 0 }}
                    />
                  ) : (
                    student.name
                  )}
                </td>
                <td style={tdStyle}>
                  {editingId === student.id ? (
                    <input
                      type="email"
                      name="email"
                      value={editFormData.email}
                      onChange={(e) => handleInputChange(e, true)}
                      style={{ ...modalInputStyle, marginBottom: 0 }}
                    />
                  ) : (
                    student.email
                  )}
                </td>
                <td style={tdStyle}>
                  {editingId === student.id ? (
                    <input
                      type="text"
                      name="phone"
                      value={editFormData.phone}
                      onChange={(e) => handleInputChange(e, true)}
                      style={{ ...modalInputStyle, marginBottom: 0 }}
                    />
                  ) : (
                    student.phone
                  )}
                </td>
                <td style={tdStyle}>
                  {editingId === student.id ? (
                    <select
                      name="status"
                      value={editFormData.status}
                      onChange={(e) => handleInputChange(e, true)}
                      style={{ ...modalSelectStyle, marginBottom: 0 }}
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  ) : (
                    student.status
                  )}
                </td>
                <td style={tdStyle}>
                  {editingId === student.id ? (
                    <input
                      type="text"
                      name="classId"
                      placeholder="ID da Turma"
                      value={editFormData.classId}
                      onChange={(e) => handleInputChange(e, true)}
                      style={{ ...modalInputStyle, marginBottom: 0 }}
                    />
                  ) : (
                    student.classId || ""
                  )}
                </td>
                <td style={tdStyle}>
                  {editingId === student.id ? (
                    <>
                      <button
                        type="button"
                        onClick={() => handleEditSubmit(student.id)}
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
                        onClick={() => handleEditClick(student)}
                        style={iconButtonStyle("black")}
                      >
                        <FiEditIcon color="white" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(student.id)}
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

export default StudentPage;
