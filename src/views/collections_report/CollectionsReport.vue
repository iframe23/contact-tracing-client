<template>
  <div>
    <b-tabs card>
      <b-tab title="Daily" active>
          <b-card-text>
            <b-button-toolbar aria-label="Toolbar with button groups and dropdown menu">
              <b-button-group class="mx-1">
                <label v-if="selectedDaily == $moment(new Date()).format('YYYY-MM-DD')" class="align-self-center mb-0" for="">Today's Colllections</label>
                <label v-else class="align-self-center mb-0" for="">{{'Collections on '+ $moment(selectedDaily).format('MMMM D, YYYY')}}</label>
              </b-button-group>
              <b-button-group class="mx-1">
                <input type="date" @change="fetchDaily()" class="form-control" v-model="selectedDaily">
              </b-button-group>
              <b-button-group class="mx-1">
                <button @click="dailyModal = true" class="btn btn-primary btn-sm ml-3"><span class="fa fa-print"></span> Print Preview</button>
              </b-button-group>
            </b-button-toolbar><hr>

            <table class="table table-hover table-striped table-sm">
              <thead class="bg-primary">
                <tr>
                  <th>#</th>
                  <th>Receipt Number</th>
                  <th>Receipt Date</th>
                  <th>Payment by</th>
                  <th>Particulars</th>
                  <th>Receipt Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(coll, index) in dailyCollections" :key="coll.receipt_id">
                  <td><strong>{{index + 1}}.</strong></td>
                  <td>#0000{{coll.receipt_id}}</td>
                  <td>{{$moment(receipt_date).format('MMMM D, YYYY')}}</td>
                  <td>{{coll.firstname+' '+coll.lastname}}</td>
                  <td>{{coll.particulars}}</td>
                  <td>{{parseFloat(coll.receipt_amount) | toCurrency}}</td>
                </tr>
                <tr v-if="dailyCollections.length == 0">
                  <td colspan="6" class="text-center">No collections for {{$moment(selectedDaily).format('MMMM D, YYYY')}}</td>
                </tr>
                <tr v-else>
                  <td colspan="2"><strong>Total Collected Amount</strong></td>
                  <td colspan="4"><strong>{{getTotalDaily() | toCurrency}}</strong></td>
                </tr>
              </tbody>
            </table>


            <b-modal
            :title="'Collections on '+$moment(selectedDaily).format('MMMM D, YYYY')"
            header-bg-variant="primary"
            content-class="border-primary"
            size="xl"
            v-model="dailyModal" 
            @ok="dailyModal = false"
            :hide-footer= true
            variant="primary"
            body-bg-variant="secondary"
            >
                <div class="card">
                    <embed class="pdf-viewer" :src="this.$api_url+'printable/print_daily_collections/'+selectedDaily" />
                </div>
            </b-modal>
          </b-card-text>
      </b-tab>
      <b-tab title="Monthly">
          <b-card-text>
            <b-button-toolbar aria-label="Toolbar with button groups and dropdown menu">
              <b-button-group class="mx-1">
                <label v-if="selectedMonthly == $moment(new Date()).format('YYYY-DD')" class="align-self-center mb-0" for="">This month's Collections</label>
                <label v-else class="align-self-center mb-0" for="">{{'Collections on '+ $moment(selectedMonthly).format('MMMM, YYYY')}}</label>
              </b-button-group>
              <b-button-group class="mx-1">
                <input type="month" @change="fetchMonthly()" class="form-control" v-model="selectedMonthly">
              </b-button-group>
              <b-button-group class="mx-1">
                <button @click="monthlyModal = true" class="btn btn-primary btn-sm ml-3"><span class="fa fa-print"></span> Print Preview</button>
              </b-button-group>
            </b-button-toolbar><hr>
            <table class="table table-hover table-striped table-sm">
              <thead class="bg-primary">
                <tr>
                  <th>#</th>
                  <th>Receipt Number</th>
                  <th>Receipt Date</th>
                  <th>Payment by</th>
                  <th>Particulars</th>
                  <th>Receipt Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(coll, index) in monthlyCollections" :key="coll.receipt_id">
                  <td><strong>{{index + 1}}.</strong></td>
                  <td>#0000{{coll.receipt_id}}</td>
                  <td>{{$moment(receipt_date).format('MMMM D, YYYY')}}</td>
                  <td>{{coll.firstname+' '+coll.lastname}}</td>
                  <td>{{coll.particulars}}</td>
                  <td>{{parseFloat(coll.receipt_amount) | toCurrency}}</td>
                </tr>
                <tr v-if="monthlyCollections.length == 0">
                  <td colspan="6" class="text-center">No collections for the month of {{$moment(selectedDaily).format('MMMM D, YYYY')}}</td>
                </tr>
                <tr v-else>
                  <td colspan="2"><strong>Total Collected Amount</strong></td>
                  <td colspan="4"><strong>{{getTotalMonthly() | toCurrency}}</strong></td>
                </tr>
              </tbody>
            </table>


            <b-modal
            :title="'Collections on '+$moment(selectedMonthly).format('MMMM, YYYY')"
            header-bg-variant="primary"
            content-class="border-primary"
            size="xl"
            v-model="monthlyModal" 
            @ok="monthlyModal = false"
            :hide-footer= true
            variant="primary"
            body-bg-variant="secondary"
            >
                <div class="card">
                    <embed class="pdf-viewer" :src="this.$api_url+'printable/print_monthly_collections/'+selectedMonthly" />
                </div>
            </b-modal>
          </b-card-text>
      </b-tab>
  </b-tabs>
  </div>
</template>

<script>
import {user_api, school_api} from '../../shared/api'
import {bus} from '../../main'
import {mapActions, mapGetters} from 'vuex'
import axios from 'axios'

export default {
  name: 'Collections_Report',
  data(){
    return {
      selectedDaily: '',
      selectedMonthly: '',
      dailyCollections:{},
      monthlyCollections:{},
      dailyModal : false,
      monthlyModal : false
    }
  },
  methods: {
    async fetchDaily(){
      let where = {
        receipt_date: this.selectedDaily
      }

      let response = await axios.post(this.$api_url+'accounting/daily_collections', where);
      this.dailyCollections = response.data
    },
    async fetchMonthly(){
      let where = {
        receipt_date: this.selectedMonthly
      }

      let response = await axios.post(this.$api_url+'accounting/monthly_collections', where);
      this.monthlyCollections = response.data
    },
    getTotalDaily(){
      let total = 0;

      this.dailyCollections.forEach(el => {
        total = total + parseFloat(el.receipt_amount)
      });

      return total
    },
    getTotalMonthly(){
      let total = 0;

      this.monthlyCollections.forEach(el => {
        total = total + parseFloat(el.receipt_amount)
      });

      return total
    }
  },
  async created(){
    this.selectedDaily = this.$moment(new Date()).format('YYYY-MM-DD')
    this.selectedMonthly = this.$moment(new Date()).format('YYYY-MM')

    await this.fetchDaily();
    await this.fetchMonthly();
  },
  
}
</script>

<style>

</style>
