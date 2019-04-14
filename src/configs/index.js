// Application environment
export const APPLICATION_ENV = process.env.NODE_ENV || 'production';
export const IS_PRODUCTION_ENV = APPLICATION_ENV === 'production';

// Application exports
export const APPLICATION_EXPORTS_DEBUG = !IS_PRODUCTION_ENV;

// Vue dev-tools configure
export const VUE_DEV_TOOLS_DEBUG = !IS_PRODUCTION_ENV;
export const VUE_DEV_TOOLS_PRODUCTION_TIPS = !IS_PRODUCTION_ENV;

// Vue-Router configure by default
export const VUE_ROUTER_DEFAULT_CONFIGURE = {
  mode: 'history',
};

// VueX configure by default
export const VUEX_DEFAULT_CONFIGURE = {
  strict: true,
};

// axios configure by default
export const AXIOS_WITH_CREDENTIALS = false;
export const AXIOS_DEFAULT_CONFIGURE = {
  timeout: 5,
  headers: {},
  withCredentials: AXIOS_WITH_CREDENTIALS,
};
