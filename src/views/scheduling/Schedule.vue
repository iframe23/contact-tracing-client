<template>
  <div class="thead-primary table-sm">
    <h4 class="">
      {{courseSched.course}}
      <span>Course Schedule for Current Sem - </span>
      {{courseSched.semester+' - SY '+courseSched.school_year}}
    </h4><hr>
    <div>
      <b-button-toolbar class="d-flex align-items-center" aria-label="Toolbar with button groups and dropdown menu">
        <b-button-group class="mx-1">
          Course: {{courseSched.course}} <span class="mr-4 ml-4">|</span> Status: {{courseSched.status}} <span class="mr-4 ml-4">|</span>
        </b-button-group>
        <b-button-group class="mx-1">
          <button @click="initialize_subjects()" class="btn btn-primary btn-sm"><span class="fa fa-download"></span> Initialize Subjects</button> <span class="mr-4 ml-4">|</span>
        </b-button-group>
        <b-button-group class="mx-1">
          <div v-if="courseSched.status != 'Finalized'">
            <button @click="finalize()" class="btn btn-primary btn-sm text-white"> <span class="fa fa-file-import"></span> Finalize</button>
          </div>
          <div v-else>
            <button @click="resetDraft()" class="btn btn-warning btn-sm"><span class="fa fa-sync-alt"></span> Reset to Draft</button>
            
          </div>
          <span class="mr-4 ml-4">|</span>
        </b-button-group>
        <b-button-group class="mx-1">
          <button @click="scheduleModal = true" class="btn btn-primary btn-sm"><span class="fa fa-print"></span> Print</button>
        </b-button-group>
      </b-button-toolbar>
    </div> <hr>

    <v-client-table 
        :data="subjectScheds"
        :columns="columns" 
        :options="options"
        :name="name"
        @filter="sample()"
        >

        <div class="width-3" slot="descriptive_title" slot-scope="props" > 
           <span>{{props.row.descriptive_title}}</span>
        </div>

        <div class="width-2" slot="merging" slot-scope="props" > 
           <button v-if="props.row.merge_code == ''" @click="merging(props.index-1)" class="btn btn-primary btn-sm">Not Merged</button>
           <button v-else @click="merging(props.index-1)" class="btn btn-warning btn-sm">Merged</button>
        </div>

        <div class="td-pad-2 width-2" slot="instructor" slot-scope="props" > 
          <select v-model="props.row.teacher_id" class="form-control form-control-sm" required>
            <option value="0">Unassigned</option>
            <option v-for="teacher in props.row.assigned_teachers" v-bind:key="teacher.user_id" :value="teacher.user_id">{{teacher.firstname+' '+teacher.lastname}}</option>
          </select>	 
        </div>

        <div class="td-pad-2 width-2" slot="room" slot-scope="props"> 
          <select v-model="props.row.room_id" class="form-control form-control-sm" required>
            <option value="0">Unassigned</option>
            <option v-for="room in rooms" v-bind:key="room.room_id" :value="room.room_id">{{room.room_name}}</option>
          </select>	 
        </div>

        <div class="td-pad-2 width-1" slot="days" slot-scope="props" > 
          <select v-for="(time_sched, ind) in props.row.time_scheds" v-bind:key="ind"  class="form-control form-control-sm" v-model="props.row.time_scheds[ind].day_abb" required>
            <option value="">Select</option>
            <option value="Mon">Mon</option>
            <option value="Tue">Tue</option>
            <option value="Wed">Wed</option>
            <option value="Thu">Thu</option>
            <option value="Fri">Fri</option>
            <option value="Sat">Sat</option>
            <option value="Sun">Sun</option>
          </select>	
        </div>

        <div class="td-pad-2" slot="time_start" slot-scope="props" > 
          <input type="time" v-for="(time_sched, ind) in props.row.time_scheds" v-bind:key="ind" v-model="props.row.time_scheds[ind].time_start" class="form-control form-control-sm" required>
        </div>

        <div class="td-pad-2" slot="time_end" slot-scope="props" > 
          <input type="time" v-for="(time_sched, ind) in props.row.time_scheds" v-bind:key="ind" v-model="props.row.time_scheds[ind].time_end" class="form-control form-control-sm" required>
        </div>

        <div class="width-2" slot="actions" slot-scope="props" > 
          <button :disabled="courseSched.status == 'Finalized'" @click="removeTimeSched(props.row.subject_sched_id)" class="action-btn btn btn-danger m-1"><span class="fa fa-trash"></span></button>
          <button :disabled="courseSched.status == 'Finalized'" @click="addTimeSched(props.row.subject_sched_id)" class="action-btn btn btn-warning m-1"><span class="fa fa-plus"></span></button>
          <button :disabled="courseSched.status == 'Finalized'" @click="saveSched(props.row)" class="action-btn btn btn-primary m-1"><span class="fa fa-save"></span></button>
        </div>

    </v-client-table>


     <b-modal
      :title="courseSched.sched_name"
      header-bg-variant="primary"
      content-class="border-primary"
      size="xl"
      v-model="scheduleModal" 
      @ok="scheduleModal = false"
      :hide-footer= true
      variant="primary"
      body-bg-variant="secondary"
      >
          <div class="card">
              <embed class="pdf-viewer" :src="this.$api_url+'printable/print_schedule/'+courseSched.schedule_id" />
          </div>
      </b-modal>


    <b-modal
        title= 'Subject Sched Merging'
        variant="primary"
        header-bg-variant="primary"
        content-class="border-primary"
        size="xl"
        v-model="primaryModal" 
        @ok="primaryModal = false, for_merge.merged = false"
        :hide-footer= true
      >
        <div class="row">
          <div class="col-4">
            <div>
              <div class="mb-5">
                <h5 class="bg-info p-2 rounded">Selected Subject:</h5>
                <p>{{for_merge.selected_subject.subject_code+' - '+for_merge.selected_subject.descriptive_title+' - '+for_merge.selected_subject.course_abb}}</p>
              </div>
              <div>
                <h5 v-if="for_merge.merged" class="bg-info p-2 rounded">Merged Subjects:</h5>
                <h5 v-else class="bg-warning p-2 rounded">Subjects for Merging</h5>
                <p v-if="for_merge.other_subjects.length == 0">No Subjects Selected yet</p>
                <div v-else>
                  <div v-for="(sub, ind) in for_merge.other_subjects" :key="ind">
                    <p>
                      <button v-if="!for_merge.merged" @click="removeSelectedSubject(ind-1)" class="action-btn btn btn-danger m-1"><span class="fa fa-remove"></span></button>
                      <strong>{{ind+1}}.</strong> {{sub.subject_code+' - '+sub.descriptive_title+' - '+sub.course_abb}}
                    </p><hr>
                  </div>
                </div>
              </div>
              <div>
                <button :disabled="for_merge.other_subjects.length == 0 || courseSched.status == 'Finalized'" v-if="!for_merge.merged" @click="submitMerge()" class="mt-4 btn btn-primary">Merge Subjects</button>
                <button :disabled="courseSched.status == 'Finalized'" v-else class="mt-4 btn btn-warning" @click="submitUnmerge()">Unmerge Subjects</button>
              </div>
            </div>
          </div>
          <div class="col-8">
            <div >
              <div class="p-2 bg-secondary">
                <div class="form-group row">
                  <div class="col-8">
                    <select class="form-control" v-model="schedule_id2.id">
                      <option value="0">-Select Course Schedule</option>
                      <option v-for="(sched, index) in scheds" v-bind:key="index" :value="sched.schedule_id">{{sched.sched_name}}</option>
                    </select>
                  </div>
                  <div class="col-4">
                    <button @click="getCourseSchedSelection()" class="btn btn-primary">Load</button>
                  </div>
                </div>
                
                <div class="thead-primary table-sm">
                  <v-client-table 
                    :data="subjectSchedsSelection"
                    :columns="columns2" 
                    :options="options2">

                    <div slot="add" slot-scope="props" > 
                      <button :disabled="courseSched.status == 'Finalized'" @click="addToMerge(props.index-1)" class="action-btn btn btn-primary m-1"><span class="fa fa-plus"></span></button>
                    </div>
                  </v-client-table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </b-modal>
  </div>
