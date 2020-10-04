<template>
  <div to="/" tag="div">
     <img class="gif" :src="showRandomGif()" v-if="switchRandomGif()" rel="preload">
  </div>
</template>

<script>
import { JOKE_LENGTH} from '@/store/app.store'

export default {
    name:"RandomGif",

    methods: {
      /**
      * Imprime o url do Gif
      * @return String
      **/
      showRandomGif() {
        let random = Math.floor(Math.random() * 5) + 1
        return `meme/${random}.gif`
      },

      /**
      * Imprime o url do Gif
      * @return Boolean
      **/
      switchRandomGif:function(){
        let switchRandom = false;
        if (JOKE_LENGTH == this.$store.getters.getMood){
          switchRandom = true;
        return switchRandom
        }
      },
    }

}
</script>
<style scoped>
img.gif{
  z-index: 9999999999999;
  position: fixed;
  bottom: 10px;
  left: -37px;
  opacity: 1;
  }


  @media (max-width: 600px)
  {
img.gif{
  top: 10px;
  zoom: 32%;
}}
</style>
