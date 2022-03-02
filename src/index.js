import SpCodelist from './components/sp-codelist/index.vue'
const components=[SpCodelist]
const install=(Vue)=>{
    console.log("hello")
    if(install.installed) return;
    components.forEach(component=>Vue.component(component.name,component))
}
if(window && window.Vue) {   //通过`script`标签引入的情况，在组件内部完成组件注册。
    Vue.use(install)
  }
export default install