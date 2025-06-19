export interface ImageModel {
  id: string;
  nombre_imagen: string;
  ruta: string;
  usuario_id: string;
  fecha: Date;
  modelo_id: string;
  usuario?: UserModel;
}

export interface UserModel {
  id: string;
  nombre: string;
  telefono: string;
  email?: string;
}