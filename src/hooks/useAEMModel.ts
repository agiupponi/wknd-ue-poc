import { useState, useEffect, useCallback } from 'react';
import { fetchModel } from '../utils/fetchData';

export function useAEMModel(path: string) {
    const [model, setModel] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<any>(null);

    const loadModel = useCallback(async () => {
        if (!path) return;
        try {
            const data = await fetchModel(path);
            setModel(data);
            setError(null);
        } catch (err) {
            console.error("useAEMModel: Error fetching model:", err);
            setError(err);
        } finally {
            setLoading(false);
        }
    }, [path]);

    useEffect(() => {
        setLoading(true);
        loadModel();

        const handleAueEvent = (e: any) => {
            if (e.type === 'aue:content-remove') return;

            e.preventDefault();
            setTimeout(() => {
                loadModel();
            }, 500);
        };

        document.addEventListener('aue:content-add', handleAueEvent);
        document.addEventListener('aue:content-update', handleAueEvent);
        document.addEventListener('aue:content-remove', handleAueEvent);
        document.addEventListener('aue:content-move', handleAueEvent);

        return () => {
            document.removeEventListener('aue:content-add', handleAueEvent);
            document.removeEventListener('aue:content-update', handleAueEvent);
            document.removeEventListener('aue:content-remove', handleAueEvent);
            document.removeEventListener('aue:content-move', handleAueEvent);
        };
    }, [path, loadModel]);

    return { model, loading, error, refetch: loadModel };
}
