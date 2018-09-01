import { SET_TITLE_MUTATION } from './mutations';
import { setTitle, getTitle } from './title';


export default {
  state: {
    title: getTitle(),
  },
  getters: {},
  mutations: {
    [SET_TITLE_MUTATION](state, payload) {
      state.title = payload.title;
      setTitle(state.title);
    },
  },
};
