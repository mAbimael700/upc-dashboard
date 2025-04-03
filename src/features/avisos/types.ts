export interface Aviso {
    id?: number
    name: string
    description: string
    creationDate: Date
    startDate: Date
    endDate: Date
    status: boolean
    fijado: boolean
}


export type ApiError = {
    message: string;
    code?: number;
    details?: any;
  };