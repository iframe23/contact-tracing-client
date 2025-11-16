<template>
  <div class="app flex-row align-items-center login-bg" :style="bg_image">
    <div class="container">
      <b-row class="justify-content-center">
        <b-col md="8">
          <b-card-group class="shadow">
            <b-card no-body class="p-4 bg-opacity">
              <b-card-body>
                <b-form @submit.prevent="login()">

                  <p class="text-center text-blue row align-items-center justify-content-center fs-4 mb-0">
                    <img class="rounded" :src="this.$base_url+'img/contact-logo.jpg'" width="100%" alt="DCIT Logo">
                  </p>
                  
                  <p class="mt-3 text-white text-center fs-1">Sign In to your account</p>
                  <b-input-group class="mb-3">
                    <b-input-group-prepend><b-input-group-text><i class="icon-user text-primary"></i></b-input-group-text></b-input-group-prepend>
                    <b-form-input type="text" class="form-control" v-model="loginData.username" placeholder="Username" autocomplete="username email" required/>
                  </b-input-group>
                  <b-input-group class="mb-4">
                    <b-input-group-prepend><b-input-group-text><i class="icon-lock text-primary"></i></b-input-group-text></b-input-group-prepend>
                    <b-form-input type="password" class="form-control" v-model="loginData.password" placeholder="Password" autocomplete="current-password" required/>
                  </b-input-group>
                  <b-row>
                    <b-col cols="6">
                      <b-button type="submit" variant="primary" class="px-4">Login</b-button>
                    </b-col>
                    <b-col cols="6" class="text-right"> 
                      <router-link to="/register">
                        <span class="px-0 text-white">Create Account</span>
                      </router-link>
                    </b-col>
                  </b-row>
                </b-form>
              </b-card-body>
            </b-card>
          </b-card-group>
        </b-col>
      </b-row>
    </div>

    <!-- <Alert :alert="alert"/> -->
  </div>
</template>

<script>
import {checkLogin} from '../../shared/auth';
//import Alert from '../../components/Alert'
import {auth_api} from '../../shared/auth'
import {bus} from '../../main'

export default {
  name: 'Login',
  components:{
    //Alert
  },
  data(){
    return{
      bg_image: {backgroundImage: "url("+this.$base_url+"img/bg.jpg)"},
      loginData: {
        username: '',
        password: ''
      },
      alert: {
        type: '',
        result: '',
        message: '',
        dismissCountDown: 0
      },
    }
  },
  methods: {
    async login(){
      await auth_api.login(this.loginData).then(res => {
        this.alert.type = res.type
        this.alert.result = res.result
        this.alert.message = res.message
        this.alert.dismissCountDown = 10
        bus.$emit('alert_push', this.alert)

        if(res.result == 'Success'){
          localStorage.setItem('role_id', res.role_id);
          localStorage.setItem('token', res.token);
          localStorage.setItem('username', res.username);

          this.$router.push('/');
        }
      });
    }
  },
  created(){

  }
}
</script>

<style>
  .login-bg{
    background: #bf00ff no-repeat fixed center;
    background-size: cover;
  }
  .bg-opacity{
    background-color: rgba(87, 240, 232, 0.5);
  }
</style>