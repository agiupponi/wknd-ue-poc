"use client";
import React from 'react';
import { useAEMData } from '../../hooks/useAEMData';
import { getEditorProps } from '../../utils/instrumentation';
import { AEMComponentProps, EditorProps } from '../../types/aem';

interface TextProps extends AEMComponentProps {
  prop?: string;
  className?: string;
}

interface InternalProps {
  editorProps: EditorProps;
  className?: string;
  content: string;
}

const PlainText: React.FC<InternalProps> = ({ editorProps, className = "", content }) => (
  <div 
    {...editorProps} 
    data-aue-component="text" 
    className={`${className} cmp-text`.trim()} 
    data-aue-label="Text"
  >
    {content}
  </div>
);

const RichText: React.FC<InternalProps> = ({ editorProps, className = "", content }) => (
  <div 
    {...editorProps} 
    data-aue-component="richtext" 
    className={`${className} cmp-text`.trim()}  
    data-aue-label="Rich Text" 
    dangerouslySetInnerHTML={{ __html: content }} 
  />
);

const Text: React.FC<TextProps> = (props) => {
  const { resource, prop = "text", type, className, data: initialData } = props;
  const { data } = useAEMData(resource, initialData);

  const editorProps = getEditorProps(resource, type, { prop });

  if (!data || !data[prop]) return null;

  const content = data[prop];

  return type === "richtext" ? (
    <RichText editorProps={editorProps} className={className} content={content} />
  ) : (
    <PlainText editorProps={editorProps} className={className} content={content} />
  );
};

export default Text;
