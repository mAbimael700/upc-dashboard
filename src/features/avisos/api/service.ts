import axios from 'axios';
import { Aviso } from '../types';

const API_DOMAIN = 'https://upc-api-1-xmr7.onrender.com';
const API_BASE_URL = `${API_DOMAIN}/upc/v1/notices`;

export const noticesService = {

    async createOrUpdateNotice(noticeData: Aviso) {
        const response = await axios.post<Aviso>(API_BASE_URL, noticeData);
        return response.data;
    },

    async getFixedNotice(): Promise<Aviso> {
        const response = await axios.get<Aviso>(API_BASE_URL);
        return response.data;
    },

    async getAll(): Promise<Aviso[]> {
        const response = await axios.get<Aviso[]>(API_BASE_URL + '/all')
        console.log(response.data);
        
        return response.data
    },


    async updateNotice(noticeData: Aviso): Promise<Aviso> {
        if (!noticeData.id) {
            throw new Error('The id must not be null');
        }
        const response = await axios.put<Aviso>(API_BASE_URL, noticeData);
        return response.data;
    },

    async deleteNotice(noticeId: number): Promise<void> {
        await axios.delete(`${API_BASE_URL}/${noticeId}`);
    }
};

export default noticesService;