import axios from "axios";

const API_URL = "http://localhost:8008"; 

interface LoginResponse {
  token: string;
}

export async function login(email: string, password: string): Promise<LoginResponse> {
  const response = await axios.post<LoginResponse>(`${API_URL}/auth/login`, {
    email,
    password,
  });
  return response.data;
}
