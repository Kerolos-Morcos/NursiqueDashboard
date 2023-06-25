export interface booking {
    _id: string;
    joinedDate: Date;
    from: Date;
    to: Date;
    service: string[];
    patientId: string;
    NurseId: string;
    price: number;
    status: 'pending' | 'accepted' | 'rejected';
  }