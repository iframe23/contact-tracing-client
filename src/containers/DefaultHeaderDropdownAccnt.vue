<template>
  <AppHeaderDropdown right no-caret>
    <template slot="header">
      <img
        :src="this.$base_url+'img/profile.jpg'"
        class="img-avatar"
        alt="admin@bootstrapmaster.com" />
    </template>\
    <template slot="dropdown">
      <b-dropdown-header
        tag="div"
        class="text-center">
        <strong>Account</strong>
      </b-dropdown-header>
      <!-- <b-dropdown-item><i class="fa fa-user" /> Profile</b-dropdown-item> -->
      <b-dropdown-divider />
      <b-dropdown-item><router-link :to="'/logout'"><div>  <i class="fa fa-lock" /> Logout</div></router-link></b-dropdown-item>
    </template>
  </AppHeaderDropdown>
</template>

<script>
import { HeaderDropdown as AppHeaderDropdown } from '@coreui/vue';
import {mapActions, mapGetters} from 'vuex';

export default {
  name: 'DefaultHeaderDropdownAccnt',
  components: {
    AppHeaderDropdown
  },
  data: () => {
    return { itemsCount: 42 }
  },
  created(){
    console.log(this.loggedUser)
  },
  methods: {

  },
  computed: {
    ...mapGetters(['loggedUser'])
  }
}
</script>
