import axios from 'axios';
import { DEFAULT_AXIOS_CONFIG } from '../../configs';
import {
  onRequestSuccess, onRequestFail,
  onResponseSuccess, onResponseFail,
} from '../../interceptors/axios';


const instance = axios.create(DEFAULT_AXIOS_CONFIG);

instance.interceptors.request.use(onRequestSuccess, onRequestFail);
instance.interceptors.response.use(onResponseSuccess, onResponseFail);


class ActionProvider {
  constructor(axiosInstance) {
    this.axios = axiosInstance;
  }

  // eslint-disable-next-line
  wanna(action, params, data) {
    this.axios.get(action);
  }
}

const provider = new ActionProvider(instance);

export default provider;
