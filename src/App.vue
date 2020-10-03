<template>
  <router-link to="/leia-me-uma-piada" tag="div" id="app" v-bind:class="moodClass">
    <router-view/>
    </router-link>
</template>

<script>
import { JOKE_LENGTH} from '@/store/app.store'
export default {
  name: 'App',
  methods: {},
  data(){

    return{imgs:[{url:"./assets/1.jpg"}]}
  },
  computed:{
    //retorna humor atual
    moodClass:function(){
      return "mood-"+this.$store.getters.getMood
    }

  },
  mounted:function(){
      // preload images ( para não "piscar" ao mudar a imagem)
      let img = []
      for(let i=1; i<JOKE_LENGTH;i++){
        img[i] = new Image();
        img[i].src=require("./assets/"+i+".jpg")
        let that = this
        img.onload = () => {
          console.log('img loaded');
          that.imgs.push(img[i])
        }

      }
  }
}
</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

  position: absolute;
    height: 100%;
    width: 100%;
}
body{
  margin:0px
}
#app{transition: background 1s linear;}


</style>
