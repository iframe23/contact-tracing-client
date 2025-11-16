<template>
  <div class="pt-4 pb-4 container-fluid bg-white thead-primary">
    <div class="row">
        <input ref="profilePicBtn" class="d-none" @change="handleFileUpload('profile_pic')" type="file" name="" id="">
        <div class="col-md-4 pr-md-5">
            <div @mouseenter="hovered = true" @mouseleave="hovered = false" class="position-relative mb-5">
                <!-- <img v-if="user.profile_pic != ''" class="w-100 rounded border" :src="this.$api_url+'images/profile_pics/'" /> -->
                <img class="w-100 rounded border" :src="'../../../img/profile.jpg'" />
                <div v-if="hovered==true">
                    <div @click="profilePicBtnClick()" class="profile-pic-upload-btn d-flex align-items-center justify-content-center text-primary fs-2">
                        <a type="button" class="pl-1 pr-1 d-inline-block"><span class="fa fa-camera mr-2"></span><span class="d-none d-lg-inline"> Upload Photo</span></a>
                    </div>
                </div>
            </div>
            <div @mouseenter="hovered = true" @mouseleave="hovered = false" class="position-relative">
                <h2 class="text-center">{{visitingPoint.type}}</h2>
                
            </div>
        </div>
        <div class="col-md-8">
            <div class="d-flex align-items-center">
                <h2 class=" m-0">
                    {{visitingPoint.visiting_point_name}}
                </h2>
            </div>

            <p class="lead mt-4">{{visitingPoint.visiting_point_address}} </p>

            <section class="mt-4">
                <div>
                    <b-card no-body>
                        <b-tabs card>
                            <b-tab title="User Information" active>
                                <b-card-text>
                                    <h5 class="text-primary">
                                        Contact Information
                                    </h5>
                                    <dl class="row mt-4 mb-4 pb-3">
                                        <dt class="col-sm-3">Phone</dt>
                                        <dd class="col-sm-9">{{visitingPoint.contact_number}}</dd>
                                        
                                        <dt class="col-sm-3">Address</dt>
                                        <dd class="col-sm-9">{{visitingPoint.visiting_point_address}}</dd>
                                        
                                        <dt class="col-sm-3">Email address</dt>
                                        <dd class="col-sm-9">
                                            <a href="mailto:aang.is.kefy@gmail.com">{{visitingPoint.visiting_point_name}}</a>
                                        </dd>
                                        <dt v-if="visitingPoint.type = 'Transportation'" class="col-sm-3">Plate Number</dt>
                                        <dd class="col-sm-9">{{visitingPoint.plate_number}}</dd>
                                    </dl>

                                </b-card-text>
                            </b-tab>
                            <b-tab title="View Visitors" active>
                                
                            </b-tab>
                        </b-tabs>
                    </b-card>
                </div>
            </section>
        </div>
    </div>
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
        columns: ['subject_code', 'descriptive_title', 'year_level_name', 'sem_name', 'lab_units', 'lec_units', 'units', 'hours_week', 'actions'],
        options: {  
            filterable: true,
            perPage: 5,
            perPageValues: [5,10,25,50,100]
        },
        transcriptModal: false,
        accountSMModal: false,
        hovered: false,
        file: {},
        receiptData:{
        
        },
        primaryModal: false,
        prospect_id: 0,
        alert: {}
    }
  },
  methods: {
    ...mapActions(['fetchVisitingPoint'])
  },
  computed: {
    ...mapGetters(['visitingPoint'])
  },
  async created(){
      await this.fetchVisitingPoint({visiting_point_id:this.$route.params.visiting_point_id})
    
    console.log(this.visitingPoint)
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