import FetchWrapper, { FetchData, FetchHeaders, FetchReturn } from './types';

class FetchApi implements FetchWrapper {
    /**
     * @inheritDoc
     */
    public delete<T>(url: string, data: FetchData = null, headers: FetchHeaders = new Headers({})): Promise<FetchReturn<T>> {
        return FetchApi._fetch(url, 'DELETE', data, headers);
    }

    /**
     * @inheritDoc
     */
    public get<T>(url: string, data: FetchData = null, headers: FetchHeaders = new Headers({})): Promise<FetchReturn<T>> {
        const params: string[] = [];
        if (data && data instanceof FormData) {
            (data as FormData).forEach((value, key) => {
                if (value instanceof Blob) {
                    throw new Error(
                        `A blob or a file cannot be passed as get parameters. Key=${key}`
                    );
                }
                params.push(`${key}=${value.toString()}`);
            });
        }
        const newUrl = `${url}?${params.join(',')}`
        return FetchApi._fetch(newUrl, 'GET', null, headers);
    }

    /**
     * @inheritDoc
     */
    public post<T>(url: string, data: FetchData = null, headers: FetchHeaders = new Headers({})): Promise<FetchReturn<T>> {
        return FetchApi._fetch(url, 'POST', data, headers);
    }

    /**
     * @inheritDoc
     */
    public put<T>(url: string, data: FetchData = null, headers: FetchHeaders = new Headers({})): Promise<FetchReturn<T>> {
        return FetchApi._fetch(url, 'PUT', data, headers);
    }

    /**
     * Internal wrapper
     * @param url Url to fetch
     * @param methodName Method call
     * @param data Data to fetch
     * @param headers Headers for the request
     * @private
     */
    private static async _fetch<T>(url: string, methodName: string, data: FetchData, headers: FetchHeaders): Promise<FetchReturn<T>> {
        try {
            let response;
            if (data === null) {
                response = await fetch(url, {
                    method: methodName,
                    headers: headers
                });
            } else if (data instanceof FormData) {
                response = await fetch(url, {
                    method: methodName,
                    headers: headers,
                    body: data
                });
            }
            else {
                response = await fetch(url, {
                    method: methodName,
                    headers: headers,
                    body: JSON.stringify(data)
                });
            }
            return {
                status: response.status,
                data: await (response.headers.get('Content-Type') === 'application/json;charset=utf-8' ? response.json() : response.text()),
                ok() {
                    return this.status >= 200 && this.status < 300;
                }
            }
        } catch (error) {
            return {
                status: 500,
                data: error,
                ok() {
                    return false;
                }
            };
        }
    }
}

export default new FetchApi() as FetchWrapper;