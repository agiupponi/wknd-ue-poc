import React from 'react';
import { mapJsonRichText } from '../../../../utils/renderRichText';
import { getImageURL } from '../../../../utils/fetchData';
import { CFComponentProps } from '../../../../types/aem';
import './Adventure.scss';

const Adventure: React.FC<CFComponentProps> = ({ elements }) => {
  const adventureProps = {
    title: { "data-aue-prop": "title", "data-aue-type": "text", "data-aue-label": "Title" },
    activity: { "data-aue-prop": "activity", "data-aue-type": "text" },
    image: { "data-aue-prop": "primaryImage", "data-aue-type": "media" },
    description: { "data-aue-prop": "description", "data-aue-type": "richtext" },
    adventureType: { "data-aue-prop": "adventureType", "data-aue-type": "text" },
    tripLength: { "data-aue-prop": "tripLength", "data-aue-type": "text" },
    difficulty: { "data-aue-prop": "difficulty", "data-aue-type": "text" },
    groupSize: { "data-aue-prop": "groupSize", "data-aue-type": "text" },
    itinerary: { "data-aue-prop": "itinerary", "data-aue-type": "richtext" }
  };

  return (
    <>
      <div className="adventure-detail-header" style={{ padding: '0 1rem' }}>
        {elements.title && (
          <h1 className="adventure-detail-title" {...adventureProps.title}>
            {elements.title.value || elements.title}
          </h1>
        )}
        {elements.activity && (
          <div className="pill default">
            <span {...adventureProps.activity}>
              {elements.activity.value || elements.activity}
            </span>
          </div>
        )}
      </div>
      <div>
        {elements.primaryImage && (
          <img 
            className="adventure-detail-primaryimage" 
            {...adventureProps.image}
            src={`${getImageURL((elements.primaryImage).value || elements.primaryImage)}`} 
            alt={(elements.title?.value || elements.title) || 'Adventure Image'}
          />
        )}
        <div className="adventure-detail-content">
          {elements.description && (
            <div {...adventureProps.description}>
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
              <span {...adventureProps.adventureType}>
                {elements.adventureType?.value || elements.adventureType}
              </span>
            </div>
            <div className="adventure-detail-info-label">
              <h6>Trip Length</h6>
              <span {...adventureProps.tripLength}>
                {elements.tripLength?.value || elements.tripLength}
              </span>
            </div>
            <div className="adventure-detail-info-label">
              <h6>Difficulty</h6>
              <span {...adventureProps.difficulty}>
                {elements.difficulty?.value || elements.difficulty}
              </span>
            </div>
            <div className="adventure-detail-info-label">
              <h6>Group Size</h6>
              <span {...adventureProps.groupSize}>
                {elements.groupSize?.value || elements.groupSize}
              </span>
            </div>
          </div>
          {elements.itinerary && (
            <>
              <h6>Itinerary</h6>
              <div className="adventure-detail-itinerary" {...adventureProps.itinerary}>
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
  );
};

export default Adventure;
