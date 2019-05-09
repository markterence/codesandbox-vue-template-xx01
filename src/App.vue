<template>
  <div class="container">
    <div class="form-group">
      <label class="col-sm-2 col-form-label">Case</label>
      <ul>
        <li v-for="(l, i) in lodashy" :key="i">{{ l }}</li>
      </ul>
    </div>
    <div class="form-group">
      <pre> {{ flatten }} </pre>
      <pre> {{ user_map }} </pre>
    </div>

    <div class="form-group">
      <label class="col-sm-2 col-form-label">Title</label>
      <input type="text" v-model="form['Title']" class="form-control" />
    </div>
    <div class="form-group">
      <label class="col-sm-2 col-form-label">Description</label>
      <input type="text" v-model="form['Description']" class="form-control" />
    </div>

    <div class="form-group">
      <label class="col-sm-2 col-form-label">Something</label>
      <input type="text" v-model="form['Something']" class="form-control" />
    </div>
    <div class="form-group">
      <select
        class="form-control form-control-lg"
        v-model="form['optionBox']"
        @change="logme"
      >
        <option
          v-for="(v, i) in jsonResultA.urls"
          :key="i"
          :value="v.id"
          :selected="isSelected(v)"
        >
          {{ v.label + " " + jsonResultA.title }}
        </option>
      </select>
    </div>
    <div class="form-group">
      <label class="col-sm-2 col-form-label">Data: </label>
      <div>
        <pre>{{ jsonPr}}</pre>
      </div>
    </div>

    <div>
      <button class="btn" @click="fetchSomething">Set Combo box items</button>
      <span v-if="isFetching">Loading...</span><br />
      <button class="btn" @click="clearCbos">Clear</button>
      <div>
        <pre v-if="rawErrors">Errors-{{rawErrors}}</pre>
        <pre>{{ jsonResultA }}</pre>
      </div>
    </div>
  </div>
</template>

<script>
import _ from "lodash";
import cc from "change-case";
export default {
  name: "App",
  data() {
    return {
      lodashy: [],
      cbOpts: [
        {
          value: "1",
          label: "a"
        },
        {
          value: "2",
          label: "b"
        }
      ],
      form: {
        optionBox: "",
        Something: "123509601"
      },
      schema: {
        integer: {
          params: ["name"]
        },
        bigInteger: {
          params: ["name"]
        },
        text: {
          params: ["name", "textType"]
        },
        string: {
          params: ["name", "length"]
        },
        float: {
          params: ["name", "precision", "scale"]
        },
        decimal: {
          params: ["name", "precision", "scale"]
        },
        boolean: {
          params: ["name"]
        },
        date: {
          params: ["name"]
        },
        dateTime: {
          params: ["name"]
        },
        time: {
          params: ["name"]
        },
        timestamp: {
          params: ["name"]
        },
        json: {
          params: ["name"]
        },
        uuid: {
          params: ["name"]
        }
      },
      user: [
        {
          user_id: "a",
          avatar: "asd.png"
        }
      ]
    };
  },
  computed: {
    jsonPr() {
      return JSON.stringify({ form: this.form }, null, 3);
    },
    jsonResultA() {
      return this.$store.getters["moduleA/dataList"];
    },
    rawErrors() {
      return this.$store.getters["moduleA/errors"];
    },
    isFetching() {
      return this.$store.getters["moduleA/isFetchingUrls"];
    },
    flatten() {
      return _.flatMap(this.schema, function(e, i) {
        return i;
      });
    },
    user_map() {
      // let user = _.clone(this.user);
      // user.avatar = "http:/asdasd/" + this.user.avatar;
      // return user;
      return _.map(this.user, e => {
        e.avatar = "http://host/" + e.avatar;
        return e;
      });
    }
  },
  async created() {
    await this.$store.dispatch("moduleA/fetchDataList", {
      url: "https://www.dailymotion.com/playlist/x63yxn"
    });
  },
  mounted() {
    this.lodashy.push(_.kebabCase("string1"));
    this.lodashy.push(cc.paramCase("string1"));
    this.lodashy.push(cc.paramCase("authorizedSignatories1"));
    this.lodashy.push(cc.paramCase("abc_abcAbc12"));
  },
  methods: {
    isSelected(item) {
      return item.value == this.form.optionBox;
    },
    logme() {
      console.log(this.form.optionBox);
      window.location.href = this.form.optionBox;
    },
    clearCbos() {
      //$store.commit to call a mutation.
      this.$store.commit("moduleA/CLEAR_DATALIST");
    },
    fetchSomething() {
      // "moduleA/fetchDataList" accepts { url }
      // $store.dispatch to call an action
      // { url : "https://url" }
      this.$store.dispatch("moduleA/fetchDataList", {
        url: "https://www.dailymotion.com/playlist/x63yxn"
      });
    }
  }
};
</script>
