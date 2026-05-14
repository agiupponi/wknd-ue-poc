"use client";
import React, { ReactNode } from 'react';
import { useAEMModel } from '../hooks/useAEMModel';
import Container from './base/Container';
import Loading from './base/Loading';

interface AEMPageProps {
    path: string;
    children?: ReactNode;
}

const AEMPage: React.FC<AEMPageProps> = ({ path, children }) => {
    const { model, loading, error } = useAEMModel(path);

    if (loading) return <Loading />;
    
    if (error) {
        console.error("AEMPage: Error loading model", error);
        return <>{children}</> || null;
    }

    if (!model) {
        console.log("AEMPage: No model found for path", path);
        return <>{children}</> || null;
    }

    const rootData = model[":items"]?.root || model;
    
    return (
        <div className="aem-page">
            <Container 
                resource={`urn:aemconnection:${path}/jcr:content/root`} 
                data={rootData} 
                type="container" 
                label="Page Root"
            />
        </div>
    );
};

export default AEMPage;
