import { AXIOS_REQUEST_PRINTER, AXIOS_RESPONSE_PRINTER } from '../configs';


export function onRequestSuccess(request) {
  if (AXIOS_REQUEST_PRINTER) {
    console.info(`axios.onRequestSuccess: url=${request.url}`, request);
  }

  return request;
}

export function onRequestFail(reason) {
  return Promise.reject(reason);
}

export function onResponseSuccess(response) {
  const responseData = response.data;
  const { status } = responseData;

  if (AXIOS_RESPONSE_PRINTER) {
    console.info(`axios.onResponseSuccess: status=${status}`, response);
  }

  switch (status) {
    case 0:
      return responseData.data;
    default:
      GLOBAL.bus.$emit('global.$dialog.error', responseData.message);
      return Promise.reject(responseData);
  }
}

export function onResponseFail(reason) {
  return Promise.reject(reason);
}
