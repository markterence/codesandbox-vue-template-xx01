import Vue from "vue";
import Vuex from "vuex";

import moduleA from "./modules/moduleA";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    moduleA: moduleA
  }
});

export default store;
