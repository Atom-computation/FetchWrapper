/**
 * Fetch wrapper
 */
const fetchAPI = {
    /**
     * Send a get request to the server's api
     * @param {string} url Route
     * @param {Object} data Data to send
     * @param {Object} headers Additional headers
     * @returns {Object} Json response
     */
    async get (url, data = null,
               headers = {'Content-Type': 'application/json;charset=utf-8'}) {
        return this._fetch(url, 'GET', data, headers);
    },

    /**
     * Send a post request to the server's api
     * @param {string} url Route
     * @param {Object} data Data to send
     * @param {Object} headers Additional headers
     * @returns {Object} Json response
     */
    async post(url, data = null,
               headers = {'Content-Type': 'application/json;charset=utf-8'}) {
        return this._fetch(url, 'POST', data, headers);
    },

    /**
     * Send a put request to the server's api
     * @param {string} url Route
     * @param {Object} data Data to send
     * @param {Object} headers Additional headers
     * @returns {Object} Json response
     */
    async put(url, data = null,
              headers = {'Content-Type': 'application/json;charset=utf-8'}) {
        return this._fetch(url, 'PUT', data, headers);
    },

    /**
     * Send a delete request to the server's api
     * @param {string} url Route
     * @param {Object} data Data to send
     * @param {Object} headers Additional headers
     * @returns {Object} Json response
     */
    async delete(url, data = null,
                 headers = {'Content-Type': 'application/json;charset=utf-8'}) {
        return this._fetch(url, 'DELETE', data, headers);
    },

    /**
     * Call a fetch to the server's api
     * @param {string} url Route
     * @param {string} methodName HTTP action
     * @param {Object} data Data to send
     * @param {Object} headers Additional headers
     * @returns {Object} Json response object
     * @private
     */
    async _fetch(url, methodName, data, headers) {
        try {
            let response = {};
            if (data === null) {
                response = await fetch(url, {
                    method: methodName,
                    headers: new Headers({
                        ...headers,
                    }),
                });
            }
            else if (data instanceof FormData) {
                response = await fetch(url, {
                    method: methodName,
                    headers: new Headers({
                        ...headers,
                    }),
                    body: data,
                });
            }
            else {
                response = await fetch(url, {
                    method: methodName,
                    headers: new Headers({
                        ...headers,
                    }),
                    body: JSON.stringify(data),
                });
            }
            let ret = {
                status: response.status,
                ok() {
                    return this.status >= 200 && this.status < 300;
                }
            };
            if (response.headers.get('Content-Type') === 'application/json;charset=utf-8') {
                ret.data = await response.json();
            }
            else {
                ret.data = await response.text();
            }
            return ret;
        } catch (error) {
            return {
                err: error,
            };
        }
    },
};

export default fetchAPI;