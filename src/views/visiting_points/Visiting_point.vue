<template>
  <div class="pt-4 pb-4 container-fluid bg-white thead-primary">
    <div class="row">
        <input ref="profilePicBtn" class="d-none" @change="handleFileUpload('profile_pic')" type="file" name="" id="">
        <div class="col-md-3 pr-md-5">
            <div @mouseenter="hovered = true" @mouseleave="hovered = false" class="position-relative mb-5">
                <!-- <img v-if="user.profile_pic != ''" class="w-100 rounded border" :src="this.$api_url+'images/profile_pics/'" /> -->
                <img class="w-100 rounded border" :src="this.$base_url+'img/location.jpg'" />
                <div v-if="hovered==true">
                    <div @click="profilePicBtnClick()" class="profile-pic-upload-btn d-flex align-items-center justify-content-center text-primary fs-2">
                        <a type="button" class="pl-1 pr-1 d-inline-block"><span class="fa fa-camera mr-2"></span><span class="d-none d-lg-inline"> Upload Photo</span></a>
                    </div>
                </div>
            </div>

        </div>
        <div class="col-md-9">
            <div class="d-flex align-items-center">
                <h2 class=" m-0">
                    {{visitingPoint.visiting_point_name}} - ({{visitingPoint.visiting_point_type}})
                </h2>
            </div>

            <p class="lead mt-2 mb-1"><span class="fa fa-map-marker-alt text-success"></span> {{visitingPoint.visiting_point_address}} </p>

            <section class="mt-3">
                <div>
                    <b-card no-body>
                        <b-tabs card>
                            <b-tab title="Visiting Point Information" active>
                                <b-card-text>
                                    <h5 class="text-primary">
                                        Contact Information
                                    </h5>
                                    <dl class="row mt-4 mb-1 pb-0">
                                        <dt class="col-sm-4">Phone</dt>
                                        <dd class="col-sm-8">{{visitingPoint.contact_number}}</dd>
                                        
                                        <dt class="col-sm-4">Address</dt>
                                        <dd class="col-sm-8">{{visitingPoint.visiting_point_address}}</dd>
                                        
                                        <dt class="col-sm-4">Email address</dt>
                                        <dd class="col-sm-8">
                                            <a href="mailto:aang.is.kefy@gmail.com">{{visitingPoint.email}}</a>
                                        </dd>
                                        <dt v-if="visitingPoint.type = 'Transportation'" class="col-sm-3">Plate Number</dt>
                                        <dd class="col-sm-9">{{visitingPoint.plate_number}}</dd>
                                    </dl>

                                </b-card-text>
                            </b-tab>
                            <b-tab title="GPS Location">
                                <GmapMap
                                    :center="{lat:parseFloat(visitingPoint.latitude), lng:parseFloat(visitingPoint.longitude)}"
                                    :zoom="16"
                                    map-type-id="roadmap"
                                    style="width: 100%; height: 350px"
                                    >
                                    <GmapMarker
                                        :key="index"
                                        v-for="(m, index) in markers"
                                        :position="m.position"
                                        :clickable="true"
                                        :draggable="true"
                                        @click="center=m.position"
                                        :label="m.label"
                                    />
                                </GmapMap>
                            </b-tab>
                        </b-tabs>
                    </b-card>
                </div>
            </section>
        </div>
    </div>


    <div class="border border-left-0 border-right-0 mb-1">
        <div class="row">
            <div class="col-5">
                <div>
                    <h5 class="text-primary pb-2 pt-2 mt-0 mb-1">Visitors ({{$moment(titleDate).format('LL')}})</h5>
                </div>
            </div>
            <div class="col-7">
                <div class="d-flex justify-content-end align-items-center">
                   <form @submit.prevent="fetchV()" class="form-inline m-1">
                        <div class="form-group mx-sm-3">
                            <label for="inputPassword2" >Select Date</label>
                            <input v-model="selectedDate" type="date" class="form-control" id="inputPassword2" placeholder="Select Date" required>
                        </div>
                        <button type="submit" class="btn btn-primary">Load Visitors</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
    
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
import {bus, api_url} from '../../main';

export default {
  name: 'Visiting_point',
  
  props: {
    caption: {
      type: String,
      default: 'User id'
    },
  },
  data: () => {
    return {
        columns: ['#','fullname', 'address','contact_number','email', 'temperature', 'log_time'],
        options: {
            headings: {
                fullname: 'Name',
            },
            filterable: true
        },
        transcriptModal: false,
        accountSMModal: false,
        hovered: false,
        file: {},
        receiptData:{
        
        },
        primaryModal: false,
        prospect_id: 0,
        alert: {},
        markers: [{
            position: {
                lat: '',
                lng: '',
            },
            label: {
                text: 'unknown',
                color: "white",
                fontWeight: "normal",
                fontSize: "14px"
            }
        }],
        selectedDate: '',
        titleDate: 'Select a Date'
    }
  },
  methods: {
    ...mapActions(['fetchVisitingPoint', 'fetchVisitors']),
    async fetchV(){
      await this.fetchVisitors({
          visiting_point_id:this.visitingPoint.visiting_point_id,
          log_time : this.selectedDate
      })

      this.titleDate = this.selectedDate
    }
  },
  computed: {
    ...mapGetters(['visitingPoint', 'visitors'])
  },
  async created(){
    await this.fetchVisitingPoint({'visiting_points.visiting_point_id':this.$route.params.visiting_point_id})
    
   
    this.markers[0].position.lat = parseFloat(this.visitingPoint.latitude)
    this.markers[0].position.lng = parseFloat(this.visitingPoint.longitude)
    this.markers[0].label.text = this.visitingPoint.visiting_point_name

    console.log(this.markers[0])
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