import { Berber } from "../berber";

export interface ReservationViewModel {
    id?: number;
    date: Date;
    clientName: string;
    clientSurname: string;
    berber: Berber;
}