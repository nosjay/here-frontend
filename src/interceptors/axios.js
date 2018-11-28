import { GLOBAL_VARIABLES } from '../configs';
import RequestSignature from '../utils/request_token';


const signer = new RequestSignature();

/**
 * @param {AxiosRequestConfig} request
 * @return {AxiosRequestConfig}
 */
export function onRequestSuccess(request) {
  // sign backend request
  request.headers['X-Backend-Token'] = `h-${signer.sign()}`;
  // backend server select
  request.headers['X-Server-Select'] = 'backend';

  return request;
}

/**
 * @param {string} reason
 * @return {Promise<string>}
 */
export function onRequestFail(reason) {
  return Promise.reject(reason);
}

/**
 * @param {AxiosResponse} response
 * @return {Promise<object>|{data, extra}}
 */
export function onResponseSuccess(response) {
  if (typeof response.data === 'string') {
    return Promise.reject(new Error('Server Internal Error'));
  }

  const {
    status, message, data, extra,
  } = response.data;

  switch (status) {
    case 0:
      return { data, extra };
    default:
      return Promise.reject(message);
  }
}

/**
 * @param {AxiosError} error
 * @return {Promise<string>}
 */
export function onResponseFail(error) {
  const { response, message } = error;

  if (typeof response.data === 'object') {
    if (response.data.message) {
      return Promise.reject(response.data.message);
    }
  }
  return Promise.reject(message);
}
