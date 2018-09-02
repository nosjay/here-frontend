import { SET_AUTHOR_MUTATION } from './mutations';


export default {
  state: {
    nickname: null,
  },
  getters: {},
  mutations: {
    [SET_AUTHOR_MUTATION](state, payload) {
      state.nickname = payload.nickname;
    },
  },
};
