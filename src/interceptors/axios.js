import { GLOBAL_VARIABLES } from '../configs';
import RequestSignature from '../utils/request_token';


const signer = new RequestSignature();


export function onRequestSuccess(request) {
  // sign backend request
  request.headers['X-Backend-Token'] = `h-${signer.sign()}`;
  // backend server select
  request.headers['X-Server-Select'] = 'backend';

  return request;
}

export function onRequestFail(reason) {
  return Promise.reject(reason);
}

export function onResponseSuccess(response) {
  if (typeof response.data === 'string') {
    return Promise.reject(new Error('server internal error'));
  }

  const responseData = response.data;
  const { status } = responseData;

  switch (status) {
    case 0:
      return responseData.data;
    default:
      GLOBAL_VARIABLES.$Bus.$emit('global.$dialog.error', responseData.message);
      return Promise.reject(responseData);
  }
}

export function onResponseFail(reason) {
  return Promise.reject(reason);
}
