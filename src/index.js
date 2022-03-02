import SpCodelist from './components/sp-codelist/index.vue'
const components=[SpCodelist]
const install=(Vue)=>{
    if(install.installed) return;
    components.forEach(component=>Vue.component(component.name,component))
}
if(typeof window!=='undefined'&&window.Vue){
    install(window.Vue)
}
export default{
    install
}