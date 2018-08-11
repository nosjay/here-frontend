import axios from 'axios';
import { DEFAULT_AXIOS_CONFIG } from '../../configs';
import {
  onRequestSuccess, onRequestFail,
  onResponseSuccess, onResponseFail,
} from '../../interceptors/axios';


const provider = axios.create(DEFAULT_AXIOS_CONFIG);

provider.interceptors.request.use(onRequestSuccess, onRequestFail);
provider.interceptors.response.use(onResponseSuccess, onResponseFail);


export default provider;
