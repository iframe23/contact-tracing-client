<!--
<template>
  <div class="app flex-row align-items-center">
    <div class="container">
      <b-row class="justify-content-center">
        <b-col md="6" sm="8">
          <b-card no-body class="mx-4">
            <b-card-body class="p-4">
              <b-form>
                <h1>Register</h1>
                <p class="text-muted">Create your account</p>
                <b-input-group class="mb-3">
                  <b-input-group-prepend>
                    <b-input-group-text><i class="icon-user"></i></b-input-group-text>
                  </b-input-group-prepend>
                  <b-form-input type="text" class="form-control" placeholder="Username" autocomplete="username" />
                </b-input-group>

                <b-input-group class="mb-3">
                  <b-input-group-prepend>
                    <b-input-group-text>@</b-input-group-text>
                  </b-input-group-prepend>
                  <b-form-input type="text" class="form-control" placeholder="Email" autocomplete="email" />
                </b-input-group>

                <b-input-group class="mb-3">
                  <b-input-group-prepend>
                    <b-input-group-text><i class="icon-lock"></i></b-input-group-text>
                  </b-input-group-prepend>
                  <b-form-input type="password" class="form-control" placeholder="Password" autocomplete="new-password" />
                </b-input-group>

                <b-input-group class="mb-4">
                  <b-input-group-prepend>
                    <b-input-group-text><i class="icon-lock"></i></b-input-group-text>
                  </b-input-group-prepend>
                  <b-form-input type="password" class="form-control" placeholder="Repeat password" autocomplete="new-password" />
                </b-input-group>

                <b-button variant="success" block>Create Account</b-button>
              </b-form>
            </b-card-body>
            <b-card-footer class="p-4">
              <b-row>
                <b-col cols="6">
                  <b-button block class="btn btn-facebook"><span>facebook</span></b-button>
                </b-col>
                <b-col cols="6">
                  <b-button block class="btn btn-twitter" type="button"><span>twitter</span></b-button>
                </b-col>
              </b-row>
            </b-card-footer>
          </b-card>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Register'
}
</script>
-->

<template>
  <div class="app flex-row align-items-center login-bg" :style="bg_image">
    <div class="col-md-2 col-12 d-none d-md-block">

    </div>
    <div class="col-md-8 col-12">
      <div class="container bg-info p-5 rounded bg-opacity">
        <h1>Register</h1><hr>
        <form @submit.prevent="addUser()">

          <div class="form-group">
            <div class="row align-items-center">
              <div class="col-md-6 col-12">
                <div class="form-group">
                  <label>Username</label>	
                  <input type="text" v-model="userData.username" class="form-control" required>
                </div>
              </div>
              <div class="col-md-6 col-12">
                <div class="form-group">
                  <label>Password</label>		
                  <input type="password" v-model="userData.password" class="form-control" required>
                </div> 
              </div>
              <div class="col-md-6 col-12">
                <div class="form-group">
                  <label>First Name</label>	
                  <input type="text" v-model="userData.firstname" class="form-control" required>
                </div> 
              </div>
              <div class="col-md-6 col-12">
                <div class="form-group">
                  <label>Middle Name</label>		
                  <input type="text" v-model="userData.middlename" class="form-control" required>
                </div> 
              </div>
              <div class="col-md-6 col-12">
                <div class="form-group">
                  <label>Last Name</label>	
                  <input type="text" v-model="userData.lastname" class="form-control" required>
                </div> 
              </div>
              <div class="col-md-6 col-12">
                <div class="form-group">
                  <label class="mr-3 mt-3">Gender</label>		
                  <div class="form-check form-check-inline">
                    <label class="form-check-label">
                      <input class="form-check-input" type="radio" v-model="userData.gender" id="inlineRadio1" value="Male" required> Male
                    </label>
                  </div>
                  <div class="form-check form-check-inline">
                    <label class="form-check-label">
                      <input class="form-check-input" type="radio" v-model="userData.gender" id="inlineRadio2" value="Female" required> Female
                    </label>
                  </div>
                </div> 
              </div>
              <div class="col-md-6 col-12">
                <div class="form-group">
                  <label>Address</label>
                  <input type="text" v-model="userData.address" class="form-control" required>
                </div> 
              </div>
              <div class="col-md-6 col-12">
                <div class="form-group">
                  <label>Birthdate</label>
                  <input type="date" v-model="userData.birthdate" class="form-control" required>
                </div> 
              </div>
              <div class="col-md-6 col-12">
                <div class="form-group">
                  <label>Email</label>
                  <input type="email" v-model="userData.email" class="form-control" required>
                </div> 
              </div>
              <div class="col-md-6 col-12">
                <div class="form-group">
                  <label>Contact Number</label>	
                  <input type="text" v-model="userData.contact_number" class="form-control" required>
                </div>  
              </div>
              <div class="col-6">
                <button class="btn btn-success mt-3" type="submit">Submit Registration</button>
              </div>
              <div class="col-6">
                <router-link to="/login">
                  <b-button variant="link" class="px-0 text-white float-right">Back to Login</b-button>
                </router-link>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
    <div class="col-md-2 col-12 d-none-d-md-block">

      </div>
  </div>
</template>

<script>
import {bus} from '../../main'
import {mapActions, mapGetters} from 'vuex'
import {auth_api} from '../../shared/auth'

export default {
  name: 'Register',
  data: () => {
    return{
      bg_image: {},
      alert: {
        type: '',
        result: '',
        message: '',
        dismissCountDown: 0
      },
      userData: {
        role_id : 2,
        username: '',
        password: '',
        firstname: '',
        middlename: '',
        lastname: '',
        gender: '',
        address: '',
        birthdate: '',
        email: '',
        contact_number: '',
      },
      fileData:{
        profile_pic: '',
        validID: ''
      }
    }
  },
  async created(){
    this.bg_image = {backgroundImage: "url("+this.$base_url+"img/bg.jpg)"}
  },
  computed: {
    ...mapGetters(['user'])
  },
  methods: {
    ...mapActions(['submitResident', 'fetchUser']),
    async addUser(){
      let response = await this.submitResident(this.userData);

      if(response.result == "Success"){
        response.dismissCountDown = 10;

        bus.$emit('alert_push', response);

        await auth_api.login({
          username: this.userData.username,
          password: this.userData.password
        }).then(res => {
          bus.$emit('alert_push', response);

          if(res.result == 'Success'){
            localStorage.setItem('role_id', res.role_id);
            localStorage.setItem('token', res.token);
            localStorage.setItem('username', res.username);

            this.$router.push('/');
          }
        });

      } else {
          response.dismissCountDown = 10;

          bus.$emit('alert_push', response);
      }
    },
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
