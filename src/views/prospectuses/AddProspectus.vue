<template>
  <div>
    <form @submit.prevent="addProspectus()">
      <div class="form-group">
        <div class="row align-items-center">
          <div class="col-2">
            <label>Prospectus Course</label>		
          </div>

          <div class="col-6">
            <select v-model="prospectusData.course_id" class="form-control" required>
              <option v-for="course in courses" v-bind:key="course.course_id" :value="course.course_id">{{course.course_name}}</option>
            </select>	
          </div>
        </div>
      </div>

      <div class="form-group">
        <div class="row align-items-center">
          <div class="col-2">
            <label>Prospectus Name</label>		
          </div>

          <div class="col-4">
            <input type="text" v-model="prospectusData.prospectus_name" class="form-control" required>
          </div>
        </div>
      </div>

      <div class="form-group">
        <div class="row align-items-center">
          <div class="col-2">
            <label>Prospectus Status</label>		
          </div>

          <div class="col-6">
            <select v-model="prospectusData.prospectus_status" class="form-control" required>
              <option value="New">New</option>
              <option value="Old">Old</option>
            </select>	
          </div>
        </div>
      </div>

      <div class="form-group">
        <div class="row align-items-center">
          <div class="col-2">

          </div>

          <div class="col-8">
            <button class="btn btn-primary mr-3" type="submit">Confirm Adding</button>
            <button class="btn btn-secondary" type="button" @click="primaryModal = false">Close</button>
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
  name: 'AddProspectus',
  data: () => {
    return{
      alert: {
        type: '',
        result: '',
        message: '',
        dismissCountDown: 0
      },
      prospectusData: {
        prospectus_name: '',
        course_id: '',
        prospectus_status: '',
        is_used: 1,
        date_added: new Date()
      },
      courses: []
    }
  },
  async created(){
    school_api.get_courses().then(res => this.courses = res);
  },
  methods: {
    addProspectus(){
        school_api.add_prospectus(this.prospectusData).then(res => {
          this.alert.type = res.type
          this.alert.result = res.result
          this.alert.message = res.message
          this.alert.dismissCountDown = 15
          bus.$emit('alert_push', this.alert)

          if(this.alert.result == 'Success'){
              this.prospectusData.prospectus_name = ''
              this.prospectusData.course_id= 0
              this.prospectusData.prospectus_status= ''
              this.prospectusData.is_used = 0
          }
        });
    },
  }
}
</script>

<style scoped>

</style>
