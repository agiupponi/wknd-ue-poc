import React from 'react';
import { mapJsonRichText } from '../../../../utils/renderRichText';
import { CFComponentProps } from '../../../../types/aem';
import './Generic.scss';

const Generic: React.FC<CFComponentProps> = ({ elements }) => {
  return (
    <>
      {Object.keys(elements).map(key => {
        const element = elements[key];
        if (!element || typeof element !== 'object') return null;

        const aueType = (element.html || element.json) ? "richtext" : "text";
        const dynamicProps = { "data-aue-prop": key, "data-aue-type": aueType };

        if (element.html) {
          return <div key={key} {...dynamicProps} dangerouslySetInnerHTML={{ __html: element.html }} />;
        } else if (element.json) {
          return <div key={key} {...dynamicProps}>{mapJsonRichText(element.json)}</div>;
        } else if (element.value) {
          return <div key={key} {...dynamicProps} className={`cf-element cf-${key}`}>{element.value}</div>;
        }
        return null;
      })}
    </>
  );
};

export default Generic;
