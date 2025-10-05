export interface ListarProveedoresProps {
    proveedorId: number;
    razonSocial: string;
    ruc:         string;
    telefono:    string;
    direccion:   string;
    createdAt:   Date;
    isActive:    boolean;
}

export interface ProveedorRegistrarProps {
    razonSocial: string;
    ruc:         string;
    telefono:    string;
    direccion:   string;
    isActive:    boolean;
}