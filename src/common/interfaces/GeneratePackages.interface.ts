export interface GeneratePackagesCSVInterface {
    guide: string;
    weigth: number;
    width: number;
    length: number;
    heigth: number;
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
      externalNumber: string;
      internalNumber: string;
      zipCode: string;
      latitude: number;
      longitude: number;
    };
  }