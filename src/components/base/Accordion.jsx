"use client";
import React from 'react';
import Container from './Container';
import './Accordion.scss';

const AccordionItem = (props) => {
    const {resource, data, isOpen, onToggle} = props;
    const editorProps = {
        "data-aue-component": "accordion-item",
        "data-aue-resource": resource,
        "data-aue-type": "component",
        "data-aue-label": "Accordion Item"
    };

    const titleProps = {
        "data-aue-prop": "cq:panelTitle",
        "data-aue-type": "text",
        "data-aue-label": "Title"
    };

    return(
        <div className={`accordion-item ${isOpen ? 'is-open' : ''}`} {...editorProps}>
            <div className="accordion-item-title" onClick={onToggle}>
                <h3 {...titleProps}>{data?.["cq:panelTitle"] || data?.["jcr:title"] || data?.["title"] || "Item"}</h3>
                <span className="accordion-item-icon">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </span>
            </div>
            <div className="accordion-item-content">
                <div className="accordion-item-content-inner">
                    <Container resource={resource} type="container" data={data} label="Content" />
                </div>
            </div>
        </div>
    );
}


const Accordion = (props) => {
    const {resource, type, data} = props;
    const [openItems, setOpenItems] = React.useState(new Set([0])); // Optionally open the first item by default

    const itemsToProcess = data?.[":items"] || data || {};
    const items = Object.keys(itemsToProcess).filter((key) => {
        const item = itemsToProcess[key];
        if (item === null || typeof item !== 'object') return false;
        const resourceType = item["sling:resourceType"] || item[":type"];
        return resourceType?.includes("container");
    });

    const toggleItem = (index) => {
        setOpenItems(prev => {
            const newSet = new Set(prev);
            if (newSet.has(index)) {
                newSet.delete(index);
            } else {
                newSet.add(index);
            }
            return newSet;
        });
    };
    const editorProps = {
        "data-aue-component": "accordion",
        "data-aue-resource": resource,
        "data-aue-type": type,
        "data-aue-label": "Accordion"
    };

    return (
        <div className="accordion" {...editorProps}>
            {items.map((item, index) => (
                <div key={`${resource}/${item}`} className="accordion-item-wrapper">
                    <AccordionItem 
                        resource={`${resource}/${item}`} 
                        type={type} 
                        data={(data[":items"] || data)[item]} 
                        isOpen={openItems.has(index)}
                        onToggle={() => toggleItem(index)}
                    />
                </div>
            ))}
        </div>
    )
}

export default Accordion;
