export interface PackagesInterface {
  id?: number;
  guide?: string;
  updatedAt?: string;
  client?: {
    id?: string;
  };
  shipment?: {
    id?: string;
  };
  status?: {
    id?: number;
    status?: string;
    description?: string;
  };
}
