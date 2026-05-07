"use client";
import React, { useState, useEffect } from 'react';
import Container from './Container';
import './Carousel.scss';

const CarouselItem = (props) => {
    const { resource, data, isActive } = props;

    return (
        <div 
            className={`carousel-item ${isActive ? 'is-active' : ''}`} 
            data-aue-component="carousel-item" 
            data-aue-resource={resource} 
            data-aue-type="component" 
            data-aue-label="Carousel Item"
        >
            <Container resource={resource} type="container" data={data} label="Content" />
        </div>
    );
};

const Carousel = (props) => {
    const { resource, type, data } = props;
    const [items, setItems] = useState([]);
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        if (!data) return;
        const itemsToProcess = data[":items"] || data;
        const itemKeys = Object.keys(itemsToProcess).filter((key) => {
            const item = itemsToProcess[key];
            if (typeof item !== 'object') return false;
            const resourceType = item["sling:resourceType"] || item[":type"];
            return resourceType?.includes("container");
        });
        setItems(itemKeys);
        if (itemKeys.length > 0 && activeIndex >= itemKeys.length) {
            setActiveIndex(0);
        }
    }, [resource, type, data, activeIndex]);

    const nextSlide = () => {
        setActiveIndex((prev) => (prev + 1) % items.length);
    };

    const prevSlide = () => {
        setActiveIndex((prev) => (prev - 1 + items.length) % items.length);
    };

    return (
        <div className="carousel" data-aue-component="carousel" data-aue-resource={resource} data-aue-type={type} data-aue-label="Carousel">
            <div className="carousel-inner">
                {items.map((item, index) => (
                    <CarouselItem 
                        key={`${resource}/${item}`} 
                        resource={`${resource}/${item}`} 
                        data={(data[":items"] || data)[item]} 
                        isActive={index === activeIndex}
                    />
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
