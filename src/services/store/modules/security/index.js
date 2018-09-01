import { SET_SECURITY_MUTATION } from './mutations';


export default {
  state: {
    publicKey: null,
    requestMask: null,
  },
  getters: {},
  mutations: {
    [SET_SECURITY_MUTATION](state, payload) {
      state.publicKey = payload.publicKey;
      state.requestMask = payload.requestMask;
    },
  },
};
