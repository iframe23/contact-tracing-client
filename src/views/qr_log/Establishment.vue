<template>
  <div class="mt-4 container-fluid bg-white thead-primary">
    <div class="row">
        <input ref="profilePicBtn" class="d-none" @change="handleFileUpload('profile_pic')" type="file" name="" id="">
        <div class="col-md-4 pr-md-5">
            <div @mouseenter="hovered = true" @mouseleave="hovered = false" class="position-relative mb-5">
                <img v-if="user.profile_pic != ''" class="w-100 rounded border" :src="this.$api_url+'images/profile_pics/'" />
                <img v-else class="w-100 rounded border" :src="this.$base_url+'img/profile.jpg'" />
                <div v-if="hovered==true">
                    <div @click="profilePicBtnClick()" class="profile-pic-upload-btn d-flex align-items-center justify-content-center text-primary fs-2">
                        <a type="button" class="pl-1 pr-1 d-inline-block"><span class="fa fa-camera mr-2"></span><span class="d-none d-lg-inline"> Upload Photo</span></a>
                    </div>
                </div>
            </div>
            <div @mouseenter="hovered = true" @mouseleave="hovered = false" class="position-relative">
                <h2 class="font-weight-bold text-center">QR Code</h2>
                <div v-if="user.qr_code == ''">
                    <qrcode-vue :value="user.user_id" size="150"></qrcode-vue>
                </div>
            </div>
        </div>
        <div class="col-md-8">
            <div class="d-flex align-items-center">
                <h2 class="font-weight-bold m-0">
                    {{user.firstname+' '+user.middlename+' '+user.lastname}}
                </h2>
                <address class="m-0 pt-2 pl-0 pl-md-4 font-weight-light text-secondary">
                    <i class="fa fa-map-marker"></i>
                    
                </address>
            </div>
            <p class="h5 text-primary mt-2 d-block font-weight-light">
            </p>
            <p class="lead mt-4">This page shows the information of {{user.firstname}}.</p>

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
                                        <dd class="col-sm-9">{{user.contact_number}}</dd>
                                        
                                        <dt class="col-sm-3">Home address</dt>
                                        <dd class="col-sm-9">
                                            <address>
                                                {{user.address}}
                                            </address>
                                        </dd>
                                        
                                        <dt class="col-sm-3">Email address</dt>
                                        <dd class="col-sm-9">
                                            <a href="mailto:aang.is.kefy@gmail.com">{{user.email}}</a>
                                        </dd>
                                    </dl>
                                    
                                    <h5 class="text-primary">
                                        Basic Information
                                    </h5>
                                    <dl class="row mt-4 mb-1 pb-3">                            
                                        <dt class="col-sm-3">Gender</dt>
                                        <dd class="col-sm-9">{{user.gender}}</dd>

                                        <dt class="col-sm-3">Birthdate</dt>
                                        <dd class="col-sm-9">{{user.birthdate}}</dd>
                                    </dl>

                                </b-card-text>
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
import QrcodeVue from 'qrcode.vue'
import {bus, api_url} from '../../main';

export default {
  name: 'User',
  components: {
    QrcodeVue
    },
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
    ...mapActions(['fetchUser']),
  },
  computed: {
    ...mapGetters(['user'])
  },
  async created(){
      await this.fetchUser({user_id:this.$route.params.resident_id})

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