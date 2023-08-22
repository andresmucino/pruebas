export interface PackagesShipmentInterface {
  id?: number;
  guide?: string;
  externalNumber?: number;
  internalNumber?: number;
  latitude?: number;
  longitude?: number;
  municipality?: string;
  neigthboorhood?: string;
  state?: string;
  street?: string;
  zipCode?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  evidences: [
    {
      id: number;
      personReceived?: string;
      comments?: string;
      url?: string;
      createdAt?: string;
    }
  ];
  status?: string;
  statusId?: number;
  description?: string;
}