</template>

<script>
import {mapActions,mapGetters} from 'vuex';
import {bus, api_url} from '../../main';
import axios from 'axios'

export default {
  name: 'User',
  data: () => {
    return {
      primaryModal: false,
      schedule_id: {id: 23},
      schedule_id2: {id: 0},
      role_id: {role_id: 5},
      scheduleModal : false,
      time_scheds: [],
      columns: ['subject_code', 'descriptive_title', 'year_level_abb', 'lec_units', 'lab_units', 'units', 'hours_week','merging', 'instructor','room', 'days','time_start', 'time_end', 'actions' ],
      options: {
          headings: {
              year_level_name: 'Year Level',
              hours_week: 'Hrs/ Week',
          },
          filterable: true,
          perPage: 5,
          perPageValues: [5,10,25,50,100]
      },
      name: 'subjectSchedsTable',
      columns2: ['subject_code', 'descriptive_title', 'course_abb', 'add' ],
      options2: {
          headings: {
              course_abb: 'Course',
          },
          filterable: true,
          perPage:7,
          perPageValues: [7,10,25,50,100]
      },
      alert: {
        type: '',
        result: '',
        message: '',
        dismissCountDown: 0
      },
      for_merge:{
        selected_subject: {},
        other_subjects: [],
        merged: false
      },
      
    }
  },
  methods: {
    ...mapActions(['loadCurrentScheds', 
    'fetchCourseSched', 'fetchCourseSchedSelection', 
    'fetchTeachers', 'fetchRooms', 'saveSubjectSched', 
    'deleteTimeSched', 'getOtherSubjects', 'merge', 'unmerge', 'fetchAssignedTeachers']),
    sample(){
      console.log(this.$refs.subjectSchedsTable )
    },
    goBack() {
      this.$router.go(-1)
      // this.$router.replace({path: '/users'})
    },
    addTimeSched(id){
      let index = this.subjectScheds.findIndex((element => element.subject_sched_id == id));
      console.log(this.subjectScheds[index])
      let toPush = {
        subject_sched_id: this.subjectScheds[index].subject_sched_id,
        day: '',
        day_abb: '',
        merge_code: "",
        time_start: 0,
        time_end: 0
      }
      this.subjectScheds[index].time_scheds.push(toPush);
    },
    async removeTimeSched(id){
      let index = this.subjectScheds.findIndex((element => element.subject_sched_id == id));
      let time_id = this.subjectScheds[index].time_scheds.length;

      if (time_id > 1){
        if(this.subjectScheds[index].time_scheds[time_id-1].time_sched_id){
          let time_sched_id = {
            id: this.subjectScheds[index].time_scheds[time_id-1].time_sched_id
          }
          let result = await this.deleteTimeSched(time_sched_id);
          if(result.result = "Success"){
            let alert2 = {
              type: result.type,
              result: result.result,
              message: result.message,
              dismissCountDown: 25,
            }
            await this.fetchCourseSched(this.schedule_id);
            console.log(result)
            bus.$emit('alert_push', alert2);
          } 
        } else {
          this.subjectScheds[index].time_scheds.pop();
        }
        
      }
    },
    async saveSched(row){
      let result = await this.saveSubjectSched(row);

      let alert2 = {
        type: result.type,
        result: result.result,
        message: result.message,
        dismissCountDown: 25,
        con_subjects: result.con_subjects
      }
      await this.fetchCourseSched(this.schedule_id);
      console.log(result)
      bus.$emit('alert_push', alert2);
    },
    async merging(index){
      this.for_merge.selected_subject = this.subjectScheds[index];
      this.for_merge.other_subjects = [];
      this.primaryModal = true;
      this.for_merge.merged = false;
      let response = await this.getOtherSubjects(this.for_merge.selected_subject);
      console.log(response);
      if (response.result != 'Failed'){
        this.for_merge.merged = true;
        this.for_merge.other_subjects = response.other_subjects;
      }
    },
    getCourseSchedSelection(index){
      this.fetchCourseSchedSelection(this.schedule_id2);
      console.log(this.subjectSchedsSelection);
    },
    addToMerge(ind){
      let existing = false;

      if(this.subjectSchedsSelection[ind].subject_sched_id == this.for_merge.selected_subject.subject_sched_id){
        existing = true;
      }

      for (let i = 0; i < this.for_merge.other_subjects.length; i++) {
        if(this.subjectSchedsSelection[ind].subject_sched_id == this.for_merge.other_subjects[i].subject_sched_id){
          existing = true;
        }
      }

      if(!existing){
        this.for_merge.other_subjects.push(this.subjectSchedsSelection[ind]);
      }
    },
    removeSelectedSubject(ind){
      this.for_merge.other_subjects.splice(ind, 1);
    },
    async submitMerge(){
      let response = await this.merge(this.for_merge);
      console.log(this.for_merge)
      if(response.result == 'Success'){
        response.dismissCountDown = 15;
        bus.$emit('alert_push', response);
        this.fetchCourseSched(this.schedule_id);
        this.primaryModal = false;
        this.for_merge.merged = false;
      }
    },
    async submitUnmerge(){
      let response = await this.unmerge(this.for_merge);

      if(response.result == 'Success'){
        response.dismissCountDown = 15;
        bus.$emit('alert_push', response);
        this.fetchCourseSched(this.schedule_id);
        this.primaryModal = false;
      }
    },
    async finalize(){
      let incomplete = false;

      for (let i = 0; i < this.subjectScheds.length; i++) {
        if(this.subjectScheds[i].teacher_id == 0 || this.subjectScheds[i].room_id == 0){
          incomplete = true;
          break;
        }
        
        for (let i2 = 0; i2 < this.subjectScheds[i].time_scheds.length; i2++) {
          if(this.subjectScheds[i].time_scheds[i2].day_abb == '' 
          || this.subjectScheds[i].time_scheds[i2].time_start == ''
          || this.subjectScheds[i].time_scheds[i2].time_end == ''){
            incomplete = true
            break;
          }
        }
      }

      if(incomplete == true){
         let alert = {
          type: 'danger',
          result: 'Failed',
          message: "There some subject schedules that are incomplete! and haven't been assigned corresponding time schedules",
          dismissCountDown: 25,
        }
        console.log(alert)
        bus.$emit('alert_push', alert);
      } else {
        let response = await this.$http.post(this.$api_url+'schedule/finalize', this.courseSched);

        if(response.data.result == 'Success'){
          response.data.dismissCountDown = 25;
          bus.$emit('alert_push', response.data);
          this.fetchCourseSched(this.schedule_id);
        }
      }
    },
    async resetDraft(){
      let response = await this.$http.post(this.$api_url+'schedule/reset_draft', this.courseSched);
      
      if(response.data.result == 'Success'){
        response.data.dismissCountDown = 25;
        bus.$emit('alert_push', response.data);
        this.fetchCourseSched(this.schedule_id);
      }
    },
    async initialize_subjects(){
      let response = await this.$http.post(this.$api_url+'schedule/initialize_subjects', this.courseSched);
      console.log(response);

      response.data.dismissCountDown = 25;
      bus.$emit('alert_push', response.data);
      this.fetchCourseSched(this.schedule_id);
    }
  },
  computed: {
    ...mapGetters(['courseSched','subjectScheds', 'teachers', 'rooms', 'currentSem', 'currentSY', 'scheds', 'courseSchedSelection','subjectSchedsSelection'])
  },
  async created() {
    this.schedule_id.id = this.$route.params.schedule_id;
    await this.fetchTeachers(this.role_id);
    await this.fetchRooms(this.role_id);
    await this.fetchCourseSched(this.schedule_id);
    await this.loadCurrentScheds();
    // await this.initializeTimeSched();
    console.log(this.subjectScheds);
  }
}
</script>

<style>
  .td-pad-2 .form-control{
    height: calc(1.35em + 0.7rem );
    padding:0 4px;
  }
</style>