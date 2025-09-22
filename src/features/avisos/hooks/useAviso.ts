// src/features/notices/hooks/useNotices.ts
import { useState, useEffect, useCallback } from 'react';
import AvisosService from '@/features/avisos/services/AvisosService.ts';
import { Aviso } from '../types';

interface UseNoticesReturn {
    avisos: Aviso[];
    fixedAviso: Aviso | null;
    selectedAviso: Aviso | null;
    loading: boolean;
    error: Error | null;
    createNotice: (noticeData: Aviso) => Promise<void>;
    deleteNotice: (id: number) => Promise<void>;
    fixNotice: (aviso: Aviso) => Promise<void>;
    fetchFixedNotice: () => Promise<void>;
    fetchAllNotice: () => Promise<void>;
    fetchById: (id: number) => Promise<void>;
    setError: (error: Error | null) => void;
}

const useNotices = (): UseNoticesReturn => {
    const [avisos, setAvisos] = useState<Aviso[]>([]);
    const [fixedAviso, setFixedAviso] = useState<Aviso | null>(null);
    const [selectedAviso, setSelectedAviso] = useState<Aviso | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);

    const fetchFixedNotice = useCallback(async (): Promise<void> => {
        setLoading(true);
        setError(null);
        try {
            const notice = await AvisosService.getFixedNotice();
            setFixedAviso(notice);
        } catch (err) {
            setError(err instanceof Error ? err : new Error('Error desconocido'));
        } finally {
            setLoading(false);
        }
    }, []);

    const fetchById = useCallback(async (id: number): Promise<void> => {
        setLoading(true);
        setError(null);
        try {
            const aviso = await AvisosService.getById(id);
            aviso.creationDate = new Date(aviso.creationDate).toISOString()
            aviso.startDate = new Date(aviso.startDate).toISOString()
            aviso.endDate = new Date(aviso.endDate).toISOString()
            setSelectedAviso(aviso);
        } catch (err) {
            setError(err instanceof Error ? err : new Error('Error desconocido'));
        } finally {
            setLoading(false);
        }
    }, []);


    const fetchAllNotice = useCallback(async (): Promise<void> => {
        setLoading(true);
        setError(null);
        try {
            const notices = await AvisosService.getAll();
            setAvisos(notices);
        } catch (err) {
            setError(err instanceof Error ? err : new Error('Error desconocido'));
        } finally {
            setLoading(false);
        }
    }, []);



    const createNotice = async (noticeData: Aviso): Promise<void> => {
        setLoading(true);
        try {
            await AvisosService.createOrUpdateNotice(noticeData);
        } catch (err) {
            setError(err instanceof Error ? err : new Error('Error desconocido'));
        } finally {
            setLoading(false);
        }
    };

    const fixNotice = async (aviso: Aviso): Promise<void> => {
        try {
            await AvisosService.updateNotice({ ...aviso, fijado: true });
        } catch (err) {
            setError(err instanceof Error ? err : new Error('Error desconocido'));
        }
    }

    const deleteNotice = async (id: number) => {
        try {
            await AvisosService.deleteNotice(id);
        } catch (err) {
            setError(err instanceof Error ? err : new Error('Error desconocido'));
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchAllNotice()
    }, []);

    return {
        avisos,
        fixedAviso,
        selectedAviso,
        loading,
        error,
        createNotice,
        deleteNotice,
        fixNotice,
        fetchFixedNotice,
        fetchAllNotice,
        fetchById,
        setError
    };
};

export default useNotices;