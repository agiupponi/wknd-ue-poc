import React from 'react';
import { mapJsonRichText } from '../../../../utils/renderRichText';
import { getImageURL } from '../../../../utils/fetchData';
import { CFComponentProps } from '../../../../types/aem';
import './Article.scss';

const Article: React.FC<CFComponentProps> = ({ elements }) => {
  const articleProps = {
    title: { "data-aue-prop": "title", "data-aue-type": "text", "data-aue-label": "Title" },
    image: { "data-aue-type": "media", "data-aue-prop": elements.featuredImage ? "featuredImage" : "primaryImage" },
    main: { "data-aue-prop": "main", "data-aue-type": "richtext" }
  };

  return (
    <>
      <div className="adventure-detail-header" style={{ padding: '0 1rem' }}>
        {elements.title && (
          <h1 className="adventure-detail-title" {...articleProps.title}>
            {elements.title.value || elements.title}
          </h1>
        )}
      </div>
      <div>
        {(elements.featuredImage || elements.primaryImage) && (
          <img 
            className="adventure-detail-primaryimage" 
            {...articleProps.image}
            src={`${getImageURL((elements.featuredImage || elements.primaryImage).value || (elements.featuredImage || elements.primaryImage))}`} 
            alt={(elements.title?.value || elements.title) || 'Article Image'}
          />
        )}
        <div className="adventure-detail-content">
          {elements.main && (
            <div {...articleProps.main}>
              {elements.main.html ? (
                <div dangerouslySetInnerHTML={{ __html: elements.main.html }} />
              ) : elements.main.json ? (
                mapJsonRichText(elements.main.json)
              ) : (
                <div dangerouslySetInnerHTML={{ __html: elements.main.value || elements.main }} />
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Article;
