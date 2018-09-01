// platform environment
export const NODE_ENV = process.env.NODE_ENV || 'production';
export const IS_PRODUCTION_ENV = NODE_ENV === 'production';

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

export const AXIOS_DEFAULT_TOKEN = '00-ff-7cc1981f5-ff00';
