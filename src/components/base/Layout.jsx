"use client";
import React from 'react';
import Container from './Container';

const Layout = (props) => {
  const { resource, type, data } = props;
  
  const layoutStyle = data?.layoutStyle || '2col';
  const isThree = layoutStyle === '3col';

  return (
    <div 
      className={`layout ${layoutStyle}`}
      data-aue-component="layout"
      data-aue-resource={resource}
      data-aue-type={type}
      data-aue-label="Layout"
    >
      <div className="layout__col">
        <Container 
          resource={`${resource}/col-1`} 
          type="container" 
          data={data && data["col-1"]} 
          label="Colonna 1"
          behavior="component"
        />
      </div>
      
      <div className="layout__col">
        <Container 
          resource={`${resource}/col-2`} 
          type="container" 
          data={data && data["col-2"]} 
          label="Colonna 2" 
          behavior="component"
        />
      </div>

      {isThree && (
        <div className="layout__col">
          <Container 
            resource={`${resource}/col-3`} 
            type="container" 
            data={data && data["col-3"]} 
            label="Colonna 3" 
            behavior="component"
          />
        </div>
      )}
    </div>
  );
};

export default Layout;