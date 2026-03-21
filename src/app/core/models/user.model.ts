export interface LoginDTO {
  email: string;
  password: string;
}

export interface RegisterDTO {
  nombres: string;
  apellidos: string;
  email: string;
  telefono: string;
  password: string;
}

export interface AuthResponse {
  token: string;
}