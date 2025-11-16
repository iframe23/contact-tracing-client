<template>
  <div>
    <form @submit.prevent="addRoom()">

      <div class="form-group">
        <div class="row align-items-center">
          <div class="col-2">
            <label>Room Name</label>		
          </div>

          <div class="col-6">
            <input type="text" v-model="roomData.room_name" class="form-control" required>
          </div>
        </div>
      </div>

      <div class="form-group">
        <div class="row align-items-center">
          <div class="col-2">
            <label>Room Image</label>		
          </div>

          <div class="col-6">
            <input type="text" v-model="roomData.room_pic" class="form-control" required>
          </div>
        </div>
      </div>

      <div class="form-group">
        <div class="row align-items-center">
          <div class="col-2">

          </div>

          <div class="col-4">
            <button class="btn btn-primary" type="submit">Add Room</button>
          </div>
        </div>
      </div>
    </form>
    
  </div>
</template>

<script>
import {user_api, school_api} from '../../shared/api'
import {bus} from '../../main'

export default {
  name: 'AddRoom',
  data: () => {
    return{
      alert: {
        type: '',
        heading: '',
        message: '',
        dismissCountDown: 0
      },
      roomData: {
        room_name: '',
        room_pic: '',
      }
    }
  },
  async created(){
    //user_api.get_roles().then(res => this.roles = res);
  },
  methods: {
    addRoom(){
        school_api.add_room(this.roomData).then(res => {
          this.alert.type = res.type
          this.alert.result = res.result
          this.alert.message = res.message
          this.alert.dismissCountDown = 10
          bus.$emit('alert_push', this.alert)

          if(this.alert.result == 'Success'){
              this.roomData.room_name = ''
              this.roomData.room_pic= ''
          }
        });
    },
  }
}
</script>

<style scoped>

</style>
