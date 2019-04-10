export const getQueryString = query =>
    Object.entries(query)
        .map(
            ([key, value]) =>
                `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
        )
        .join('&')
        .replace(/%20/g, '+')