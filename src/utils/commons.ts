/**
 * Helper function to get the first adventure from the response
 */
function getArticle(data: any): any | undefined {
	if (data && data.articleList && data.articleList.items) {
		// expect there only to be a single adventure in the array
		if (data.articleList.items.length === 1) {
			return data.articleList.items[0];
		}
	}
	return undefined;
}

/**
 * Returns the query string to use when building hash-routed links.
 * Prefers the query string from the hash (e.g. #/path?foo=bar) so params
 * are not duplicated when they also appear on the main URL.
 */
function getQueryStringForHashRouting(): string {
	if (typeof window === 'undefined') return "";
	const hash = window.location.hash || "";
	const qIndex = hash.indexOf("?");
	if (qIndex >= 0) {
		return hash.slice(qIndex);
	}
	return window.location.search;
}

/**
 * Same source of truth as {@link getQueryStringForHashRouting}: document search
 * until params live in the hash (HashRouter), then parse the hash query.
 */
function getSearchParamsForHashRouting(): URLSearchParams {
	return new URLSearchParams(getQueryStringForHashRouting());
}

function getAEMPath(slug?: string | string[]): string {
	const root = process.env.NEXT_PUBLIC_AEM_ROOT || "/content/wknd/language-masters/en";
	if (!slug || (Array.isArray(slug) && slug.length === 0)) {
		return root;
	}
	return `${root}/${Array.isArray(slug) ? slug.join('/') : slug}`;
}

export { getArticle, getQueryStringForHashRouting, getSearchParamsForHashRouting, getAEMPath };
