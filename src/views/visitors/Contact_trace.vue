<template>
  <div class="mt-4 container-fluid thead-primary table-sm">
    <h5>Contact Trace</h5><hr>

    <v-client-table 
          :data="residents"
          :columns="columns" 
          :options="options">

          <span slot="#" slot-scope="props" > 
            {{props.index+'.'}}
          </span>

          <span slot="fullname" slot-scope="props" > 
            {{props.row.firstname+' '+props.row.lastname}}
          </span>

          <span slot="actions" slot-scope="props" > 
            <router-link :to="'/contact_trace/resident_logs/'+props.row.user_id"><button class="btn-sm btn btn-primary mr-2" >Trace Travel Logs <span class="fa fa-angle-double-right"></span></button></router-link>
          </span>
          <!-- <a slot="actions" slot-scope="props" class="fa fa-edit" v-on:click="edit(props.index)"></a> -->
      </v-client-table>

  </div>
</template>

<script>
import {user_api, school_api} from '../../shared/api'
import {bus} from '../../main'
import {mapActions, mapGetters} from 'vuex';

export default {
  name: 'Visiting Points',
  data: () => {
    return{
      primaryModal: false,
      tableData: [],
      columns: ['#','fullname', 'address', 'gender', 'email', 'contact_number', 'actions' ],
      options: {
          headings: {
              fullname: 'Resident Name',
          },
          filterable: true
      },
      alert: {
        type: '',
        result: '',
        message: '',
        dismissCountDown: 0
      },
      searchData: ''
    }
  },
  computed: {
    ...mapGetters(['visitingPoints', 'residents'])
  },
  methods: {
    ...mapActions(['fetchVisitingPoints', 'fetchResidents']),
    editUser(index) {

    },
    submitEditUser() {

    },
    getUsers() {

    },
    onChange(){
      console.log(this.dataa)
    }
  },
  async created() {
    await this.fetchResidents({role_id : 2})
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
