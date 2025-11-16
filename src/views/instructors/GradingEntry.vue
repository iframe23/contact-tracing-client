<template>
  <div class="thead-primary table-sm">
    <form class="form-inline" @submit.prevent="">
      <div class="input-group mb-2 mr-sm-2 mb-sm-0">
        <div class="input-group-addon align-self-center mr-3">Select Subject</div>
        <select @change="loadStudentsBySubject()" class="form-control" v-model="selectedSubject">
          <option v-for="(sub, index) in subjectLoads" :key="sub.subject_id" :value="index">{{sub.descriptive_title}}</option>
        </select>
      </div>

    </form><hr>
    
    <h5 v-if="selectedSubject != null" class="text-primary">
      <div class="d-flex align-items-center" v-if="subjectLoads[selectedSubject].descriptive_title != null && subjectLoads[selectedSubject].descriptive_title != ''">
        Class Record - {{subjectLoads[selectedSubject].descriptive_title+' ('+subjectLoads[selectedSubject].subject_code+')'}}

        <button @click="printModal = true" class="btn btn-primary btn-sm ml-3"><span class="fa fa-print"></span> Print Preview</button>
      </div>
    </h5><hr>
    <v-client-table 
        :data="studentsBySubject"
        :columns="columns" 
        :options="options">
        <div class="width-3" slot="student_name" slot-scope="props">
          <strong>{{props.index+'. '}}</strong>{{props.row.lastname+', '+props.row.firstname}}
        </div>
        <span slot="prelim" slot-scope="props">
          <input type="text" class="form-control form-control-sm" v-model="studentsBySubject[props.index-1].prelim">
        </span>
        <span slot="midterm" slot-scope="props">
          <input @input="getMidtermCumu(props.index-1)" type="text" class="form-control form-control-sm" v-model="studentsBySubject[props.index-1].midterm">
        </span>
        <span slot="midterm_cumu" slot-scope="props">
          <input type="text" class="form-control form-control-sm" v-model="studentsBySubject[props.index-1].midterm_cumu" readonly>
        </span>
        <span slot="semi_finals" slot-scope="props">
          <input @input="getSemiFinalsCumu(props.index-1)" type="text" class="form-control form-control-sm" v-model="studentsBySubject[props.index-1].semi_finals">
        </span>
        <span slot="semi_finals_cumu" slot-scope="props">
          <input type="text" class="form-control form-control-sm" v-model="studentsBySubject[props.index-1].semi_finals_cumu" readonly>
        </span>
        <span slot="finals" slot-scope="props">
          <input @input="getFinalsCumu(props.index-1)" type="text" class="form-control form-control-sm" v-model="studentsBySubject[props.index-1].finals">
        </span>
        <span slot="finals_cumu" slot-scope="props">
          <input type="text" class="form-control form-control-sm" v-model="studentsBySubject[props.index-1].finals_cumu" readonly>
        </span>
        <span slot="equivalent" slot-scope="props">
          <input type="text" class="form-control form-control-sm" v-model="studentsBySubject[props.index-1].equivalent_grade" readonly>
        </span>
        <span slot="actions" slot-scope="props">
          <button @click="submitG(props.index-1)" class="action-btn btn btn-primary">Save</button>
        </span>
        
        <!-- <a slot="actions" slot-scope="props" class="fa fa-edit" v-on:click="edit(props.index)"></a> -->
    </v-client-table>


    <b-modal  v-if="selectedSubject != null"
    :title="'Class Record for the Subject '+subjectLoads[selectedSubject].descriptive_title"
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
            <embed class="pdf-viewer" :src="this.$api_url+'printable/print_class_record/'+subjectLoads[selectedSubject].subject_sched_id" />
        </div>
    </b-modal>
  </div>
</template>

<script>
import {school_api, user_api} from '../../shared/api'
import {bus} from '../../main'
import {mapActions, mapGetters} from 'vuex'

