import React from 'react';
import { mapJsonRichText } from '../../../../utils/renderRichText';
import { getImageURL } from '../../../../utils/fetchData';
import Image from 'next/image';
import { CFComponentProps } from '../../../../types/aem';
import './Article.scss';

const Article: React.FC<CFComponentProps> = ({ elements }) => {
  const articleProps = {
    title: { "data-aue-prop": "title", "data-aue-type": "text", "data-aue-label": "Title" },
    image: { "data-aue-type": "media", "data-aue-prop": elements.featuredImage ? "featuredImage" : "primaryImage" },
    main: { "data-aue-prop": "main", "data-aue-type": "richtext" }
  };

  const imgObj = elements.featuredImage || elements.primaryImage;
  const imgVal = imgObj?.value || imgObj;
  const imageUrl = imgVal ? getImageURL(imgVal) : undefined;

  const altText = (elements.title?.value || elements.title) || 'Article Image';

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
        {imageUrl && (
          <Image 
            className="adventure-detail-primaryimage" 
            {...articleProps.image}
            src={imageUrl} 
            alt={typeof altText === 'string' ? altText : 'Article Image'}
            width={1200}
            height={600}
            sizes="100vw"
            style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
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
