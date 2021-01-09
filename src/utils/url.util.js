export function queriedUrl(baseUrl, queryParams) {
    const url = new URL(baseUrl);

    if (queryParams) {
        for (const key in queryParams) {
            if (typeof queryParams[key] !== "object") {
                url.searchParams.append(key, queryParams[key]);
            }
        }
    }

    return url.href;
}