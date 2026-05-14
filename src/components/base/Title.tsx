"use client";
import React, {useEffect, useMemo} from 'react';
import {fetchData} from '../../utils/fetchData';
import { AEMComponentProps } from '../../types/aem';

interface TitleProps extends AEMComponentProps {
  prop?: string;
  className?: string;
}

const Title: React.FC<TitleProps> = (props) => {
  const {resource, prop = "jcr:title", type, className = "test", data: initialData} = props;
  const editorProps = useMemo(() => {
    return {
      "data-aue-component": "title",
      "data-aue-resource": resource,
      "data-aue-prop": prop,
      "data-aue-type": type,
      "data-aue-label": "Title"
    };
  }, [resource, prop, type]);

  const [data,setData] = React.useState(initialData);

  useEffect(() => {
    if(!resource || !prop) return;
    if (!data) { 
        fetchData(resource).then((fetchedData) => setData(fetchedData));
    };
  }, [resource, prop, data]);

  useEffect(() => {
    const handleUpdate = (e: any) => {
      const { itemids = [] } = e.detail;
      if(itemids.indexOf(resource) >= 0) {
        setData(null);
      }
      e.stopPropagation();
    };
    document.addEventListener("editor-update", handleUpdate);
    return () => {
      document.removeEventListener("editor-update", handleUpdate);
    }
  },[resource]);
  
  const TitleTag = data?.type ? (data.type as keyof JSX.IntrinsicElements) : ("h1" as keyof JSX.IntrinsicElements);
  
  return data ? (
    <TitleTag {...editorProps} className={`${className} cmp-title`.trim()}>{data[prop] ?? data["text"] ?? "Default Title"}</TitleTag>
  ):<></>;
};

export default Title;
