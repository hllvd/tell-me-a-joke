<template>
  <div class="home">

  </div>
</template>

<script>
import { ACTION_APP_RESET_MOOD} from '@/store/app.store'
export default {
  name: 'Home',
  components: {

  },
  mounted:function(){
    //Reseta os estado de humor
    this.$store.dispatch(ACTION_APP_RESET_MOOD)
  }
}

</script>
