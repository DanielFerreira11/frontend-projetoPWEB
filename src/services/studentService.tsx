import api from "./api";

export interface Student {
  id: string;
  name: string;
  email: string;
  phone?: string;
  status: "Active" | "Inactive";
  classId?: string;
}

const API_URL = "http://localhost:8008";

export const getStudents = async (): Promise<Student[]> => {
  const response = await api.get(`${API_URL}/student`);
  return response.data;
};

export const createStudent = async (
  student: Omit<Student, "id"> & { password: string }
): Promise<Student> => {
  const response = await api.post(`${API_URL}/student`, student);
  return response.data;
};

export const updateStudent = async (
  id: string,
  student: Partial<Omit<Student, "id">> & { password?: string }
): Promise<Student> => {
  const response = await api.put(`${API_URL}/student/${id}`, student);
  return response.data;
};

export const deleteStudent = async (id: string): Promise<void> => {
  await api.delete(`${API_URL}/student/${id}`);
};
