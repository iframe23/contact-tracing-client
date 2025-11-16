<template>
  <div class="float-alert">
    <b-alert :show="alert.dismissCountDown"
              dismissible
              fade
              :variant="alert.type"
              @dismissed="alert.dismissCountDown=0"
              @dismiss-count-down="countDownChanged">
              <h4 class="alert-heading">
                <span v-show="alert.type == 'success'" class="fa fa-check-circle"></span>
                <span v-show="alert.type == 'danger'" class="fa fa-window-close"></span>
                <span v-show="alert.type == 'warning'" class="fa fa-exclamation-circle"></span>
                {{alert.result}}
              </h4>
              <hr>
              <p>
                {{alert.message}}
              </p>
              <p v-if="alert.con_subjects != undefined" class="mb-0">
                <span v-for="(sub, ind) in alert.con_subjects" v-bind:key="ind">{{sub.course_abb}} Course - {{sub.subject_code}} - {{sub.descriptive_title}}</span>
              </p>
    </b-alert>
  </div>
</template>

<script>

export default {
  name: 'Alert',
  data () {
    return {
      dismissSecs: 10,
      showDismissibleAlert: false
    }
  },
  props: {
    alert: {}
  },
  methods: {
    countDownChanged (dismissCountDown) {
      this.alert.dismissCountDown = dismissCountDown
    },
    // showAlert () {
    //   this.dismissCountDown = this.dismissSecs
    // }
  },
  created(){

  }
}
</script>

<style scoped>
  .float-alert{
    position: fixed;
    width: 440px;
    z-index: 10000;
    right: 30px;
    bottom: 35px;
  }

  @media only screen and (max-width: 600px) {
    .float-alert{
      position: fixed;
      width: 100%;
      z-index: 10000;
      right: 0;
      left:0;
      bottom: 35px;
    }
  }
</style>