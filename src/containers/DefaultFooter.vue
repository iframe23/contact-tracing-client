<template>
      <TheFooter>
        <div>
          <!--footer-->
          <a href="https://facebook.com/efraim.tagsip">DCIT</a>
          <span class="ml-1">&copy; 2019 tagz labs.</span>
        </div>
        <div class="ml-auto">
          <span class="mr-1">Powered by</span>
          <a href="https://facebook.com/efraim.tagsip">Vue.js and Codeigniter</a>
        </div>
      </TheFooter>
</template>
<script>
import { Footer as TheFooter } from '@coreui/vue'
export default {
  name: 'DefaultFooter',
  components: {
    TheFooter
  },
}
</script>
