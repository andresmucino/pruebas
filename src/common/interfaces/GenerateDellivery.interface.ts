export interface GenerateDeliveryInterface {
  weigth: number;
  width: number;
  heigth: number;
  length: number;
  guide: string;
  idClient: number;
  contact: {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
  };
  direction: {
    street: string;
    neigthboorhood: string;
    municipality: string;
    state: string;
    zipCode: string;
    externalNumber: string;
    internalNumber: string;
    latitude: number;
    longitude: number;
  };
}
