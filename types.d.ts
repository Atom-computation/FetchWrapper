export type FetchData = object | FormData | null;
export type FetchHeaders = Headers | null;
export type FetchReturn<T> = { data: T, ok(): boolean, status: number };

interface FetchWrapper {
    /**
     * Execute a get call
     * @param url Url to fetch
     * @param data Data to fetch (must not have a Blob in it)
     * @param headers Headers for the request
     */
    get<T>(url: string, data: FetchData, headers: FetchHeaders): Promise<FetchReturn<T>>;

    /**
     * Execute a post call
     * @param url Url to fetch
     * @param data Data to fetch
     * @param headers Headers for the request
     */
    post<T>(url: string, data: FetchData, headers: FetchHeaders): Promise<FetchReturn<T>>;

    /**
     * Execute a post call
     * @param url Url to fetch
     * @param data Data to fetch
     * @param headers Headers for the request
     */
    put<T>(url: string, data: FetchData, headers: FetchHeaders): Promise<FetchReturn<T>>;

    /**
     * Execute a post call
     * @param url Url to fetch
     * @param data Data to fetch
     * @param headers Headers for the request
     */
    delete<T>(url: string, data: FetchData, headers: FetchHeaders): Promise<FetchReturn<T>>;
}

export default FetchWrapper;