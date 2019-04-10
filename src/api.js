import { getQueryString } from './helpers'

export const url = 'https://www.forverkliga.se/JavaScript/api/crud.php'

const requestApiKey = async () => {
    const cachedKey = localStorage.getItem('apiKey')

    if (cachedKey) {
        return cachedKey
    } else {
        try {
            const apiKey = await fetch(`${url}?requestKey`)
                .then(response => response.json())
                .then(result => result.key)

            localStorage.setItem('apiKey', apiKey)
            return apiKey
        } catch (err) {
            return err
        }
    }
}

const sendRequest = async (params, limit = 10) => {
    const key = await requestApiKey()
    const qs = getQueryString({
        ...params,
        key
    })

    const { status, message, ...response } = await fetch(`${url}?${qs}`).then(
        response => response.json()
    )

    if (status === 'success') {
        return { ...response, status }
    } else if (limit > 0 && status === 'error') {
        console.log({ limit, message })
        return sendRequest(params, limit - 1)
    } else {
        return { status, message }
    }
}

export const fetchBooks = async () => {
    const params = {
        op: 'select'
    }

    return await sendRequest(params)
}

export const postBook = async (title, author, limit = 10) => {
    const params = {
        op: 'insert',
        title,
        author
    }

    return await sendRequest(params)
}

export const removeBook = async id => {
    const params = {
        id,
        op: 'delete'
    }

    return await sendRequest(params)
}

export const updateBook = async (id, title, author) => {
    const params = {
        id,
        title,
        author,
        op: 'update'
    }

    return await sendRequest(params)
}