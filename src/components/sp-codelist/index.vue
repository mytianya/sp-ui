<template>
  <el-select
    :value="value"
    placeholder="请选择"
    @input="change($event)"
    style="width:100%"
    filterable
    :collapse-tags="collapseTags"
    size="mini"
    :clearable="clearable"
    :multiple="multiple"
    @clear="clear"
    @blur="blur"
  >
    <el-option
      v-for="item in list"
      :key="item[k]"
      :label="item[l]"
      :value="item[k]"
      :disabled="item.disabled"
    >
      <slot :item="item"></slot>
    </el-option>
  </el-select>
</template>
<script>
import axios from "axios";
export default {
  name: "sp-codelist",
  data() {
    return {
      list: [],
    };
  },
  props: {
    code: {
      required: false,
      type: String,
    },
    value: {
      type: [String, Object, Array],
    },
    apiUrl: {
      required: false,
      type: String,
    },
    k: {
      type: String,
      required: false,
      default: "code",
    },
    l: {
      type: String,
      required: false,
      default: "name",
    },
    data: {
      type: [Array],
      default: undefined,
    },
    baseURL: {
      type: String,
      default: "",
    },
    clearable: {
      type: Boolean,
      default: false,
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    collapseTags:{
      type:Boolean,
      default:false
    }
  },
  watch:{
    apiUrl:function(newUrl,oldUrl){
      if(oldUrl&&newUrl!=oldUrl){
      this.load();
      }
    }
  },
  methods: {
    set(data) {
      this.list = data;
    },
    load() {
      axios.get(this.apiUrl, {
          params: {
            typeCode: this.code,
          },
        })
        .then((resp) => {
          var data = resp.data.data;
          this.list = data;
        });
    },
    change(val) {
      this.$emit("input", val);
      if (typeof val !== "object") {
        if (val == undefined || val == "") {
          this.$emit("select", undefined);
        } else {
          let obj = this.list.find((item) => {
            return item[this.k] === val;
          });
          this.$emit("select", {
            code: obj[this.k],
            label: obj[this.l],
          });
        }
      }
    },
    clear() {
      this.$emit("clear");
    },
    blur(){
      this.$emit("blur");
    }
  },
  created() {
    if (!this.data) {
      this.load();
    } else {
      this.list = Object.assign(this.data, {});
    }
  },
};
</script>