export interface RegisterEmployeeProps {
  nombres: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  documento: string;
  tipoDocumento: string;
  fechaNacimiento: Date;
  genero: string;
  telefono: string;
  telefonoEmergencia: string;
  correo: string;
  direccion: string;
  cargo: string;
  fechaContratacion: Date;
  tipoContrato: string;
  fotoUrl: string;// URL de la imagen en Firebase

}

export interface RegisterEmployeeErrorProps {
  nombres: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  documento: string;
  tipoDocumento: string;
  fechaNacimiento: string;
  genero: string;
  telefono: string;
  telefonoEmergencia: string;
  correo: string;
  direccion: string;
  cargo: string;
  fechaContratacion: string;
  tipoContrato: string;
  fotoUrl: string; // URL de la imagen en Firebase
}
