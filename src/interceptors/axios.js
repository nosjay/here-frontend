import Variables from '../configs/variables';


/**
 * @param {AxiosRequestConfig} request
 * @return {AxiosRequestConfig}
 */
export function onRequestBefore(request) {
  return request;
}

/**
 * @param {string} reason
 * @return {Promise<string>}
 */
export function onRequestError(reason) {
  return Promise.reject(new Error(reason));
}

/**
 * @param response
 * @return {*}
 */
export function onResponseSuccess(response) {
  if (typeof response.data === 'string') {
    return Promise.reject(new Error(response.data));
  }

  const {
    status, message, data, extra,
  } = response.data;
  switch (status) {
    case 0:
      return { data, extra };
    default:
      return Promise.reject(new Error(message));
  }
}
