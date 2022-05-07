type FetchData = object | FormData | null;
type FetchHeaders = Headers | null;

interface FetchWrapper {
  get(url: string, data: FetchData, headers: FetchHeaders);
  post(url: string, data: FetchData, headers: FetchHeaders);
  put(url: string, data: FetchData, headers: FetchHeaders);
  delete(url: string, data: FetchData, headers: FetchHeaders);
}

class FetchApi implements FetchWrapper {
    public delete(url: string, data: FetchData = null, headers: FetchHeaders = new Headers({})): Promise<any> {}
 
    public get(url: string, data: FetchData = null, headers: FetchHeaders = new Headers({})): Promise<any> {
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
        return this._fetch(newUrl, 'GET', null, headers);
    }

    public post(url: string, data: FetchData = null, headers: FetchHeaders = new Headers({})): Promise<any> {}

    public put(url: string, data: FetchData = null, headers: FetchHeaders = new Headers({})): Promise<any> {}

    private async _fetch(url: string, methodName: string, data: FetchData, headers: FetchHeaders): Promise<any> {
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
                error: error
            };
        }
    }
}

export default new FetchApi();