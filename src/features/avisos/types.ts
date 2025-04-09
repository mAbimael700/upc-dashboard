export interface Aviso {
    id?: number
    name: string
    description: string
    creationDate: string
    startDate: string
    endDate: string
    status: boolean
    fijado: boolean
}


export type ApiError = {
    message: string;
    code?: number;
    details?: any;
  };