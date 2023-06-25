export interface IDevice {
    _id: string;
      name: string;
      price: string;
      details: string;
      joinedDate?: Date;
      quantity?: string;
      category?: string;
      image: string[];
      status: 'available' | 'out of order';
    }