import { useState, useEffect } from 'react';
import { fetchData } from '../utils/fetchData';

export function useAEMData(resource: string, initialData?: any) {
    const [data, setData] = useState<any>(initialData);
    const [loading, setLoading] = useState<boolean>(!initialData && !!resource);

    useEffect(() => {
        if (!resource || initialData) return;
        
        setLoading(true);
        fetchData(resource).then((fetchedData) => {
            setData(fetchedData);
            setLoading(false);
        }).catch(() => {
            setLoading(false);
        });
    }, [resource, initialData]);

    // UE update event listener
    useEffect(() => {
        if (!resource) return;

        const handleUpdate = (e: any) => {
            const { itemids = [] } = e.detail || {};
            if(itemids.indexOf(resource) >= 0) {
                // For component data, we might want to re-fetch if not provided in detail
                fetchData(resource).then(setData);
            }
        };
        document.addEventListener("editor-update", handleUpdate);
        return () => {
            document.removeEventListener("editor-update", handleUpdate);
        }
    }, [resource]);

    return { data, loading };
}
