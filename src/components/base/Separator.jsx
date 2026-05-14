"use client";
import React from 'react';

const Separator = ({ resource, type = "component", className = "", data }) => {
  
  const editorProps = {
    "data-aue-component": "separator",
    "data-aue-resource": resource,
    "data-aue-type": type,
    "data-aue-label": "Separator"
  };

  return (
    <div {...editorProps} className={`${className} cmp-separator`.trim()}>
      <hr className="cmp-separator__horizontal-rule" style={{ border: 'none', borderTop: '1px solid #ccc', margin: '20px 0' }} />
    </div>
  );
};

export default Separator;
