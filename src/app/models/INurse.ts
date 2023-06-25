export interface INurse{
    _id: string;
    name: string;
    email: string;
    password?: string;
    phone: string;
    joinedDate?: Date;
    booking?: any[];
    proposals?: any[];
    nationalId?: string;
    age?: number;
    gender?: 'male' | 'female';
    region?: string;
    address?: string;
    gradeCert?: string;
    profile?: string; //Picture
    license?: string; //مزاولة المهنة
    isBlocked?: boolean;
    shiftPrice?: number;
}