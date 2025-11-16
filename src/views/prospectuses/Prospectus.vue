<template>
  <div class="thead-primary table-sm">
    <h4>
        {{prospectus.prospectus.prospectus_name}}
        
      </h4><hr>
    <div v-if="$router.currentRoute.name != 'Add Subjects'">

      
      <h6 class="">{{prospectus.prospectus.course}} Course 
        <router-link :to="'/prospectuses/prospectus/'+$route.params.prospectus_id+'/add_subjects'">
          <button class="btn btn-primary btn-sm ml-3">Add Subjects</button>
        </router-link>
        <button @click="printModal = true" class="btn btn-primary btn-sm ml-3"><span class="fa fa-print"></span> Print Preview</button>
      </h6><hr>
      

      <v-client-table 
        :data="prospectus.subjects"
        :columns="columns" 
        :options="options">

        <span slot="actions" slot-scope="props" >
          <button class="action-btn btn btn-success m-1" @click="canTeach(props.row.subject_id)"><span class="fa fa-chalkboard-teacher"></span></button>
          <button class="action-btn btn btn-primary m-1" @click="editSubject(props.row.subject_id)"><span class="fa fa-edit"></span></button>
          <button class="action-btn btn btn-danger m-1" v-on:click="deleteSubject(props.row.subject_id)"><span class="fa fa-trash"></span></button>
        </span>
        <!-- <a slot="actions" slot-scope="props" class="fa fa-edit" v-on:click="edit(props.index)"></a> -->
      </v-client-table>
      
      
      <b-modal
        :title="'Edit Subject - '+toEdit.descriptive_title+' - '+prospectus.prospectus_name"
        variant="primary"
        header-bg-variant="primary"
        content-class="border-primary"
        size="xl"
        v-model="primaryModal" 
        @ok="primaryModal = false"
        :hide-footer= true
      >
        <form @submit.prevent="submitEditSubject()">
          <div class="form-group">
            <div class="row align-items-center">
              <div class="col-2">
                <label>Subject Code</label>		
              </div>

              <div class="col-6">
                <input type="text" v-model="toEdit.subject_code" class="form-control" required>
              </div>
            </div>
          </div>

          <div class="form-group">
            <div class="row align-items-center">
              <div class="col-2">
                <label>Descriptive Title</label>		
              </div>

              <div class="col-4">
                <input type="text" v-model="toEdit.descriptive_title" class="form-control" required>
              </div>
            </div>
          </div>

          <div class="form-group">
            <div class="row align-items-center">
              <div class="col-2">
                <label>Year Level</label>		
              </div>

              <div class="col-6">
                <select v-model="toEdit.year_level_id" class="form-control" required>
                  <option v-for="year in year_levels" v-bind:key="year.year_level_id" :value="year.year_level_id">{{year.year_level_name}}</option>
                </select>	
              </div>
            </div>
          </div>

          <div class="form-group">
            <div class="row align-items-center">
              <div class="col-2">
                <label>Semester</label>		
              </div>

              <div class="col-6">
                <select v-model="toEdit.sem_id" class="form-control" required>
                  <option v-for="sem in semester" v-bind:key="sem.sem_id" :value="sem.sem_id">{{sem.sem_name}}</option>
                </select>	
              </div>
            </div>
          </div>

          <div class="form-group">
            <div class="row align-items-center">
              <div class="col-2">
                <label>Type</label>		
              </div>

              <div class="col-6">
                <select v-model="toEdit.type" class="form-control" required>
                  <option value="Major">Major</option>
                  <option value="Minor">Minor</option>
                </select>	
              </div>
            </div>
          </div>

          <div class="form-group">
            <div class="row align-items-center">
              <div class="col-2">
                <label>Lec Units</label>		
              </div>

              <div class="col-4">
                <input type="number" v-model="toEdit.lec_units" class="form-control" required>
              </div>
            </div>
          </div>

          <div class="form-group">
            <div class="row align-items-center">
              <div class="col-2">
                <label>Lab Units</label>		
              </div>

              <div class="col-4">
                <input type="number" v-model="toEdit.lab_units" class="form-control" required>
              </div>
            </div>
          </div>

          <div class="form-group">
            <div class="row align-items-center">
              <div class="col-2">
                <label>Units</label>		
              </div>

              <div class="col-4">
                <input type="number" v-model="toEdit.units" class="form-control" required>
              </div>
            </div>
          </div>

          <div class="form-group">
            <div class="row align-items-center">
              <div class="col-2">
                <label>Hours per Week</label>		
              </div>

              <div class="col-4">
                <input type="number" v-model="toEdit.hours_week" class="form-control" required>
              </div>
            </div>
          </div>

          <div class="form-group">
            <div class="row align-items-center">
              <div class="col-2">

              </div>

              <div class="col-8">
                <button class="btn btn-primary mr-3" type="submit">Confirm Edit</button>
                <button class="btn btn-secondary" type="button" @click="primaryModal = false">Close</button>
              </div>
            </div>
          </div>
        </form>
      </b-modal>


      <b-modal
        :title="'Teachers Specializing this Subject - '+toEdit.descriptive_title+' ('+toEdit.subject_code+')'"
        variant="primary"
        header-bg-variant="primary"
        content-class="border-primary"
        size="xl"
        v-model="canTeachModal" 
        @ok="canTeachModal = false"
        :hide-footer= true
      >
        <form class="form-inline">
          <div class="form-group mb-2">
            <label for="staticEmail2" >Select From Active Teachers</label>
          </div>
          <div class="form-group mx-sm-3 mb-2">
            <select v-model="allowed.teacher_id" name="" id="" class="form-control">
              <option v-for="(teacher, index) in teachers" :key="index" :value="teacher.user_id">{{teacher.firstname+' '+teacher.middlename+' '+teacher.lastname}}</option>
            </select>
          </div>
          <button @click="allow()" type="button" class="btn btn-primary mb-2">Allow This Teacher</button>
        </form>
        
        <table class="table table-striped table-hover table-sm">
          <thead class="bg-primary">
            <tr>
              <th>Teacher</th>
              <th>Gender</th>
              <th>Status</th>
              <th>Can teach?</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="teacher in teachersCanTeach" :key="teacher.user_id">
              <td>{{teacher.firstname+' '+teacher.middlename+' '+teacher.lastname}}</td>
              <td>{{teacher.gender}}</td>
              <td>{{teacher.status}}</td>
              <td><span class="text-success">Allowed</span></td>
              <td><button @click="disallow(teacher.can_teach_id)" class="btn btn-primary btn-sm">Disallow</button></td>
            </tr>
            <tr>
              <td class="bg-secondary text-center" v-if="teachersCanTeach.length == 0" colspan="5">No Teachers allowed to teach this subject</td>
            </tr>
          </tbody>
        </table>
      </b-modal>

      <b-modal
      :title="prospectus.prospectus.prospectus_name"
      header-bg-variant="primary"
      content-class="border-primary"
      size="xl"
      v-model="printModal" 
      @ok="printModal = false"
      :hide-footer= true
      variant="primary"
      body-bg-variant="secondary"
      >
          <div class="card">
              <embed class="pdf-viewer" :src="this.$api_url+'printable/print_prospectus/'+prospectus.prospectus.prospectus_id" />
          </div>
      </b-modal>
    </div>

    <router-view></router-view>
  </div>
