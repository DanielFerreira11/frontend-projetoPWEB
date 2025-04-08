import api from "./api";

export interface Instructor {
  id: string;
  name: string;
  email: string;
  phone?: string;
}

const API_URL = "http://localhost:8008";

export const getInstructors = async (): Promise<Instructor[]> => {
  const response = await api.get(`${API_URL}/instructor`);
  return response.data;
};

export const createInstructor = async (
  instructor: Omit<Instructor, "id">
  & { password: string } 
): Promise<Instructor> => {
  const response = await api.post(`${API_URL}/instructor`, instructor);
  return response.data;
};

export const updateInstructor = async (
  id: string,
  instructor: Partial<Omit<Instructor, "id">> & { password?: string }
): Promise<Instructor> => {
  const response = await api.put(`${API_URL}/instructor/${id}`, instructor);
  return response.data;
};

export const deleteInstructor = async (id: string): Promise<void> => {
  await api.delete(`${API_URL}/instructor/${id}`);
};
