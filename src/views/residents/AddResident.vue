<template>
  <div class="mt-4 container-fluid">
    <form @submit.prevent="addUser()">

      <div class="form-group">
        <div class="row align-items-center">
          <div class="col-2">
            <label>Username</label>		
          </div>

          <div class="col-6">
            <input type="text" v-model="userData.username" class="form-control" required>
          </div>
        </div>
      </div>

      <div class="form-group">
        <div class="row align-items-center">
          <div class="col-2">
            <label>Password</label>		
          </div>

          <div class="col-6">
            <input type="password" v-model="userData.password" class="form-control" required>
          </div>
        </div>
      </div>

      <div class="form-group">
        <div class="row align-items-center">
          <div class="col-2">
            <label>First Name</label>		
          </div>

          <div class="col-6">
            <input type="text" v-model="userData.firstname" class="form-control" required>
          </div>
        </div>
      </div>

      <div class="form-group">
        <div class="row align-items-center">
          <div class="col-2">
            <label>Middle Name</label>		
          </div>

          <div class="col-6">
            <input type="text" v-model="userData.middlename" class="form-control" required>
          </div>
        </div>
      </div>

      <div class="form-group">
        <div class="row align-items-center">
          <div class="col-2">
            <label>Last Name</label>		
          </div>

          <div class="col-6">
            <input type="text" v-model="userData.lastname" class="form-control" required>
          </div>
        </div>
      </div>

      <div class="form-group">
        <div class="row align-items-center">
          <div class="col-2">
            <label>Gender</label>		
          </div>

          <div class="col-6">
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
      </div>

      <div class="form-group">
        <div class="row align-items-center">
          <div class="col-2">
            <label>Address</label>		
          </div>

          <div class="col-4">
            <input type="text" v-model="userData.address" class="form-control" required>
          </div>
        </div>
      </div>

      <div class="form-group">
        <div class="row align-items-center">
          <div class="col-2">
            <label>Birthdate</label>		
          </div>

          <div class="col-4">
            <input type="date" v-model="userData.birthdate" class="form-control" required>
          </div>
        </div>
      </div>

      <div class="form-group">
        <div class="row align-items-center">
          <div class="col-2">
            <label>Email</label>		
          </div>

          <div class="col-4">
            <input type="email" v-model="userData.email" class="form-control">
          </div>
        </div>
      </div>

      <div class="form-group">
        <div class="row align-items-center">
          <div class="col-2">
            <label>Contact Number</label>		
          </div>

          <div class="col-4">
            <input type="text" v-model="userData.contact_number" class="form-control">
          </div>
        </div>
      </div>

      <div class="form-group">
        <div class="row align-items-center">
          <div class="col-2">

          </div>

          <div class="col-4">
            <button class="btn btn-primary" type="submit">Add Resident</button>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import {bus} from '../../main'
import {mapActions, mapGetters} from 'vuex'

export default {
  name: 'AddResident',
  data: () => {
    return{
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
      }
    }
  },
  async created(){

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
        this.userData = {
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
        }

        await this.fetchUser({user_id: response.user_id})

        this.$router.push('/residents/resident/'+this.user.user_id);
      } else {
          response.dismissCountDown = 10;

          bus.$emit('alert_push', response);
      }
    },
  }
}
</script>

<style scoped>

</style>
