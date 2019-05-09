// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import store from "./state/store";

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: "#app",
  store,
  components: { App },
  template: "<App/>"
});

import moment from "moment";

const a = moment("1120am", "hmma");
const b = moment("245pm", "hmma");

// console.log(a);
// console.log(b);
console.log(a.diff(b, "hours"));
console.log(b.diff(a, "hours"));

// 2019-May-09 14:00:29
const dateinput = "2019-05-09T06:00:29.000Z";
console.log(
  moment
    .utc(dateinput)
    .utcOffset("+800")
    .format("YYYY-MM-DD HH:mm:ss")
);
