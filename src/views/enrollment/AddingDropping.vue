<template>
  <div class="thead-primary table-sm">
    <h5 class="">Adding / Dropping - <span class="text-primary">{{accountSM.firstname+' '+accountSM.lastname}}</span></h5><hr> 
    <b-button-toolbar class="d-flex align-items-center" aria-label="Toolbar with button groups and dropdown menu">
        <b-button-group class="mx-1 d-flex align-items-center">
         <strong> Course </strong> : {{accountSM.course_abb}} <span class="mr-4 ml-4">|</span> 
          <strong> Year Level </strong> : {{accountSM.year_level_name}} <span class="mr-4 ml-4">|</span> 
          <strong> Status </strong> : {{accountSM.status}} <span class="mr-4 ml-4">|</span> 
          <button @click="openSubjectAddingModal()" class="btn btn-sm btn-primary"><span class="fa fa-plus"></span> Add subjects</button>
        </b-button-group>
      </b-button-toolbar><hr>

      <h5 class="text-primary text-center">Enrolled Subjects</h5>
      <table class="table-responsive{-sm|-md|-lg|-xl} table table-hover table-striped">
        <thead>
            <tr>
                <th>#</th>
                <th>Subject Code</th>
                <th>Descriptive Title</th>
                <th>Units</th>
                <th>Lec Units</th>
                <th>Lab Units</th>
                <th>Instructor</th>
                <th>Room</th>
                <th>Days</th>
                <th>Time</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(sub, index) in accountSM.enrolledSubjects" :key="sub.enrolled_subject_id">
                <td><strong>{{index+1}}.</strong> </td>
                <td>{{sub.subject_code}}</td>
                <td class="width-3">{{sub.descriptive_title}}</td>
                <td>{{sub.units}}</td>
                <td>{{sub.lec_units}}</td>
                <td>{{sub.lab_units}}</td>
                <td class="width-4">{{sub.firstname+' '+sub.lastname}}</td>
                <td>{{sub.room_name}}</td>
                <td>
                  <div v-for="time in sub.time_scheds" :key="time.time_sched_id">{{time.day_abb}}</div>
                </td>
                <td>
                  <div class="width-4" v-for="time in sub.time_scheds" :key="time.time_sched_id">
                      {{"July 21, 1983 "+time.time_start | moment("h:mm: a")}} - {{"July 21, 1983 "+time.time_end | moment("h:mm: a")}}
                  </div>
                </td>
                <td><button @click="drop(sub.enrolled_subject_id)" class="btn btn-sm btn-danger">Drop</button></td>
            </tr>
        </tbody>
      </table>



    <b-modal
      :title="'Subject Adding'+courseSched.sched_name"
      variant="primary"
      header-bg-variant="primary"
      content-class="border-primary"
      size="xl"
      v-model="subjectAddingModal" 
      @ok="subjectAddingModal = false"
      :hide-footer= true
    >
      <div class="thead-primary table-sm">
        <div class="thead-primary">
        <v-client-table 
        :data="subjectScheds"
        :columns="columns2" 
        :options="options2">

          <div class="width-3" slot="descriptive_title" slot-scope="props" > 
            <span>{{props.row.descriptive_title}}</span>
          </div>


          <div class="td-pad-2 width-2" slot="instructor" slot-scope="props" > 
            <span>{{props.row.firstname+' '+props.row.lastname}}</span>	 
          </div>

          <div class="td-pad-2" slot="days" slot-scope="props" > 
            <div v-for="(day, index) in props.row.time_scheds" :key="index"><span>{{day.day_abb}}</span></div>
          </div>

          <div class="td-pad-2 width-4" slot="time" slot-scope="props" > 
            <div v-for="(time, index) in props.row.time_scheds" :key="index"><span>{{"July 21, 1983 "+time.time_start | moment("h:mm: a")}} - {{"July 21, 1983 "+time.time_end | moment("h:mm: a")}}</span></div>
          </div>

          <div class="td-pad-2 width-1" slot="add" slot-scope="props" > 
            <button v-if="props.row.type == true" @click="remove(props.row.subject_id)"  class="action-btn btn btn-danger mr-2"><span class="fa fa-remove"></span></button>
            <button v-else @click="add(props.row)" class="btn-sm btn btn-success mr-2"><span class="fa fa-plus"></span>Add</button>
          </div>

            <!-- <a slot="actions" slot-scope="props" class="fa fa-edit" v-on:click="edit(props.index)"></a> -->
          </v-client-table>
        </div><hr>
      </div>
    </b-modal>
  </div>
</template>

<script>
import {user_api, school_api} from '../../shared/api'
import {bus} from '../../main'
import {mapActions, mapGetters} from 'vuex'
import axios from 'axios'

