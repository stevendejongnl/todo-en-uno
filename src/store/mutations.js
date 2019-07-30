import * as types from './mutation-types';

export default {
  [types.UPDATE_NOTES](state, payload) {
    state.notes = payload;
  },
};
