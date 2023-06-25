// export interface IOrder{
//     userName: string,
//     numOfDevice : number,
//     startDate: string,
//     endDate: string,
//     products?: [],
//     patientStatus: string,
//     totalPrice: number,
//     createdAt?: string,
//     updatedAt?: string,
// }

export interface IOrder {
    userName: string;
    email?: string;
    userAge?: number;
    userMobile?: string;
    Region?: string;
    Address?: string;
    gender?: string;
    numOfDevice: number;
    startDate: string | Date;
    endDate: string | Date;
    products?: any[];
    patientStatus: 'pending' | 'inprogress' | 'Expired' | 'reached';
    totalPrice: number;
    createdAt?: string | Date;
    updatedAt?: string | Date;
  }
  export interface IProduct {
    details: string;
    image: string[];
    joinedDate: string;
    name: string;
    price: number;
    quantity: string;
    quantitycart: number;
    rate: number;
    status: string;
    totalPrice: number;
    _id: string;
  }