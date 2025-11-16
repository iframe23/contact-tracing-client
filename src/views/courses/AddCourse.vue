<template>
  <div>
    <form @submit.prevent="addCourse()">
      <div class="form-group">
        <div class="row align-items-center">
          <div class="col-2">
            <label>Course Name</label>		
          </div>

          <div class="col-4">
            <input type="text" v-model="courseData.course_name" class="form-control" required>
          </div>
        </div>
      </div>

      <div class="form-group">
        <div class="row align-items-center">
          <div class="col-2">
            <label>Course Abbreviation</label>		
          </div>

          <div class="col-6">
            <input type="text" v-model="courseData.course_abb" class="form-control" required>
          </div>
        </div>
      </div>

        <div class="form-group">
        <div class="row align-items-center">
          <div class="col-2">
            <label>Course Duration</label>		
          </div>

          <div class="col-6">
              <select v-model="courseData.duration" class="form-control" required>
              <option value="1 years">1 years</option>
              <option value="2 years">2 years</option>
              <option value="3 years">3 years</option>
              <option value="4 years">4 years</option>
              <option value="5 years">5 years</option>
            </select>	
          </div>
        </div>
      </div>

      <div class="form-group">
        <div class="row align-items-center">
          <div class="col-2">
            <label>Course Description</label>		
          </div>

          <div class="col-6">
            <textarea v-model="courseData.course_description" cols="30" rows="5" class="form-control" required></textarea>
          </div>
        </div>
      </div>

        <div class="form-group">
        <div class="row align-items-center">
          <div class="col-2">
            <label>Department</label>		
          </div>

          <div class="col-6">
            <select v-model="courseData.department_id" class="form-control" required>
              <option v-for="department in departments" v-bind:key="department.department_id" :value="department.department_id">{{department.department_name}}</option>
            </select>	
          </div>
        </div>
      </div>

      <div class="form-group">
        <div class="row align-items-center">
          <div class="col-2">

          </div>

          <div class="col-8">
            <button class="btn btn-primary mr-3" type="submit">Add Course</button>
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
  name: 'AddCourse',
  data: () => {
    return{
      alert: {
        type: '',
        result: '',
        message: '',
        dismissCountDown: 0
      },
      courseData: {
        course_name: '',
        course_abb: '',
        course_description: '',
        duration: '',
        department_id: 0
      },
      departments: []
    }
  },
  async created(){
    school_api.get_departments().then(res => this.departments = res);
  },
  methods: {
    addCourse(){
        school_api.add_course(this.courseData).then(res => {
          this.alert.type = res.type
          this.alert.result = res.result
          this.alert.message = res.message
          this.alert.dismissCountDown = 15
          bus.$emit('alert_push', this.alert)

          if(this.alert.result == 'Success'){
              this.courseData.course_name = ''
              this.courseData.course_abb= ''
              this.courseData.course_description= ''
              this.coursedata.duration = ''
              this.courseData.department_id = 0
          }
        });
    },
  }
}
</script>

<style scoped>

</style>
