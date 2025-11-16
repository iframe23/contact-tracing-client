<template>
  <div class="thead-primary table-sm pt-4 container-fluid bg-white thead-primary">
    <div class="border border-left-0 border-right-0 border-top-0 mb-2 pb-1">
        <div class="row">
          <div class="col-2">
                <div>
                    <h5 class="mb-0 mt-1 text-center" >Select Date</h5>
                </div>
            </div>
            <div class="col-4">
                <div>
                    <input type="date" class="form-control" v-model="selectedDate" required>
                </div>
            </div>
            <div class="col-4">
                <div class="d-flex justify-content-start align-items-center">
                <button @click="fetchV()" class=" btn btn-primary">Load</button>
                </div>
            </div>
        </div>
    </div>

    <h5 class="border border-left-0 border-right-0 border-top-0 text-center text-primary pb-2 pt-2 mt-0 mb-3">
      <span v-if="titleDate == '(Select a Date)'">Select a Date to View Visitors</span>
      <span v-else>Visitors on {{$moment(titleDate).format('LL')}}</span></h5>
    
    <v-client-table class="mb-3"
        :data="visitors"
        :columns="columns" 
        :options="options">

        <span slot="#" slot-scope="props" > 
        {{props.index+'.'}}
        </span>

        <span slot="fullname" slot-scope="props" > 
        {{props.row.firstname+' '+props.row.lastname}}
        </span>

        <span slot="log_time" slot-scope="props" > 
            {{$moment(props.row.log_time).format('lll')}}
        </span>
        <!-- <span slot="actions" slot-scope="props" > 
        <button class="action-btn btn btn-primary m-1" @click="traceContacts(props.row.log_id)">Trace Contacts <span class="fa fa-edit"></span></button>
        
        </span> -->
        <!-- <a slot="actions" slot-scope="props" class="fa fa-edit" v-on:click="edit(props.index)"></a> -->
    </v-client-table>

</div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';

export default {
  name: 'Visitors',
  components: {
    
    },
  props: {
    caption: {
      type: String,
      default: 'User id'
    },
  },
  data: () => {
    return {
        primaryModal: false,
        columns: ['#','fullname', 'address','contact_number','email', 'temperature', 'log_time'],
        options: {
            headings: {
                fullname: 'Name',
            },
            filterable: true
        },
        hovered: false,
        file: {},
        selectedLog: 0,
        primaryModal: false,
        prospect_id: 0,
        alert: {},
        selectedDate: '',
        titleDate: '(Select a Date)'
    }
  },
  methods: {
    ...mapActions(['fetchUser', 'fetchVisitors', 'fetchContactLogs', 'fetchLoggedUser']),
    async fetchV(){
      await this.fetchVisitors({
          visiting_point_id:this.loggedUser.visiting_point_id,
          log_time : this.selectedDate
      })

      this.titleDate = this.selectedDate
    }
  },
  computed: {
    ...mapGetters(['user', 'contactLogs', 'loggedUser', 'visitors'])
  },
  async created(){
      await this.fetchLoggedUser();
      
  }
}
</script>

<style>
    .document-empty{
        height: 200px;
    }

    .profile-pic-upload-btn{
        height: 50px;
        margin-top: -50px;
        z-index: 1000;
        background-color: black;
        opacity: .5;
        display: none;
    }

    
</style>