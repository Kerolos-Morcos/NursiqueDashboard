 
 export interface IPatient {
    name: string;
   email: string;
   password?: string;
   phoneNumber: string;
   joinedDate:string;
   cart: any[];
   order: any[];
   nationalId: string;
   age: number;
   gender: 'male' | 'female';
   profile: string;
   region: string;
   address: string;
   isBlocked: 'pending' | 'done'| 'cancelled';
 }