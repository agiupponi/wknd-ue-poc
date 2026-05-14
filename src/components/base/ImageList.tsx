"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { getImageURL, fetchModel } from '../../utils/fetchData';
import Loading from './Loading';
import './ImageList.scss';
import Image from 'next/image';
import { AEMComponentProps } from '../../types/aem';

const findFirstImage = (obj: any): any => {
    if (!obj || typeof obj !== 'object') return null;
    const resourceType = obj["sling:resourceType"] || obj[":type"];
    if (resourceType === "wknd/components/image") return obj;
    
    const items = obj[":items"];
    if (items) {
        for (const key in items) {
            const found = findFirstImage(items[key]);
            if (found) return found;
        }
    }
    return null;
};

interface ImageListItemProps {
    item: {
        path: string;
        title?: string;
        description?: string;
        link?: {
            url: string;
        };
    };
}

const ImageListItem: React.FC<ImageListItemProps> = ({ item }) => {
    const [model, setModel] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const path = item.path;

    useEffect(() => {
        if (!path) {
            setLoading(false);
            return;
        }
        fetchModel(path).then((data) => {
            setModel(data);
            setLoading(false);
        }).catch((err) => {
            console.error("Error fetching item model:", err);
            setLoading(false);
        });
    }, [path]);

    if (loading) return <div className="cmp-imagelist__item-loading"><Loading /></div>;
    if (!model) return null;

    const title = model["jcr:title"] || model["title"] || item.title;
    const description = model["jcr:description"] || model["description"] || item.description;
    
    // Recursively find the first image component starting from the root container
    const rootContainer = model[":items"]?.root?.[":items"]?.container;
    const imageItem = findFirstImage(rootContainer);
    const imagePath = imageItem?.fileReference || imageItem?.src || imageItem?.file;
    const imageUrl = imagePath ? getImageURL(imagePath) : undefined;

    const linkUrl = item.link?.url || (path ? `${path}.html` : "#");

    const itemProps = {
        "data-aue-resource": `urn:aemconnection:${path}/jcr:content`,
        "data-aue-component": "image-list-item",
        "data-aue-type": "component",
        "data-aue-label": "Image List Item"
    };

    const titleProps = {
        "data-aue-label": "Title",
        "data-aue-prop": "jcr:title",
        "data-aue-type": "text"
    };

    const descProps = {
        "data-aue-label": "Description",
        "data-aue-prop": "jcr:description",
        "data-aue-type": "text"
    };

    return (
        <div className="cmp-imagelist__item" {...itemProps}>
            <Link href={linkUrl} className="cmp-imagelist__item-link">
                <div className="cmp-imagelist__item-image">
                    {imageUrl ? (
                        <Image 
                            src={imageUrl} 
                            alt={title || ""} 
                            width={400} 
                            height={300} 
                            sizes="(max-width: 768px) 100vw, 33vw"
                            style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
                        />
                    ) : (
                        <div className="cmp-imagelist__item-image-placeholder" />
                    )}
                </div>
                <div className="cmp-imagelist__item-content">
                    <h3 className="cmp-imagelist__item-title" {...titleProps}>{title}</h3>
                    {description && <p className="cmp-imagelist__item-description" {...descProps}>{description}</p>}
                </div>
            </Link>
        </div>
    );
};

const ImageList: React.FC<AEMComponentProps> = (props) => {
    const { resource, type, data } = props;
    const items = data?.items || [];

    const editorProps = {
        "data-aue-component": "image-list",
        "data-aue-resource": resource,
        "data-aue-type": type,
        "data-aue-label": "Image List",
        "data-aue-prop": "pages"
    };

    return (
        <div className="cmp-imagelist" {...editorProps}>
            <div className="cmp-imagelist__items">
                {items.length > 0 ? (
                    items.map((item: any, index: number) => (
                        <ImageListItem key={index} item={item} />
                    ))
                ) : (
                    <div className="cmp-imagelist__empty">Image List (Empty)</div>
                )}
            </div>
        </div>
    );
};

export default ImageList;
