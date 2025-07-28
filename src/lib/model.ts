export interface BaseUUID {
  id: string;
  createad_at: string;
  updated_at: string;
}

export interface Meta {
  total: number;
  perPage: number;
  currentPage: number;
  lastPage: number;
  firstPage: number;
  firstPageUrl: string;
  lastPageUrl: string;
  nextPageUrl: string;
  previousPageUrl: null;
}

export interface Paginated<Entity> {
  meta: Meta;
  data: Entity[];
}

export interface QuerySearch {
  search?: string;
  perPage: number;
  page: number;
}

export interface User extends BaseUUID {
  name: string;
  email: string | null;
  password: string | null;
  certificates: Certificate[];
}

export type CertificateStatusDelivery = "DELIVERED" | "AVAILABLE";

export type CertificateStatusCorrection =
  | "NEEDS_CORRECTION"
  | "IN_CORRECTION"
  | "DOES_NOT_NEED_CORRECTION";

export interface Certificate extends BaseUUID {
  course: string;
  year: number;
  statusDelivery: CertificateStatusDelivery;
  statusCorrection: CertificateStatusCorrection;
  studentId: string;
  student: User;
}

export interface DashboardEstatisticas {
  students: number;
  certificates: {
    total: number;
    available: number;
    delivered: number;
    needsCorrection: number;
  };
}
