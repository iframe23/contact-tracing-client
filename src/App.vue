<template>
  <div>
    <router-view></router-view>
    <Alert :alert="alert"/>
  </div>
</template>

<script>
import {bus} from './main'
import Alert from './components/Alert'

export default {
  name: 'app',
  components: {
    Alert
  },data(){
    return {
      alert: {
        type: '',
        heading: '',
        message: '',
        dismissCountDown: 0
      },
    }
  },
  async mounted(){
    bus.$on('alert_push', (payload) => {
      this.alert = payload
    })
  }
}
</script>

<style lang="scss">
  // CoreUI Icons Set
  @import '~@coreui/icons/css/coreui-icons.min.css';
  /* Import Font Awesome Icons Set */
  // $fa-font-path: '~font-awesome/fonts/';
  // @import '~font-awesome/scss/font-awesome.scss';
  /* Import Simple Line Icons Set */
  $simple-line-font-path: '~simple-line-icons/fonts/';
  @import '~simple-line-icons/scss/simple-line-icons.scss';
  /* Import Flag Icons Set */
  @import '~flag-icon-css/css/flag-icon.min.css';
  /* Import Bootstrap Vue Styles */
  @import '~bootstrap-vue/dist/bootstrap-vue.css';
  // Import Main styles for this application
  @import 'assets/scss/style';
</style>

<style>
  .VueTables--client div.form-group{
    width: 50%;
    float: left;
  }

  .VueTables--client .VueTables__limit{
    display: flex;
    justify-content: flex-end;
  }

  .sidebar .nav-link.active {
    background: #20a8d8;
  }

  .sidebar .nav-link.active .nav-icon {
    color: black;
  }

  .pdf-viewer{
    width: 100%;
    min-height: 500px;
    float: left;
  }

  .form-inline label{
    display: inline;
    margin: 0 10px 0 0;
  }

  .action-btn{
    padding: 1px 6px;
    color:#fff;
  }
  .fa{
    color: #fff;
  }

  .thead-primary thead{
    color: #fff;
    background-color: #63c2de !important;
  }
  .width-1{
    width: 60px;
  }
  .width-2{
    width: 110px;
  }
  .width-3{
    min-width: 220px;
  }
  .width-4{
    width: 180px;
  }
  .floating-toolbar{
    display: inline-block;
    position: fixed;
    bottom: 50px;
    right: 30px;
  }
  .color-black{
    color:black;
  }

  .fs-1{
    font-size: 1.2em;
  }

  .fs-2{
    font-size: 1.8em;
  }

  .fs-3{
    font-size: 2.4em;
  }

  .fs-4{
    font-size: 3.2em;
  }

   .fs-5{
    font-size: 4.2em;
  }

  .text-black{
    color:black;
  }

  .text-white{
    color:#fff;
  }

  .text-blue{
    color:#007acc;
  }
  /** Profile Page */
  .bg-lightgray{
    background-color: #ebebeb;
  }

  .bg-yellow2{
    background-color: #ffdb4d;
  }

  .bg-none{
    background-color: transparent;
  }
  .pd-b-5{
    padding-bottom: 5px;
  }
</style>