export default {
  name: 'Users',
  data: () => {
    return{
      columns2: ['subject_code', 'descriptive_title', 'year_level_name', 'sem_name', 'type', 'lec_units', 'lab_units', 'units', 'instructor' , 'days', 'time', 'add'],
      options2: {
          headings: {
            year_level_name: 'Year',
            sem_name: 'Sem'
          },
          filterable: true
      },
      subjectAddingModal: false,
      except: [],
      enrolledUnits:0
    }
  },
  computed: {
    ...mapGetters(['currentSY','currentSem','enrollees', 'loggedUser','student', 'accountSM','courseSched','subjectScheds'])
  },
  methods: {
    ...mapActions(['fetchEnrollees','fetchStudent', 'fetchAccountSM', 'fetchCourseSchedule','fetchSubjectCredential',]),
    async openSubjectAddingModal(){
      this.enrolledUnits = 0;
      this.getExcept();

      await this.fetchCourseSchedule(
        {
          where: {
            course_id: this.accountSM.course_id,
            sem_id : this.currentSem.sem_id,
            school_year : this.currentSY
          },
          except: this.except
        }
      )

      this.accountSM.enrolledSubjects.forEach(el => {
        this.enrolledUnits = this.enrolledUnits + parseInt(el.units)
      });

      this.subjectAddingModal = true;
    },
    getExcept(){
      this.accountSM.enrolledSubjects.forEach(el => {
        this.except.push({'subject_sched_id !=': el.subject_sched_id});
      });
    },
    async drop(subj_id){
      let where = {
        enrolled_subject_id : subj_id
      }

      let response = await axios.post(this.$api_url+'curriculum/drop', where);

      if(response.data.result == "Success"){
        await this.fetchAccountSM({student_id: this.$route.params.student_id})
        response.data.dismissCountDown = 10;

        bus.$emit('alert_push', response.data);
      }
    },
    async add(sub){
      let mockdate = '2010-10-19 ';
      let added = 0;
      let conflict = 0;
      let credential = await this.fetchSubjectCredential({
        'transcripts.student_id': this.accountSM.user_id,
        'credentials.subject_id': sub.subject_id
      });

      for (let i = 0; i < this.accountSM.enrolledSubjects.length; i++) {
        if(this.accountSM.enrolledSubjects.length != 0){
          if(this.accountSM.enrolledSubjects[i].subject_id == sub.subject_id){
            added++;
          }

          this.accountSM.enrolledSubjects[i].time_scheds.forEach(i => {
            sub.time_scheds.forEach(i2 => {
              if(i.day_abb == i2.day_abb && (
                this.$moment(mockdate+i.time_start).isBetween(mockdate+i2.time_start, mockdate+i2.time_end) ||
                this.$moment(mockdate+i.time_end).isBetween(mockdate+i2.time_start, mockdate+i2.time_end) ||
                this.$moment(mockdate+i2.time_start).isBetween(mockdate+i.time_start, mockdate+i.time_end) ||
                this.$moment(mockdate+i2.time_end).isBetween(mockdate+i.time_start, mockdate+i.time_end)
              )){
                conflict++;
              }
            })
          });
          
        }
      }

      if(credential.equivalent_grade != 0){
        let alert = {
          result: 'Already Credited',
          type: 'danger',
          message: 'Select subject has already have a grade. It is possible that the student have already taken this subject previously, or have been already credited!',
          dismissCountDown: 15
        }

        bus.$emit('alert_push', alert)
      } else if(added != 0){
        let alert = {
          result: 'Already Added',
          type: 'danger',
          message: 'You already added the selected subject in the Trial Form!',
          dismissCountDown: 15
        }

        bus.$emit('alert_push', alert)
      } else if (conflict != 0){
        let alert = {
          result: 'Subject Conflict',
          type: 'danger',
          message: 'This Subject has a conflict on the Enrolled Subjects in the Trial Form!',
          dismissCountDown: 15
        }

        bus.$emit('alert_push', alert)
      } else if (this.enrolledUnits + parseInt(sub.units) > 30){
        let alert = {
          result: 'Cannot Exceed More than 30 units',
          type: 'danger',
          message: 'Units acquired for enrollment cannot exceed above 30!',
          dismissCountDown: 15
        }

        bus.$emit('alert_push', alert)
      }  
      else {
        let data = {
          account_sm_id : this.accountSM.account_sm_id,
          subject_id: sub.subject_id,
          school_year: this.accountSM.school_year,
          sem_id: this.accountSM.sem_id,
          subject_sched_id: sub.subject_sched_id
        }

        let response = await axios.post(this.$api_url+'curriculum/add', data);

        if(response.data.result == "Success"){
          await this.fetchAccountSM({student_id: this.$route.params.student_id})

          this.getExcept();

          await this.fetchCourseSchedule(
            {
              where: {
                course_id: this.accountSM.course_id,
                sem_id : this.currentSem.sem_id,
                school_year : this.currentSY
              },
              except: this.except
            }
          )

          response.data.dismissCountDown = 10;
          
          bus.$emit('alert_push', response.data);
          this.enrolledUnits = this.enrolledUnits + parseInt(sub.units);
        }
      }  
    }
  },
  async mounted() {
    await this.fetchAccountSM({student_id: this.$route.params.student_id})
  }
}
</script>

<style>
  #app {
    width: 95%;
    margin-top: 50px; 
  }

  .VuePagination {
    text-align: center;
  }

  .vue-title {
    text-align: center;
    margin-bottom: 10px;
  }

  .vue-pagination-ad {
    text-align: center;
  }

  .glyphicon.glyphicon-eye-open {
    width: 16px;
    display: block;
    margin: 0 auto;
  }

  th:nth-child(3) {
    text-align: center;
  }

  .VueTables__child-row-toggler {
    width: 16px;
    height: 16px;
    line-height: 16px;
    display: block;
    margin: auto;
    text-align: center;
  }

  .VueTables__child-row-toggler--closed::before {
    content: "+";
  }

  .VueTables__child-row-toggler--open::before {
    content: "-";
  }

  .VueTables__table{
    background-color: #fff;
  }
</style>

<style>
  .form-inline label{
    display: inline;
    margin: 0 10px 0 0;
  }

  .action-btn{
    padding: 1px 6px;
  }
</style>
