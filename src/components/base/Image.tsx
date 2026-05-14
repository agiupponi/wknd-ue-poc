"use client";
import React, {useEffect, useMemo} from 'react';
import {fetchData, getImageURL} from '../../utils/fetchData';
import Image from 'next/image';
import { AEMComponentProps } from '../../types/aem';

interface ImageProps extends AEMComponentProps {
  prop?: string;
  className?: string;
}

const ImageComponent: React.FC<ImageProps> = (props) => {
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

  const imageUrl = path ? getImageURL(path) : undefined;
  if (!imageUrl) return null;

  return (
    <Image 
      {...editorProps} 
      src={imageUrl} 
      className={className} 
      alt={data.alt || ""} 
      width={data.width || 1200}
      height={data.height || 600}
      sizes="100vw"
      style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
    />
  );
};

export default ImageComponent;
