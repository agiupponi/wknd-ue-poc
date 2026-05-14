import React from 'react';
import "./Home.scss";

/**
 * Home component - now a placeholder for AEM-managed content
 */
const Home: React.FC = () => {
    return (
        <div className="Home">
            {/* 
              This component is rendered as a fallback in src/app/page.jsx
              when no AEM model is found. If AEM content exists, AEMPage 
              renders the content from AEM instead.
            */}
        </div>
    );
}

export default Home;
