import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const REQ_TIMEOUT = 15 * 1000;

const instance = axios.create({
    baseURL: '',
    timeout: REQ_TIMEOUT
});

instance.interceptors.request.use((_config) => requestHandler(_config));

const requestHandler = (request: AxiosRequestConfig) => {
    if (__DEV__) {
        // console.log(`Request API: ${request.url}`, request.params, request.data);
        console.log(`Request API: ${request.url}`, request);
    }
    return request;
};

instance.interceptors.response.use(
    (response) => successHandler(response),
    (error) => errorHandler(error)
);

const errorHandler = (error: any) => {
    if (__DEV__) {
        console.log(error);
    }
    return Promise.reject({ ...error });
};

const successHandler = (response: AxiosResponse) => {
    if (__DEV__) {
        console.log(`Response API: ${response.config.url}`, response);
    }
    return response;
};

async function fetch<ReqType, ResType>(
    url: string,
    params?: ReqType,
    customHeaders: any = {}
): Promise<ResType> {
    const headers = getHeader(customHeaders);
    return instance.get(url, { params, headers });
}

async function post<ReqType, ResType>(
    url: string,
    data?: ReqType,
    customHeaders: any = {}
): Promise<ResType> {
    const headers = getHeader(customHeaders);
    return instance.post(url, { ...data }, { headers });
}

async function postForm<ReqType, ResType>(
    url: string,
    data?: ReqType,
    customHeaders: any = {}
): Promise<ResType> {
    const headers = getHeader(customHeaders);
    return instance.post(url, data, { headers });
}

async function put<ReqType, ResType>(
    url: string,
    data?: ReqType,
    customHeaders: any = {}
): Promise<ResType> {
    const headers = getHeader(customHeaders);
    return instance.put(url, { ...data }, { headers });
}

function getHeader(customHeaders: any = {}): any {
    return { ...customHeaders };
}

const ApiHelper = { fetch, post, put, postForm };
export default ApiHelper;
