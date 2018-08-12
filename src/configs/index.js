// platform environment
export const NODE_ENV = process.env.NODE_ENV || 'production';

// enable ajax to MOCK data
export const ENABLE_AJAX_LOCALLY = false;

// default config for vue-router
export const DEFAULT_ROUTER_CONFIG = {
  mode: 'history',
};

// default config for axios
export const DEFAULT_AXIOS_CONFIG = {
  timeout: 10000,
  maxContentLength: 2000,
  headers: {},
};

// default config for vuex
export const DEFAULT_VUEX_CONFIG = {
  strict: NODE_ENV !== 'production',
};

// something else
export const VUE_DEBUG_TOOLS = true;
export const VUE_PRODUCTION_TIPS = true;

export const AXIOS_REQUEST_PRINTER = true;
export const AXIOS_RESPONSE_PRINTER = true;

export const USE_I_MISS_YOU = true;
