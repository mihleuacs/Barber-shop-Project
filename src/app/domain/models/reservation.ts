import { Berber } from "./berber";

export interface Reservation {
    id?: number;
    date: Date;
    clientName: string;
    clientSurname: string;
    berberId: number; 
}
  
