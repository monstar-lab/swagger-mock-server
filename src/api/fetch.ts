import * as url from 'url';
import config from '../environment';

type AuthType = 'jwt' | 'intent';

export const API_ROOT = config.API_CORE_HOST + '/api/v1/user';

export async function list<T, U>(target: string, params?: U): Promise<T> {
    const urlPath = API_ROOT + target;
    const localVarUrlObj = url.parse(urlPath, true);
    if (params) {
        localVarUrlObj.query = Object.assign({}, localVarUrlObj.query, params);
        delete localVarUrlObj.search;
    }
    const response = await fetch(url.format(localVarUrlObj), {
        mode: 'cors',
        headers: getHeader('jwt')
    });

    const body = await response.json();
    if (response.status >= 200 && response.status < 400) {
        return body;
    } else {
        return Promise.reject(body);
    }
}

export async function get<T>(
    target: string,
    resourceId: number | null
): Promise<T> {
    const urlPath = API_ROOT + `${target}${resourceId ? '/' + resourceId : ''}`;
    const localVarUrlObj = url.parse(urlPath, true);
    const response = await fetch(url.format(localVarUrlObj), {
        headers: getHeader('jwt')
    });

    const body = await response.json();
    if (response.status >= 200 && response.status < 400) {
        return body;
    } else {
        return Promise.reject(body);
    }
}

export async function create<T, P>(target: string, data: T): Promise<P> {
    const urlPath = API_ROOT + `${target}`;
    const localVarUrlObj = url.parse(urlPath, true);
    const response = await fetch(url.format(localVarUrlObj), {
        body: JSON.stringify(data),
        headers: getHeader('jwt'),
        method: 'POST'
    });

    const body = await response.json();
    if (response.status >= 200 && response.status < 400) {
        return body;
    } else {
        return Promise.reject(body);
    }
}

export async function update<T, P>(target: string, data: T): Promise<P> {
    const urlPath = API_ROOT + target;
    const localVarUrlObj = url.parse(urlPath, true);
    const response = await fetch(url.format(localVarUrlObj), {
        body: JSON.stringify(data),
        headers: getHeader('jwt'),
        method: 'PUT'
    });

    try {
        const body = await response.json();
        if (response.status >= 200 && response.status < 400) {
            response.headers;
            return body;
        } else {
            return Promise.reject(body);
        }
    } catch (error) {
        // response of preflight of golang etc.
        return Promise.reject(response);
    }
}

function getHeader(authType: AuthType): RequestInit['headers'] {
    const token =
        authType === 'jwt'
            ? `Bearer: ${localStorage.getItem('id_token')}`
            : `intent`; // TODO: 正式実装

    return {
        Authorization: token
    };
}
