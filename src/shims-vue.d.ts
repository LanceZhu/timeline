import Vue from 'vue'
import { AxiosStatic } from 'axios/index.d'
// mount axios on Vue.prototype
declare module 'vue/types/vue' {
  interface Vue {
    $axios: AxiosStatic
  }
}

declare module '*.vue' {

  export default Vue
}
