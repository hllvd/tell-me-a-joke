<template>
  <router-link to="/leia-me-uma-piada" tag="div" id="app" v-bind:class="moodClass">
    <router-view/>
    </router-link>
</template>

<script>

export default {
  name: 'App',
  methods: {},
  computed:{
    //retorna humor atual
    moodClass:function(){
      return "mood-"+this.$store.getters.getMood
    }

  },

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
