import api from "./api";

export interface ClassModel {
  id: string;
  name: string;
  schedule: string;
  instructor?: {
    id: string;
    name: string;
  };
  instructorId: string;
}

const API_URL = "http://localhost:8008";

export const getClasses = async (): Promise<ClassModel[]> => {
  const response = await api.get(`${API_URL}/class`);
  return response.data;
};

export const createClass = async (
  classe: Omit<ClassModel, "id" | "instructor"> & { instructorId: string }
): Promise<ClassModel> => {
  const response = await api.post(`${API_URL}/class`, classe);
  return response.data;
};

export const updateClass = async (
  id: string,
  classe: Partial<Omit<ClassModel, "id" | "instructor">> & { instructorId?: string }
): Promise<ClassModel> => {
  const response = await api.put(`${API_URL}/class/${id}`, classe);
  return response.data;
};

export const deleteClass = async (id: string): Promise<void> => {
  await api.delete(`${API_URL}/class/${id}`);
};
