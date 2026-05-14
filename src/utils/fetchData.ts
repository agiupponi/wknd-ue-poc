import { getSearchParamsForHashRouting } from "./commons";

export const fetchData = async (path: string): Promise<any> => {
    const aemPath = path.includes(":/") ? path.split(":/")[1] : path;
    const url = `${getAuthorHost()}${aemPath.startsWith('/') ? '' : '/'}${aemPath}.infinity.json`;
    
    const token = process.env.NEXT_PUBLIC_AEM_ACCESS_TOKEN;
    const headers: Record<string, string> = {
        "X-Aem-Affinity-Type": "api"
    };
    
    if (token) {
        if (token.includes(':')) {
            headers["Authorization"] = `Basic ${btoa(token)}`;
        } else {
            headers["Authorization"] = `Bearer ${token}`;
        }
    }

    try {
        const response = await fetch(url, { 
            headers, 
            credentials: "include" 
        });
        
        if (!response.ok) {
            console.error("fetchData: Response not OK", response.status, url);
            return null;
        }

        const json = await response.json();
        return json;
    } catch (err) {
        console.error("fetchData: Error fetching or parsing JSON", err, url);
        return null;
    }
};

export const fetchModel = async (path: string): Promise<any> => {
    const aemPath = path.includes(":/") ? path.split(":/")[1] : path;
    const url = `${getAuthorHost()}/${aemPath}.model.json`;
    
    const token = process.env.NEXT_PUBLIC_AEM_ACCESS_TOKEN;
    const headers: Record<string, string> = {
        "X-Aem-Affinity-Type": "api"
    };
    
    if (token) {
        if (token.includes(':')) {
            headers["Authorization"] = `Basic ${btoa(token)}`;
        } else {
            headers["Authorization"] = `Bearer ${token}`;
        }
    }

    try {
        const response = await fetch(url, { 
            headers, 
            credentials: "include" 
        });
        
        if (!response.ok) {
            return null;
        }
        
        return await response.json();
    } catch (err) {
        console.error("fetchModel: Error", err, url);
        return null;
    }
};

export const fetchHtml = async (path: string): Promise<string | null> => {
    const aemPath = path.includes(":/") ? path.split(":/")[1] : path;
    const url = `${getAuthorHost()}${aemPath.startsWith('/') ? '' : '/'}${aemPath}`;
    
    const token = process.env.NEXT_PUBLIC_AEM_ACCESS_TOKEN;
    const headers: Record<string, string> = {
        "X-Aem-Affinity-Type": "api"
    };
    
    if (token) {
        if (token.includes(':')) {
            headers["Authorization"] = `Basic ${btoa(token)}`;
        } else {
            headers["Authorization"] = `Bearer ${token}`;
        }
    }

    try {
        const response = await fetch(url, { 
            headers, 
            credentials: "include" 
        });
        
        if (!response.ok) {
            return null;
        }
        
        return await response.text();
    } catch (err) {
        console.error("fetchHtml: Error", err, url);
        return null;
    }
};

export const getAuthorHost = (): string => {
    const searchParams = getSearchParamsForHashRouting();
    if (searchParams.has("authorHost")) {
        return searchParams.get("authorHost") as string;
    } else {
        return "/aem-proxy";
    }
}

export const getImageURL = (obj: any): string | undefined => {
    if (obj === null || obj === undefined) {
        return undefined;
    }

    if (typeof obj === "string") {
        if (obj.startsWith("https://")) {
            return obj;
        }
        return `${getAuthorHost()}${obj}`;
    }

    if (obj._authorUrl !== undefined) {
        return obj._authorUrl;
    }

    if (obj.repositoryId !== undefined && obj.assetId !== undefined) {
        return `https://${obj.repositoryId}/adobe/assets/${obj.assetId}`;
    }

    if (obj._path !== undefined) {
        return `${getAuthorHost()}${obj._path}`;
    }

    return undefined;
}

export const getProtocol = (): string => {
    const searchParams = getSearchParamsForHashRouting();
    if (searchParams.has("protocol")) {
        return searchParams.get("protocol") as string;
    } else {
        return "aem";
    }
}

export const getService = (): string | undefined => {
    const searchParams = getSearchParamsForHashRouting();
    if (searchParams.has("service")) {
        return searchParams.get("service") as string;
    }
    return process.env.NEXT_PUBLIC_UE_SERVICE;
}