export default {
  name: 'Students',
  data: () => {
    return{
      primaryModal: false,
      printModal:false,
      columns: ['student_name', 'course_abb', 'prelim', 'midterm', 'midterm_cumu', 'semi_finals', 'semi_finals_cumu', 'finals', 'finals_cumu', 'equivalent', 'actions'],
      options: {
          headings: {
            user_id: 'Student ID'
          },
          filterable: true
      },
      alert: {
        type: '',
        result: '',
        message: '',
        dismissCountDown: 0
      },
      selectedSubject: null,
    }
  },
  methods: {
    ...mapActions(['fetchSubjectLoads', 'fetchLoggedUser', 'fetchStudentsBySubject', 'submitGrade']),
    async loadSubjects(){
      console.log(this.loggedUser)
      await this.fetchSubjectLoads({teacher_id: this.loggedUser.user_id});
    },
    async loadStudentsBySubject(){
      await this.fetchStudentsBySubject({subject_sched_id: this.subjectLoads[this.selectedSubject].subject_sched_id})
    },
    getMidtermCumu(index){
      this.studentsBySubject[index].midterm_cumu = Math.round((this.studentsBySubject[index].prelim * 0.3) + (this.studentsBySubject[index].midterm * 0.7))
    },
    getSemiFinalsCumu(index){
      this.studentsBySubject[index].semi_finals_cumu = Math.round((this.studentsBySubject[index].midterm_cumu * 0.3) + (this.studentsBySubject[index].semi_finals * 0.7))
    },
    getFinalsCumu(index){
      this.studentsBySubject[index].finals_cumu = Math.round((this.studentsBySubject[index].semi_finals_cumu * 0.3) + (this.studentsBySubject[index].finals * 0.7))
      this.getEquivalentGrade(index)
    },
    getEquivalentGrade(index){
      if(this.studentsBySubject[index].finals_cumu >= 95){
        this.studentsBySubject[index].equivalent_grade = 1.0;
      } else if (this.studentsBySubject[index].finals_cumu == 94){
        this.studentsBySubject[index].equivalent_grade = 1.1;
      } else if (this.studentsBySubject[index].finals_cumu == 93){
        this.studentsBySubject[index].equivalent_grade = 1.2;
      } else if (this.studentsBySubject[index].finals_cumu == 92){
        this.studentsBySubject[index].equivalent_grade = 1.3;
      } else if (this.studentsBySubject[index].finals_cumu == 91){
        this.studentsBySubject[index].equivalent_grade = 1.4;
      } else if (this.studentsBySubject[index].finals_cumu == 90){
        this.studentsBySubject[index].equivalent_grade = 1.5;
      } else if (this.studentsBySubject[index].finals_cumu == 89){
        this.studentsBySubject[index].equivalent_grade = 1.6;
      } else if (this.studentsBySubject[index].finals_cumu == 88){
        this.studentsBySubject[index].equivalent_grade = 1.7;
      } else if (this.studentsBySubject[index].finals_cumu == 87){
        this.studentsBySubject[index].equivalent_grade = 1.8;
      } else if (this.studentsBySubject[index].finals_cumu == 86){
        this.studentsBySubject[index].equivalent_grade = 1.9;
      } else if (this.studentsBySubject[index].finals_cumu == 85){
        this.studentsBySubject[index].equivalent_grade = 2.0;
      } else if (this.studentsBySubject[index].finals_cumu == 84){
        this.studentsBySubject[index].equivalent_grade = 2.1;
      } else if (this.studentsBySubject[index].finals_cumu == 83){
        this.studentsBySubject[index].equivalent_grade = 2.2;
      } else if (this.studentsBySubject[index].finals_cumu == 82){
        this.studentsBySubject[index].equivalent_grade = 2.3;
      } else if (this.studentsBySubject[index].finals_cumu == 81){
        this.studentsBySubject[index].equivalent_grade = 2.4;
      } else if (this.studentsBySubject[index].finals_cumu == 80){
        this.studentsBySubject[index].equivalent_grade = 2.5;
      } else if (this.studentsBySubject[index].finals_cumu == 79){
        this.studentsBySubject[index].equivalent_grade = 2.6;
      } else if (this.studentsBySubject[index].finals_cumu == 78){
        this.studentsBySubject[index].equivalent_grade = 2.7;
      } else if (this.studentsBySubject[index].finals_cumu == 77){
        this.studentsBySubject[index].equivalent_grade = 2.8;
      } else if (this.studentsBySubject[index].finals_cumu == 76){
        this.studentsBySubject[index].equivalent_grade = 2.9;
      } else if (this.studentsBySubject[index].finals_cumu == 75){
        this.studentsBySubject[index].equivalent_grade = 3.0;
      } else if (this.studentsBySubject[index].finals_cumu < 75){
        this.studentsBySubject[index].equivalent_grade = 5.0;
      }
      
    },
    async submitG(index){
      let credential = {
        credential_id: this.studentsBySubject[index].credential_id,
        prelim: this.studentsBySubject[index].prelim,
        midterm: this.studentsBySubject[index].midterm,
        midterm_cumu: this.studentsBySubject[index].midterm_cumu,
        semi_finals: this.studentsBySubject[index].semi_finals,
        semi_finals_cumu: this.studentsBySubject[index].semi_finals_cumu,
        finals: this.studentsBySubject[index].finals,
        finals_cumu: this.studentsBySubject[index].finals_cumu,
        equivalent_grade: this.studentsBySubject[index].equivalent_grade
      }

      let response = await this.submitGrade(credential)

      if(response.result = "Success"){
        response.dismissCountDown = 20
        bus.$emit('alert_push', response);
        this.loadStudentsBySubject()
      }
    }
  },
  computed: {
    ...mapGetters(['subjectLoads', 'loggedUser', 'studentsBySubject'])
  },
  async mounted() {
    await this.fetchLoggedUser()
    await this.fetchSubjectLoads({teacher_id: this.loggedUser.user_id});
  }
}
</script>
