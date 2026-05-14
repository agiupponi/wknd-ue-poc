"use client";
import React, { ReactNode } from 'react';
import { useAEMData } from '../../hooks/useAEMData';
import { getEditorProps } from '../../utils/instrumentation';
import { AEMComponentProps } from '../../types/aem';

// Direct imports to avoid circular dependencies via index.ts
import Text from './Text';
import Title from './Title';
import Image from './Image';
import Accordion from './Accordion';
import Teaser from './Teaser';
import ImageList from './ImageList';
import Separator from './Separator';
import Carousel from './Carousel';
import Layout from './Layout';
import ContentFragment from './ContentFragment';

const Container: React.FC<AEMComponentProps> = ({ resource, type, label = "Container", data: initialData, filter, behavior }) => {
  const { data } = useAEMData(resource, initialData);

  const gridClassNames = data?.gridClassNames || "aem-Grid aem-Grid--12 aem-Grid--default--12";
  const columnClassNames = data?.columnClassNames || {};

  const createChildComponents = (items: Record<string, any>, itemid: string) => {
    const components: ReactNode[] = [];
    for(let key in items) {
      const item = items[key];
      if (item === null || typeof item !== 'object') continue;

      const resourceType = item["sling:resourceType"] || item[":type"];
      const typeStr = resourceType?.split("/").pop();
      if (!typeStr) continue;

      let itemType: string, Component: React.FC<any>;
      switch(typeStr) {
        case "image": 
          itemType = "media";
          Component = Image;
          break;
        case "text": 
          itemType = (item.richText || item.textIsRich) ? "richtext" : "text";
          Component = item.type ? Title : Text;
          break;
        case "title":
            itemType = "text";
            Component = Title;
            break;
        case "responsivegrid":
        case "container":
          itemType = "container";
          Component = Container as any;
          break;
        case "tabs":
        case "accordion":
          itemType = "container";
          Component = Accordion;
          break;
        case "teaser":
          itemType = "component";
          Component = Teaser;
          break;
        case "image-list":
          itemType = "component";
          Component = ImageList;
          break;
        case "separator":
          itemType = "component";
          Component = Separator;
          break;
        case "contentfragment":
          itemType = "component";
          Component = ContentFragment;
          break;
        case "carousel":
          itemType = "container";
          Component = Carousel;
          break;
        case "layout":
          itemType = "container";
          Component = Layout;
          break;
        case "button":
        case "breadcrumb":
        case "list":
        case "navigation":
          itemType = "component";
          Component = (props: any) => (
            <div className="placeholder-component" style={{border: '1px dashed #ccc', padding: '10px', margin: '5px'}}>
               {typeStr} ({props.resource})
            </div>
          );
          break;
        default: 
          itemType = "component";
          Component = (props: any) => (<div className="unmapped-component">Unmapped: {typeStr} ({props.resource})</div>);
          break;
      }

      const props = {
        resource: `${itemid}/${key}`,
        type: itemType,
        data: item,
      };

      const colClass = columnClassNames[key] || "aem-GridColumn aem-GridColumn--default--12";
      
      components.push(
        <div key={props.resource} className={colClass}>
          <Component {...props} />
        </div>
      );
    }
    return components;
  }

  const items = data?.[":items"] || data || {};
  const renderedComponents = createChildComponents(items, resource);
  
  const editorProps = getEditorProps(resource, type, { label, filter, behavior, component: "container" });

  return (
    <div className={gridClassNames} {...editorProps}>
     {renderedComponents}
    </div>
  )
};

export default Container;
