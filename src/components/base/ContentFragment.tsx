import React from 'react';
import { AEMComponentProps } from '../../types/aem';
import { getEditorProps, getCFProps } from '../../utils/instrumentation';
import Generic from './content-fragment/generic/Generic';
import Article from './content-fragment/article/Article';
import Adventure from './content-fragment/adventure/Adventure';

const componentMap: Record<string, React.FC<any>> = {
  'wknd-shared/models/article': Article,
  'wknd-shared/models/adventure': Adventure,
};

const ContentFragment: React.FC<AEMComponentProps> = ({ resource, type, data }) => {
  const elements = data?.elements || data;

  if (!elements) {
    return <div className="content-fragment empty">Empty Content Fragment</div>;
  }

  const model = data?.model;
  const isArticle = model === 'wknd-shared/models/article';
  const isAdventure = model === 'wknd-shared/models/adventure';
  const label = isArticle ? "Article" : isAdventure ? "Adventure" : "Content Fragment";

  const editorProps = getEditorProps(resource, type, { model: "contentfragment", label: "Content Fragment" });
  const elementsProps = getCFProps(data?.fragmentPath, label);

  const CFComponent = componentMap[model] || Generic;

  return (
    <div 
      className="content-fragment" 
      {...editorProps}
      style={{ padding: '15px', border: '1px solid #eee', marginBottom: '15px' }}
    >
      <div 
        className={`content-fragment-elements ${isArticle || isAdventure ? 'adventure-detail' : ''}`}
        {...elementsProps}
      >
        <CFComponent elements={elements} resource={elementsProps["data-aue-resource"]} />
      </div>
    </div>
  );
};

export default ContentFragment;
