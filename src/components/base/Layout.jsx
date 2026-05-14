"use client";
import React from 'react';
import Container from './Container';
import './Layout.scss';

const Layout = (props) => {
  const { resource, type, data } = props;
  
  const layoutStyle = data?.layoutStyle || '2col';
  const columnSizing = data?.columnSizing || '10-2';
  const thirdColumnSize = parseInt(data?.thirdColumnSize) || 1;
  
  const isThree = layoutStyle === '3col';

  let col1Size = 0, col2Size = 0, col3Size = 0;

  if (columnSizing === '2-10') {
    if (isThree) {
      col1Size = 2;
      col3Size = thirdColumnSize;
      col2Size = 10 - col3Size;
    } else {
      col1Size = 2;
      col2Size = 10;
    }
  } else { // 10-2
    if (isThree) {
      col3Size = thirdColumnSize;
      col1Size = 10 - col3Size;
      col2Size = 2;
    } else {
      col1Size = 10;
      col2Size = 2;
    }
  }

  const editorProps = {
    "data-aue-component": "layout",
    "data-aue-resource": resource,
    "data-aue-type": type,
    "data-aue-label": "Layout"
  };

  // Helper function to get the correct data for the column from the model
  const getColData = (colName) => {
    // In AEM .model.json, child items are typically under :items
    return data?.[":items"]?.[colName] || data?.[colName];
  };

  return (
    <div className={`layout aem-Grid aem-Grid--12 aem-Grid--default--12 ${layoutStyle}`.trim()} {...editorProps}>
      <div className={`layout__col aem-GridColumn aem-GridColumn--default--${col1Size}`}>
        <Container 
          resource={`${resource}/col-1`} 
          type="container" 
          data={getColData("col-1")} 
          label="Colonna 1"
        />
      </div>
      
      <div className={`layout__col aem-GridColumn aem-GridColumn--default--${col2Size}`}>
        <Container 
          resource={`${resource}/col-2`} 
          type="container" 
          data={getColData("col-2")} 
          label="Colonna 2" 
        />
      </div>

      {isThree && (
        <div className={`layout__col aem-GridColumn aem-GridColumn--default--${col3Size}`}>
          <Container 
            resource={`${resource}/col-3`} 
            type="container" 
            data={getColData("col-3")} 
            label="Colonna 3" 
          />
        </div>
      )}
    </div>
  );
};

export default Layout;