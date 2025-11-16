<template>
  <div class="thead-primary table-sm">
    <div class="mb-5" >
      <form @submit.prevent="submitEditStudent()">
        <div class="form-group">
          <div class="row align-items-center">
            <div class="col-4">
              <label>First Name</label>
              <input type="text" v-model="studentData.firstname" class="form-control form-control-sm" required>	
            </div>

            <div class="col-4">
              <label>Middlename</label>
              <input type="text" v-model="studentData.middlename" class="form-control form-control-sm" required>		
            </div>

            <div class="col-4">
              <label>Last Name</label>
              <input type="text" v-model="studentData.lastname" class="form-control form-control-sm" required>		
            </div>
          </div>
        </div>

        <div class="form-group">
          <div class="row align-items-center">
            <div class="col-4">
              <label>Gender</label>
              <select v-model="studentData.gender" class="form-control form-control-sm" required>
                <option value=""></option>
                <option value="Female">Female</option>  
                <option value="Male">Male</option> 
              </select>	
            </div>

            <div class="col-8">
              <label>Address</label>
              <input type="text" v-model="studentData.address" class="form-control form-control-sm" required>		
            </div>
          </div>
        </div><hr>

        <div class="form-group">
          <div class="row align-items-center">
            <div class="col-4">
              <label>Birthdate</label>		
              <input type="date" v-model="studentData.birthdate" class="form-control form-control-sm" required>
            </div>

            <div class="col-4">
              <label>Contact Number</label>		
              <input type="tel" v-model="studentData.contact_number" class="form-control form-control-sm" required>
            </div>

            <div class="col-4">
              <label>Email Address</label>		
              <input type="email" v-model="studentData.email" class="form-control form-control-sm" required>
            </div>
          </div>
        </div><hr>
        <h5>Educational Attainment</h5><hr>

        <div class="form-group">
          <div class="row align-items-center">
            <div class="col-4">
              <label>Primary School</label>		
              <input type="text" v-model="studentData.primary_school" class="form-control form-control-sm" required>
            </div>

            <div class="col-4">
              <label>Intermediate School</label>		
              <input type="text" v-model="studentData.intermediate_school" class="form-control form-control-sm" required>
            </div>

            <div class="col-4">
              <label>Secondary School</label>		
              <input type="text" v-model="studentData.secondary_school" class="form-control form-control-sm" required>
            </div>
          </div>
        </div><hr>

        <div class="form-group">
          <div class="row align-items-center">
            <div class="col-4">
              <label>Is Transferee?</label>
              <select v-model="studentData.transferee" class="form-control form-control-sm" required>
                <option value="Not Transferee">Not Transferee</option>
                <option value="Transferee">Transferee</option>
              </select>
            </div>

            <div class="col-8">
              <div v-if="studentData.transferee == 'Transferee'">
                <label>School Transferred From</label>		
                <input type="text" v-model="studentData.transferred_from" class="form-control form-control-sm" required>
              </div>
            </div>
          </div>
        </div><hr>

        <button class="btn btn-primary" type="submit">Confirm Editing</button>
      </form>
    </div>
    
  </div>
</template>

<script>
import {school_api, user_api} from '../../shared/api'
import {bus} from '../../main'
import {mapActions, mapGetters} from 'vuex'
import axios from 'axios'

export default {
  name: 'EditStudent',
  props: {
    studentData: Object
  },
  data: () => {
    return{
      primaryModal: false,
      alert: {
        type: '',
        result: '',
        message: '',
        dismissCountDown: 0
      },
 
    }
  },
  methods: {
    ...mapActions(['fetchStudents', 'fetchCourses']),
    async getStudentsByCourse(){
      await this.fetchStudents({role_id:6, 'courses.course_id':this.selectedCourse});
    },
    async submitEditStudent(){
      let data = {
        user_id : this.studentData.user_id,
        firstname : this.studentData.firstname,
        middlename : this.studentData.middlename,
        lastname : this.studentData.lastname,
        gender : this.studentData.gender,
        address : this.studentData.address,
        birthdate : this.studentData.birthdate,
        contact_number: this.studentData.contact_number,
        email: this.studentData.email,
        primary_school : this.studentData.primary_school,
        intermediate_school: this.studentData.intermediate_school,
        secondary_school : this.studentData.secondary_school,
        transferee : this.studentData.transferee,
        transferred_from : this.studentData.transferred_from
      }

      let response = await axios.post(this.$api_url+'user/edit_student', data);

      if(response.data.result = "Success"){
        response.data.dismissCountDown = 10;
        bus.$emit('alert_push', response.data)
      }
    }
  },
  computed: {
    ...mapGetters(['students','courses'])
  },
  async created() {

  }
}
</script>

<style>
  .form-inline label{
    display: inline;
    margin: 0 10px 0 0;
  }

  .action-btn{
    padding: 1px 6px;
  }
</style>