</template>

<script>
import {user_api, school_api} from '../../shared/api'
import {bus} from '../../main'
import {mapGetters, mapActions} from 'vuex'

export default {
  name: 'Prospectus',
  data: () => {
    return {
      // prospectus: {},
      prospectus_id: {id:0},
      year_levels: [],
      semester: [],
      tableData: [],
      columns: ['subject_code', 'descriptive_title', 'year_level', 'semester', 'type', 'lec_units', 'lab_units', 'units', 'actions' ],
      options: {
          headings: {
              subject_code: 'Subject Code',
              descriptive_title: 'Descriptive Title',
              year_level: 'Year Level',
              semester: 'Semester',
              lec_units: 'Lec Units',
              lab_units: 'Lab Units',
              units: 'Units',
          },
          sortable: ['subject_code', 'descriptive_title', 'year_level', 'semester', 'type', 'lec_units', 'lab_units', 'units', 'usage_status'],
          filterable: ['subject_code', 'descriptive_title', 'year_level', 'semester', 'type', 'lec_units', 'lab_units', 'units', 'usage_status']
      },
      toEdit: {
        subject_id: 0,
        subject_code: '',
        descriptive_title: '',
        year_level_id: 0,
        sem_id: 0,
        type: '',
        lec_units: 0,
        lab_units: 0,
        units: 0,
        hours_week: 0
      },
      primaryModal: false,
      canTeachModal: false,
      printModal: false,
      alert: {
        type: '',
        result: '',
        message: '',
        dismissCountDown: 0
      },
      allowed: {
        teacher_id : 0,
        subject_id : 0
      }
    }
  },
  methods: {
    ...mapActions(['fetchProspectus', 'fetchTeachersCanTeach', 'fetchTeachersToTeach', 'fetchTeachers', 'submitAllowedTeacher', 'submitDisallowedTeacher']),
    goBack() {
      this.$router.go(-1)
      // this.$router.replace({path: '/users'})
    },
    async disallow(id){
      let response = await this.submitDisallowedTeacher({can_teach_id:id})

      if(response.result == "Success"){
        this.alert = response;
        this.alert.dismissCountDown = 15;
        bus.$emit('alert_push', this.alert);

        let where = [{ role_id:4}, {role_id:5 }];

        let can = await this.fetchTeachersCanTeach({subject_id:this.toEdit.subject_id});
        can.forEach(el => {
          where.push({'users.user_id !=' : el.user_id});
        });

        where.push({status : 'Active'});

        this.allowed.teacher_id = 0;

        await this.fetchTeachersToTeach(where);
      }
    },
    async allow(){
      let response = await this.submitAllowedTeacher(this.allowed)

      if(response.result == "Success"){
        this.alert = response;
        this.alert.dismissCountDown = 15;
        bus.$emit('alert_push', this.alert);

        let where = [{ role_id:4}, {role_id:5 }];

        let can = await this.fetchTeachersCanTeach({subject_id:this.toEdit.subject_id});
        can.forEach(el => {
          where.push({'users.user_id !=' : el.user_id});
        });

        where.push({status : 'Active'});

        this.allowed.teacher_id = 0;

        await this.fetchTeachersToTeach(where);
      }
    },
    async canTeach(id) {
      let index = this.prospectus.subjects.findIndex((element => element.subject_id == id));

      this.toEdit.subject_id = this.prospectus.subjects[index].subject_id
      this.toEdit.subject_code = this.prospectus.subjects[index].subject_code
      this.toEdit.descriptive_title = this.prospectus.subjects[index].descriptive_title
      this.toEdit.year_level_id = this.prospectus.subjects[index].year_level_id
      this.toEdit.sem_id = this.prospectus.subjects[index].sem_id
      this.toEdit.type = this.prospectus.subjects[index].type
      this.toEdit.lec_units = this.prospectus.subjects[index].lec_units
      this.toEdit.lab_units = this.prospectus.subjects[index].lab_units
      this.toEdit.units = this.prospectus.subjects[index].units
      this.toEdit.hours_week = this.prospectus.subjects[index].hours_week

      this.allowed.subject_id = this.toEdit.subject_id;

      let where = [{ role_id:4}, {role_id:5 }];
      let can = await this.fetchTeachersCanTeach({subject_id:this.toEdit.subject_id});

      can.forEach(el => {
        where.push({'users.user_id !=' : el.user_id});
      });
      
      where.push({user_status : 'Active'});

      await this.fetchTeachersToTeach(where);
      this.canTeachModal = true
    },
    editSubject(id) {
      let index = this.prospectus.subjects.findIndex((element => element.subject_id == id));

      this.toEdit.subject_id = this.prospectus.subjects[index].subject_id
      this.toEdit.subject_code = this.prospectus.subjects[index].subject_code
      this.toEdit.descriptive_title = this.prospectus.subjects[index].descriptive_title
      this.toEdit.year_level_id = this.prospectus.subjects[index].year_level_id
      this.toEdit.sem_id = this.prospectus.subjects[index].sem_id
      this.toEdit.type = this.prospectus.subjects[index].type
      this.toEdit.lec_units = this.prospectus.subjects[index].lec_units
      this.toEdit.lab_units = this.prospectus.subjects[index].lab_units
      this.toEdit.units = this.prospectus.subjects[index].units
      this.toEdit.hours_week = this.prospectus.subjects[index].hours_week

      this.primaryModal = true
    },
    submitEditSubject() {
      school_api.edit_subject(this.toEdit).then(res => {
        this.alert.type = res.type,
        this.alert.result = res.result,
        this.alert.message = res.message,
        this.alert.dismissCountDown = 10

        bus.$emit('alert_push', this.alert)

        if(res.result == 'Success'){
          this.primaryModal = false
          this.getSubjects();
        }
      });
    },
    deleteSubject(id){
      user_api.delete_data('subject_id', id, 'subjects').then(res => {
        this.alert.type = res.type,
        this.alert.result = res.result,
        this.alert.message = res.message,
        this.alert.dismissCountDown = 10
        bus.$emit('alert_push', this.alert)

        if(res.result == 'Success'){
          this.primaryModal = false
          this.getSubjects();
        }
      });
    },
    async getProspectus(){
      await school_api.get_prospectus(this.prospectus_id).then(res => this.prospectus = res);
    },
    async getSubjects(){
      await school_api.get_subjects(this.prospectus_id).then(res => this.tableData = res);
    }
  },
  computed: {
    ...mapGetters(['prospectus', 'teachers', 'teachersCanTeach'])
  },
  async created(){
    this.prospectus_id.id = this.$route.params.prospectus_id
    
    // await this.getSubjects()
    school_api.get_year_levels().then(res => this.year_levels = res);
    school_api.get_semester().then(res => this.semester = res);
  },
   async mounted(){
      // bus.$on('get_subjects', (payload) => {
      //   this.getSubjects()
      // })
      await this.fetchProspectus({prospectus_id:this.$route.params.prospectus_id})
  }
}
</script>

<style>

</style>
