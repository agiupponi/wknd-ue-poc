/*
Copyright 2020 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it.
*/
"use client";
import React, { useEffect, useState } from 'react';
import { fetchData } from '../../utils/fetchData';

const PlainText = ({ editorProps, className = "", content }) => (
  <div 
    {...editorProps} 
    data-aue-component="text" 
    className={`${className} cmp-text`.trim()} 
    data-aue-label="Text"
  >
    {content}
  </div>
);

const RichText = ({ editorProps, className = "", content }) => (
  <div 
    {...editorProps} 
    data-aue-component="richtext" 
    className={`${className} cmp-text`.trim()}  
    data-aue-label="Rich Text" 
    dangerouslySetInnerHTML={{ __html: content }} 
  />
);

const Text = (props) => {
  const { resource, prop = "text", type, className, data: initialData } = props;
  const [data, setData] = useState(initialData);

  const editorProps = {
    "data-aue-resource": resource,
    "data-aue-prop": prop,
    "data-aue-type": type,
  };

  useEffect(() => {
    if (!resource || !prop) return;
    if (!data) { 
      fetchData(resource).then((fetchedData) => setData(fetchedData));
    }
  }, [resource, prop, data]);

  if (!data || !data[prop]) {
    return null;
  }

  const content = data[prop];

  return type === "richtext" ? (
    <RichText editorProps={editorProps} className={className} content={content} />
  ) : (
    <PlainText editorProps={editorProps} className={className} content={content} />
  );
};

export default Text;
