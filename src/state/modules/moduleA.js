import Model from "../../models/Model";

export const state = {
  dataList: [],
  errors: [],
  isFetchingUrls: false
};

export const getters = {
  dataList: state => state.dataList,
  isFetchingUrls: state => state.isFetchingUrls
};

export const mutations = {
  SET_DATALIST(state, newValue) {
    state.dataList = newValue;
  },
  SET_ERRORS(state, errors) {
    state.errors = errors;
  },
  SET_FECHTHING_STATE(state, newValue) {
    state.isFetchingUrls = newValue;
  },
  CLEAR_DATALIST(state) {
    state.isFetchingUrls = false;
    state.dataList = [];
  }
};

export const actions = {
  // Read All
  async fetchDataList({ commit, state, dispath }, { url }) {
    try {
      // `{ url }` is shorthand for `{ url: "value"}`
      commit("SET_FECHTHING_STATE", true);
      let response = await Model.findByUrl(url);
      commit("SET_DATALIST", response.data);
      commit("SET_FECHTHING_STATE", false);
    } catch (error) {
      console.error(`[@state/model]`, error);
      commit("SET_ERRORS", error);
      commit("SET_FECHTHING_STATE", false);
    }
  }
};

export default {
  namespaced: true,
  getters: getters,
  actions: actions,
  mutations: mutations,
  state: state
};
