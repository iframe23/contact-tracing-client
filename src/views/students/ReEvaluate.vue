<template>
  <div class="thead-primary table-sm bg-white p-3">
    <form class="form-inline" @submit.prevent="updateTranscriptStatus()">
      
      <div class="input-group mb-2 mr-sm-2 mb-sm-0 d-flex align-items-center">
        <span>Status : </span>
        <select v-model="transcript.transcript_status" name="" class="form-control form-control-sm ml-2" id="">
          <option value="Undergraduate">Undergraduate</option>
          <option value="Graduated">Graduated</option>
        </select>
        <span class="ml-2">S.O. Number : </span>
        <input type="text" class="form-control form-control-sm ml-2" v-model="transcript.so_number">
        <button class="btn btn-primary btn-sm ml-2" type="submit">Update Status</button>
      </div>
    </form><hr>

     <v-client-table 
        :data="transcript.credentials"
        :columns="columns" 
        :options="options">

        <div class="width-1" slot="grade" slot-scope="props" > 
          <form class="form-inline">
            <div class="input-group mb-2 mr-sm-2 mb-sm-0">
              <input type="text" class="form-control form-control-sm" v-model="props.row.equivalent_grade">
            </div>
          </form>
        </div>

        <span slot="actions" slot-scope="props" > 
            <button @click="updateCredential(props.row)" class="btn btn-primary btn-sm">Submit</button>
        </span>
        <!-- <a slot="actions" slot-scope="props" class="fa fa-edit" v-on:click="edit(props.index)"></a> -->
    </v-client-table>
  </div>
</template>

<script>
import {school_api, user_api} from '../../shared/api'
import {bus} from '../../main'
import {mapActions, mapGetters} from 'vuex'
import axios from 'axios'

export default {
  name: 'ReEvaluate',
  props: {
    transcript: Object
  },
  data: () => {
    return{
      columns: ['subject_code', 'descriptive_title', 'year_level_name', 'sem_name', 'lab_units', 'lec_units', 'units', 'hours_week', 'grade', 'actions'],
        options: {
            filterable: true,
            perPage: 10,
            perPageValues: [10,25,50,100]
        },
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
    async updateTranscriptStatus(){
      let response = await axios.post(this.$api_url+'curriculum/update_transcript_status', this.transcript);

      if(response.data.result = "Success"){
        response.data.dismissCountDown = 10;
        bus.$emit('alert_push', response.data)
      }
    },
    async updateCredential(data){
      let response = await axios.post(this.$api_url+'curriculum/update_credential', data);

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
