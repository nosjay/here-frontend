import axios from 'axios';
import { DEFAULT_AXIOS_CONFIG } from '../../configs';
import {
  onRequestSuccess, onRequestFail,
  onResponseSuccess, onResponseFail,
} from '../../interceptors/axios';
import ActionCollection from './action';


const instance = axios.create(DEFAULT_AXIOS_CONFIG);
instance.interceptors.request.use(onRequestSuccess, onRequestFail);
instance.interceptors.response.use(onResponseSuccess, onResponseFail);

// eslint-disable-next-line import/prefer-default-export
export const provider = new ActionCollection(instance);
