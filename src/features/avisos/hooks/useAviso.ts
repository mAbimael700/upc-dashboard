// src/features/notices/hooks/useNotices.ts
import { useState, useEffect, useCallback } from 'react';
import noticesService from '../api/service';
import { Aviso } from '../types';

interface UseNoticesReturn {
    avisos: Aviso[];
    fixedAviso: Aviso | null;
    loading: boolean;
    error: Error | null;
    createNotice: (noticeData: Aviso) => Promise<void>;
    fetchFixedNotice: () => Promise<void>;
    fetchAllNotice: () => Promise<void>;
    setError: (error: Error | null) => void;
}

const useNotices = (): UseNoticesReturn => {
    const [avisos, setAvisos] = useState<Aviso[]>([]);
    const [fixedAviso, setFixedAviso] = useState<Aviso | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);

    const fetchFixedNotice = useCallback(async (): Promise<void> => {
        setLoading(true);
        setError(null);
        try {
            const notice = await noticesService.getFixedNotice();
            setFixedAviso(notice);
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
            const notices = await noticesService.getAll();
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
            await noticesService.createOrUpdateNotice(noticeData);
            await fetchFixedNotice(); // Refrescar después de crear
        } catch (err) {
            setError(err instanceof Error ? err : new Error('Error desconocido'));
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAllNotice()
    }, [,fetchAllNotice]);

    return {
        avisos,
        fixedAviso,
        loading,
        error,
        createNotice,
        fetchFixedNotice,
        fetchAllNotice,
        setError
    };
};

export default useNotices;