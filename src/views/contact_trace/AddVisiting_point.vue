<template>
  <div class="mt-4 container-fluid">
    <form @submit.prevent="addVisitingPoint()">

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
            <label>Visiting Point Name</label>		
          </div>

          <div class="col-6">
            <input type="text" v-model="visiting_pointData.visiting_point_name" class="form-control" required>
          </div>
        </div>
      </div>

      <div class="form-group">
        <div class="row align-items-center">
          <div class="col-2">
            <label>Address</label>		
          </div>

          <div class="col-6">
            <input type="text" v-model="visiting_pointData.visiting_point_address" class="form-control" required>
          </div>
        </div>
      </div>

      <div class="form-group">
        <div class="row align-items-center">
          <div class="col-2">
            <label>Type</label>		
          </div>

          <div class="col-6">
            <select v-model="visiting_pointData.visiting_point_type" class="form-control" required>
                <option value=""></option>
                <option value="Establishment">Establishment</option>  
                <option value="Transportation">Transportation</option> 
                <option value="Transportation">Government Agency</option> 
              </select>	
          </div>
        </div>
      </div>

      <div v-if="visiting_pointData.visiting_point_type == 'Transportation'" class="form-group">
        <div class="row align-items-center">
          <div class="col-2">
            <label>Plate Number</label>		
          </div>

          <div class="col-6">
            <input type="text" v-model="visiting_pointData.plate_number" class="form-control" required>
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
  name: 'AddVisiting_point',
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
      visiting_pointData: {
        visiting_point_name: '',
        visiting_point_address: '',
        visiting_point_type: '',
        plate_number: ''
      }
    }
  },
  async created(){

  },
  computed: {
    ...mapGetters([])
  },
  methods: {
    ...mapActions(['submitVisitingPoint']),
    async addVisitingPoint(){
      let response = await this.submitVisitingPoint({
        userData : this.userData,
        visiting_pointData : this.visiting_pointData
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

        this.visiting_pointData = {
          visiting_point_name: '',
          visiting_point_address: '',
          visiting_point_type: '',
          plate_number: ''
        }

        

        this.$router.push('/visiting_points/visiting_point/'+response.visiting_point_id);
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
