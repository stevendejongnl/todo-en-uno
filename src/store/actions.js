import * as types from './mutation-types';

export const setNOTE = ({ commit }, payload) => {
  commit(types.UPDATE_NOTES, payload);
};
