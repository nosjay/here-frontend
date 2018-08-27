import { AXIOS_REQUEST_PRINTER, AXIOS_RESPONSE_PRINTER } from '../configs';
import logging from '../utils/logging';
import requestSignature from '../utils/request_token';


export function onRequestSuccess(request) {
  if (AXIOS_REQUEST_PRINTER) {
    logging.group('RequestBefore')
      .info(request)
      .end();
  }

  // sign backend request
  request.headers['X-Backend-Token'] = `h-${requestSignature()}`;
  // backend server select
  request.headers['X-Server-Select'] = 'backend';

  return request;
}

export function onRequestFail(reason) {
  return Promise.reject(reason);
}

export function onResponseSuccess(response) {
  const responseData = response.data;
  const { status } = responseData;

  if (AXIOS_RESPONSE_PRINTER) {
    // eslint-disable-next-line no-console
    console.info(`axios.onResponseSuccess: status=${status}`, response);
  }

  switch (status) {
    case 0:
      return responseData.data;
    default:
      GLOBAL.$Bus.$emit('global.$dialog.error', responseData.message);
      return Promise.reject(responseData);
  }
}

export function onResponseFail(reason) {
  return Promise.reject(reason);
}
