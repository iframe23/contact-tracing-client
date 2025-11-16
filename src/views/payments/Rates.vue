<template>
  <div>
    <h5>Rates Options</h5><hr>
    
    <table class="table table-hover table-striped">
      <thead class="bg-primary">
        <tr>
          <th>Course</th>
          <th>Miscellaneous Fee</th>
          <th>Tuition Fee per units</th>
          <th>Laboratory Fee per units</th>
          <th>Update</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(rate, index) in rates" :key="rate.rate_id">
          <td>{{rate.course_abb}}</td>
          <td><input class="form-control" type="text" v-model="rates[index].misc_fee"></td>
          <td><input class="form-control" type="text" v-model="rates[index].tuition_fee"></td>
          <td><input class="form-control" type="text" v-model="rates[index].laboratory_fee"></td>
          <td><button @click="updateRate(index)" class="btn btn-primary">Update</button></td>
        </tr>
      </tbody>
    </table>

  </div>
</template>

<script>
import {user_api, school_api} from '../../shared/api'
import {bus} from '../../main'
import {mapActions, mapGetters} from 'vuex'

export default {
  name: 'User',
  data(){
    return {

    }
  },
  methods: {
    ...mapActions(['fetchRates', 'submitRate']),
    async updateRate(index){

      console.log(this.rates[index])
      let data = {
        rate_id : this.rates[index].rate_id,
        misc_fee : this.rates[index].misc_fee,
        tuition_fee : this.rates[index].tuition_fee,
        laboratory_fee : this.rates[index].laboratory_fee
      }

      let response = await this.submitRate(data);

      if(response.result == "Success"){
        await this.fetchRates();
        response.dismissCountDown = 16;

        bus.$emit('alert_push', response);
      }
    },
  },
  async created(){
    await this.fetchRates();
  },
  computed:{
    ...mapGetters(['rates'])
  }
}
</script>
