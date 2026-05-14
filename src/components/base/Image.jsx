/*
Copyright 2022 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it.
*/
"use client";
import React, {useEffect, useMemo} from 'react';
import {fetchData, getImageURL} from '../../utils/fetchData';

const Image = (props) => {
  const {resource, prop = "fileReference", type, className, data: initialData} = props;

  const editorProps = useMemo(() => {
    return {
      "data-aue-component": "image",
      "data-aue-resource": resource,
      "data-aue-prop": prop,
      "data-aue-type": type,
      "data-aue-label": "Image"
    };
  }, [resource, prop, type]);

  const [data,setData] = React.useState(initialData || {});
  useEffect(() => {
    if(!resource || !prop || initialData) return;
    fetchData(resource).then((data) => setData(data));
  }, [resource, prop, initialData]);
  const path = data[prop] || data["fileReference"] || data["src"];

  if (!path && !initialData) return null;

  return (
    <img {...editorProps} src={path ? `${getImageURL(path)}` : undefined} className={className} alt={data.alt || ""} />
  );
};

export default Image;
