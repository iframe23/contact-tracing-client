<template>
  <div class="mt-4 container-fluid">
    <form @submit.prevent="addVisitingPoint()">

      <div class="row">
        <div class="form-group col-6">
          <div class="align-items-center">
            <div class="">
              <label>Username</label>		
              <input type="text" v-model="userData.username" class="form-control" required>
            </div>
          </div>
        </div>

        <div class="form-group col-6">
          <div class="align-items-center">
            <div class="">
              <label>Password</label>
              <input type="password" v-model="userData.password" class="form-control" required>
            </div>
          </div>
        </div>

        <div class="form-group col-6">
          <div class="align-items-center">
            <div class="">
              <label>Visiting Point Name</label>
              <input type="text" v-model="visiting_pointData.visiting_point_name" class="form-control" required>
            </div>
          </div>
        </div>

        <div class="form-group col-6">
          <div class="align-items-center">
            <div class="">
              <label>Address</label>
              <input type="text" v-model="visiting_pointData.visiting_point_address" class="form-control" required>
            </div>
          </div>
        </div>

        <div class="form-group col-6">
          <div class="align-items-center">
            <div class="">
              <label>Type</label>
              <select v-model="visiting_pointData.visiting_point_type" class="form-control" required>
                  <option value=""></option>
                  <option value="Public Establishment">Public Establishment</option>  
                  <option value="Private Establishment">Private Establishment</option>  
                  <option value="School">School</option>
                  <option value="Landmark">Landmark</option>  
                  <option value="Transportation">Transportation</option> 
                  <option value="Government Agency">Government Agency</option> 
                </select>	
            </div>
          </div>
        </div>

        <div v-if="visiting_pointData.visiting_point_type == 'Transportation'" class="form-group col-6">
          <div class="align-items-center">
            <div class="">
              <label>Plate Number</label>
              <input type="text" v-model="visiting_pointData.plate_number" class="form-control" required>
            </div>
          </div>
        </div>

        <div class="form-group col-6">
          <div class="align-items-center">
            <div class="">
              <label>Email</label>
              <input type="email" v-model="userData.email" class="form-control" required>
            </div>
          </div>
        </div>

        <div class="form-group col-6">
          <div class="align-items-center">
            <div class="">
              <label>Contact Number</label>
              <input type="text" v-model="userData.contact_number" class="form-control" required>
            </div>
          </div>
        </div>

        <div class="form-group col-6">
          <div class="align-items-center row">
            <div class="col-6">
              <label>GPS Marker (Latitude)</label>
              <input placeholder="Latitude" type="text" v-model="visiting_pointData.latitude" class="form-control" required>
            </div>
            <div class="col-6">
              <label>GPS Marker (Longitude)</label>
              <input type="text" v-model="visiting_pointData.longitude" class="form-control" required>
            </div>
          </div>
        </div>
      </div>
      

      <div class="form-group">
        <div class="align-items-center">
          <div class="">
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
        plate_number: '',
        latitude: '',
        longitude: ''
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
          plate_number: '',
          latitude: '',
          longitude: ''
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
