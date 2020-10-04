<template>
  <div class="piada" @click="showModal">
    <RandomGif/>
    <modal
      v-show="isModalVisible"
    />
  </div>
</template>
<script>
import RandomGif from '@/components/RandomGif.vue'
import Modal from '@/components/Modal.vue'

export default {
  components: {
    RandomGif,
    Modal
  },
  data () {
      return {
        isModalVisible: false,
      };
    },
    
  methods: {
    showModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    }
  }
}
</script>
<style scoped>
div.piada {
    width: 100%;
    height: 100%;
}
</style>
