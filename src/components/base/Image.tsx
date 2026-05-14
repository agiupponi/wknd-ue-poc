"use client";
import React, {useEffect, useMemo} from 'react';
import {fetchData, getImageURL} from '../../utils/fetchData';
import { AEMComponentProps } from '../../types/aem';

interface ImageProps extends AEMComponentProps {
  prop?: string;
  className?: string;
}

const Image: React.FC<ImageProps> = (props) => {
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
    fetchData(resource).then((fetchedData) => setData(fetchedData));
  }, [resource, prop, initialData]);
  
  const path = data[prop] || data["fileReference"] || data["src"];

  if (!path && !initialData) return null;

  return (
    <img {...editorProps} src={path ? `${getImageURL(path)}` : undefined} className={className} alt={data.alt || ""} />
  );
};

export default Image;
