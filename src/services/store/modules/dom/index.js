import { SET_TITLE_MUTATION } from './mutations';
import { setTitle, getTtitle } from './title';


export default {
  state: {
    title: getTtitle(),
  },
  getters: {},
  mutations: {
    [SET_TITLE_MUTATION](state, payload) {
      state.title = payload.title;
      setTitle(state.title);
    },
  },
};
