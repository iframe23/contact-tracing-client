<template>
  <div class="mt-4 container-fluid">
    <form @submit.prevent="addEstablishment()">

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
            <label>Establishment Name</label>		
          </div>

          <div class="col-6">
            <input type="text" v-model="establishmentData.establishment_name" class="form-control" required>
          </div>
        </div>
      </div>

      <div class="form-group">
        <div class="row align-items-center">
          <div class="col-2">
            <label>Address</label>		
          </div>

          <div class="col-6">
            <input type="text" v-model="establishmentData.address" class="form-control" required>
          </div>
        </div>
      </div>

      <div class="form-group">
        <div class="row align-items-center">
          <div class="col-2">
            <label>Email</label>		
          </div>

          <div class="col-6">
            <input type="email" v-model="userData.email" class="form-control" required>
          </div>
        </div>
      </div>

      <div class="form-group">
        <div class="row align-items-center">
          <div class="col-2">
            <label>Contact Number</label>		
          </div>

          <div class="col-6">
            <input type="text" v-model="userData.contact_number" class="form-control" required>
          </div>
        </div>
      </div>

      <div class="form-group">
        <div class="row align-items-center">
          <div class="col-2">

          </div>

          <div class="col-4">
            <button class="btn btn-primary" type="submit">Add Establishment</button>
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
        role_id : 3,
        username: '',
        password: '',
        email: '',
        contact_number: '',
      },
      establishmentData: {
        establishment_name: '',
        address: ''
      }
    }
  },
  async created(){

  },
  computed: {
    ...mapGetters([])
  },
  methods: {
    ...mapActions(['submitEstablishment', 'fetchEstablishment']),
    async addEstablishment(){
      let response = await this.submitEstablishment({
        userData : this.userData,
        establishmentData : this.establishmentData
      });

      if(response.result == "Success"){
        response.dismissCountDown = 10;

        bus.$emit('alert_push', response);
        this.userData = {
          role_id : 3,
          username: '',
          password: '',
          email: '',
          contact_number: '',
        }

        this.establishmentData = {
          establishment_name: '',
          address: ''
        }

        await this.fetchUser({user_id: response.user_id})

        this.$router.push('/establishments/establishment/'+this.user.user_id);
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
