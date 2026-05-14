"use client";
import React, { useEffect, useState } from 'react';
import { fetchModel } from '../utils/fetchData';
import Container from './base/Container';
import Loading from './base/Loading';

const AEMPage = ({ path, children }) => {
    const [model, setModel] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadModel = () => {
            console.log("AEMPage: fetching model for path:", path);
            if (!path) return;
            
            fetchModel(path).then((data) => {
                console.log("AEMPage: fetched model:", data);
                setModel(data);
                setLoading(false);
            }).catch((err) => {
                console.error("AEMPage: Error fetching model:", err);
                setLoading(false);
            });
        };

        // Initial load
        setLoading(true);
        loadModel();

        // Listen for AEM Universal Editor events to update the UI without full page refresh
        const handleAueEvent = (e) => {
            // Let UE handle removals natively. This avoids race conditions and React reconciliation crashes
            // because UE removes the exact node instantly.
            if (e.type === 'aue:content-remove') {
                return;
            }

            e.preventDefault(); // Stop UE from attempting fallback DOM patching for add/update
            console.log("AEMPage: AUE event detected, refetching model in 500ms...", e.type);
            
            // Increased delay to 500ms to ensure AEM backend has finished committing 
            // and to avoid duplication issues during component moves
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
    }, [path]);

    if (loading) return <Loading />;
    if (!model) {
        console.log("AEMPage: No model found for path", path);
        return children || null;
    }

    const rootData = model[":items"]?.root || model;
    if (rootData === model && !model[":items"]) {
        console.warn("AEMPage: Model has no items, might be an empty page or wrong path.");
    }

    // The root of a page model is usually a container or has :items
    return (
        <div className="aem-page">
            <Container 
                resource={`urn:aemconnection:${path}/jcr:content/root`} 
                data={model[":items"]?.root || model} 
                type="container" 
                label="Page Root"
            />
        </div>
    );
};

export default AEMPage;
