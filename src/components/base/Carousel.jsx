"use client";
import React, { useState, useEffect } from 'react';
import Container from './Container';
import './Carousel.scss';

const CarouselItem = (props) => {
    const { resource, data, isActive } = props;

    const editorProps = {
        "data-aue-component": "carousel-item",
        "data-aue-resource": resource,
        "data-aue-type": "component",
        "data-aue-label": "Carousel Item"
    };

    return (
        <div 
            className={`carousel-item ${isActive ? 'is-active' : ''}`} 
            {...editorProps}
        >
            <Container resource={resource} type="container" data={data} label="Content" />
        </div>
    );
};

const Carousel = (props) => {
    const { resource, type, data } = props;
    const [activeIndex, setActiveIndex] = useState(0);

    const itemsToProcess = data?.[":items"] || data || {};
    const items = Object.keys(itemsToProcess).filter((key) => {
        const item = itemsToProcess[key];
        if (item === null || typeof item !== 'object') return false;
        const resourceType = item["sling:resourceType"] || item[":type"];
        return resourceType?.includes("container");
    });

    // Ensure activeIndex is within bounds if items are removed
    if (items.length > 0 && activeIndex >= items.length) {
        setActiveIndex(0);
    }

    const nextSlide = () => {
        setActiveIndex((prev) => (prev + 1) % items.length);
    };

    const prevSlide = () => {
        setActiveIndex((prev) => (prev - 1 + items.length) % items.length);
    };

    const editorProps = {
        "data-aue-component": "carousel",
        "data-aue-resource": resource,
        "data-aue-type": type,
        "data-aue-label": "Carousel"
    };

    return (
        <div className="carousel" {...editorProps}>
            <div className="carousel-inner">
                {items.map((item, index) => (
                    <div key={`${resource}/${item}`} className="carousel-item-wrapper">
                        <CarouselItem 
                            resource={`${resource}/${item}`} 
                            data={(data[":items"] || data)[item]} 
                            isActive={index === activeIndex}
                        />
                    </div>
                ))}
            </div>
            
            {items.length > 1 && (
                <div className="carousel-controls">
                    <button className="carousel-btn prev" onClick={prevSlide}>&#10094;</button>
                    <button className="carousel-btn next" onClick={nextSlide}>&#10095;</button>
                </div>
            )}

            {items.length > 1 && (
                <div className="carousel-indicators">
                    {items.map((_, index) => (
                        <span 
                            key={index} 
                            className={`dot ${index === activeIndex ? 'active' : ''}`}
                            onClick={() => setActiveIndex(index)}
                        ></span>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Carousel;
