import axios, { AxiosResponse } from "axios";

export interface Aircraft {
  id: string;
  model: string;
  register: string;
  status: string;
}

const API_URL = "http://localhost:8008"; // ajuste conforme a porta do back-end

export const getAircrafts = async (): Promise<Aircraft[]> => {
  const response: AxiosResponse<Aircraft[]> = await axios.get(`${API_URL}/aircraft`);
  return response.data;
};

export const createAircraft = async (aircraft: Omit<Aircraft, "id">): Promise<Aircraft> => {
  const response: AxiosResponse<Aircraft> = await axios.post(`${API_URL}/aircraft`, aircraft);
  return response.data;
};

export const updateAircraft = async (
  id: string,
  aircraft: Partial<Omit<Aircraft, "id">>
): Promise<Aircraft> => {
  const response: AxiosResponse<Aircraft> = await axios.put(`${API_URL}/aircraft/${id}`, aircraft);
  return response.data;
};

export const deleteAircraft = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/aircraft/${id}`);
};
