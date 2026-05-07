import React from 'react';
import { mapJsonRichText } from '../../utils/renderRichText';
import { getImageURL } from '../../utils/fetchData';
import '../AdventureDetail.scss';

const ContentFragment = ({ resource, type, data }) => {
  // AEM headless usually returns fragment data under "elements" or "model"
  const elements = data?.elements || data;

  if (!elements) {
    return <div className="content-fragment empty">Empty Content Fragment</div>;
  }

  const fragmentPath = data?.fragmentPath;
  const cfResource = fragmentPath ? `urn:aemconnection:${fragmentPath}/jcr:content/data/master` : null;

  const isArticle = data?.model === 'wknd-shared/models/article';
  const isAdventure = data?.model === 'wknd-shared/models/adventure';

  // Generic renderer for CF elements
  return (
    <div 
      className="content-fragment" 
      data-aue-resource={resource} 
      data-aue-type={type}
      data-aue-model="contentfragment"
      data-aue-label="Content Fragment"
      style={{ padding: '15px', border: '1px solid #eee', marginBottom: '15px' }}
    >
      <div 
        className={`content-fragment-elements ${isArticle || isAdventure ? 'adventure-detail' : ''}`}
        data-aue-resource={cfResource}
        data-aue-type={cfResource ? "reference" : undefined}
        data-aue-filter="cf"
        data-aue-label={isArticle ? "Article" : isAdventure ? "Adventure" : "Content Fragment"}
      >
        {isArticle ? (
          <>
            <div className="adventure-detail-header" style={{ padding: '0 1rem' }}>
              {elements.title && (
                <h1 className="adventure-detail-title" data-aue-prop="title" data-aue-type="text" data-aue-label="Title">
                  {elements.title.value || elements.title}
                </h1>
              )}
            </div>
            <div>
              {(elements.featuredImage || elements.primaryImage) && (
                <img 
                  className="adventure-detail-primaryimage" 
                  data-aue-type="media" 
                  data-aue-prop={elements.featuredImage ? "featuredImage" : "primaryImage"}
                  src={`${getImageURL((elements.featuredImage || elements.primaryImage).value || (elements.featuredImage || elements.primaryImage))}`} 
                  alt={(elements.title?.value || elements.title) || 'Article Image'}
                />
              )}
              <div className="adventure-detail-content">
                {elements.main && (
                  <div data-aue-prop="main" data-aue-type="richtext">
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
        ) : isAdventure ? (
          <>
            <div className="adventure-detail-header" style={{ padding: '0 1rem' }}>
              {elements.title && (
                <h1 className="adventure-detail-title" data-aue-prop="title" data-aue-type="text" data-aue-label="Title">
                  {elements.title.value || elements.title}
                </h1>
              )}
              {elements.activity && (
                <div className="pill default">
                  <span data-aue-prop="activity" data-aue-type="text">
                    {elements.activity.value || elements.activity}
                  </span>
                </div>
              )}
            </div>
            <div>
              {elements.primaryImage && (
                <img 
                  className="adventure-detail-primaryimage" 
                  data-aue-prop="primaryImage" 
                  data-aue-type="media"
                  src={`${getImageURL((elements.primaryImage).value || elements.primaryImage)}`} 
                  alt={(elements.title?.value || elements.title) || 'Adventure Image'}
                />
              )}
              <div className="adventure-detail-content">
                {elements.description && (
                  <div data-aue-prop="description" data-aue-type="richtext">
                    {elements.description.html ? (
                      <div dangerouslySetInnerHTML={{ __html: elements.description.html }} />
                    ) : elements.description.json ? (
                      mapJsonRichText(elements.description.json)
                    ) : (
                      <div dangerouslySetInnerHTML={{ __html: elements.description.value || elements.description }} />
                    )}
                  </div>
                )}
                <div className="adventure-detail-info">
                  <div className="adventure-detail-info-label">
                    <h6>Adventure Type</h6>
                    <span data-aue-prop='adventureType' data-aue-type="text">
                      {elements.adventureType?.value || elements.adventureType}
                    </span>
                  </div>
                  <div className="adventure-detail-info-label">
                    <h6>Trip Length</h6>
                    <span data-aue-prop='tripLength' data-aue-type="text">
                      {elements.tripLength?.value || elements.tripLength}
                    </span>
                  </div>
                  <div className="adventure-detail-info-label">
                    <h6>Difficulty</h6>
                    <span data-aue-prop='difficulty' data-aue-type="text">
                      {elements.difficulty?.value || elements.difficulty}
                    </span>
                  </div>
                  <div className="adventure-detail-info-label">
                    <h6>Group Size</h6>
                    <span data-aue-prop='groupSize' data-aue-type="text">
                      {elements.groupSize?.value || elements.groupSize}
                    </span>
                  </div>
                </div>
                {elements.itinerary && (
                  <>
                    <h6>Itinerary</h6>
                    <div data-aue-prop="itinerary" data-aue-type="richtext" className="adventure-detail-itinerary">
                      {elements.itinerary.html ? (
                        <div dangerouslySetInnerHTML={{ __html: elements.itinerary.html }} />
                      ) : elements.itinerary.json ? (
                        mapJsonRichText(elements.itinerary.json)
                      ) : (
                        <div dangerouslySetInnerHTML={{ __html: elements.itinerary.value || elements.itinerary }} />
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          </>
        ) : (
          Object.keys(elements).map(key => {
            const element = elements[key];
            if (!element || typeof element !== 'object') return null;

            const aueType = (element.html || element.json) ? "richtext" : "text";

            // Check if it's a rich text or simple text
            if (element.html) {
              return <div key={key} data-aue-prop={key} data-aue-type={aueType} dangerouslySetInnerHTML={{ __html: element.html }} />;
            } else if (element.json) {
              return <div key={key} data-aue-prop={key} data-aue-type={aueType}>{mapJsonRichText(element.json)}</div>;
            } else if (element.value) {
              return <div key={key} data-aue-prop={key} data-aue-type={aueType} className={`cf-element cf-${key}`}>{element.value}</div>;
            }
            return null;
          })
        )}
      </div>
    </div>
  );
};

export default ContentFragment;
