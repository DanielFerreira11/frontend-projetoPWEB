import api from "./api"
export interface Aircraft {
  id: string;
  model: string;
  register: string;
  status: string;
}

const API_URL = "http://localhost:8008";

export const getAircrafts = async (): Promise<Aircraft[]> => {
  const response = await api.get(`${API_URL}/aircraft`);
  return response.data;
};

export const createAircraft = async (aircraft: Omit<Aircraft, "id">): Promise<Aircraft> => {
  const response = await api.post(`${API_URL}/aircraft`, aircraft);
  return response.data;
};

export const updateAircraft = async (
  id: string,
  aircraft: Partial<Omit<Aircraft, "id">>
): Promise<Aircraft> => {
  const response = await api.put(`${API_URL}/aircraft/${id}`, aircraft);
  return response.data;
};

export const deleteAircraft = async (id: string): Promise<void> => {
  await api.delete(`${API_URL}/aircraft/${id}`);
};
