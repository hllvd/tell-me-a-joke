<template>
  <transition name="modal-fade">
    <div class="modal-backdrop">
      <div class="modal"
        role="dialog"
        aria-labelledby="modalTitle"
        aria-describedby="modalDescription"
        >
        <header
          class="modal-header"
          id="modalTitle"
          >
          <slot name="header">
            Conte-me uma piada
          </slot>
        </header>
        <section
          class="modal-body"
          id="modalDescription"
          >

            <div class="texto">
                  {{Joke}}
            </div>


        </section>
        <footer class="modal-footer">
          <slot name="footer">
            <button type="button" v-if="switchButtons()" @click="nextJoke()" class="btn-orange">Muito boa, próxima</button>
            <router-link to="/" v-if="!switchButtons()" tag="button" class="btn-orange secundary">Fechar piadas</router-link>
          </slot>
        </footer>
      </div>
    </div>
  </transition>
</template>
<script>
import { JOKE_LENGTH, ACTION_APP_IMPROVE_MOOD, ACTION_APP_LOAD_JOKES} from '@/store/app.store'
import axios from 'axios'

export default {
  name: 'modal',

  methods: {
    /**
    * set next humor level
    * @return null
    */
    nextJoke:function(){
      this.improveMoodLevel()
    },
    /**
    * switch buttons
    * @return Boolean
    */
    switchButtons:function(){
      if (this.MoodLevel<JOKE_LENGTH ){
        return true;
      }
    },
    /**
    * set next humor level
    */
    improveMoodLevel: function(){
      this.$store.dispatch(ACTION_APP_IMPROVE_MOOD)
    },

    showModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
    close() {
     this.$emit('close');
    },
    /**
    * Load list of jokes from endpoint. It loads all of them in local storage to improve performance
    * @return Boolean
    */
    _loadJokes:function(){
      let urls = new Array(JOKE_LENGTH).fill(('https://geek-jokes.sameerkumar.website/api?format=json'))
      urls.map(url=>{
        axios.get(url).then( result =>{
          this.$store.dispatch(ACTION_APP_LOAD_JOKES, result.data.joke)
        })
        .catch(e => {
          console.log(e)
          return false
        })
        return true
      })
    }
  },

  computed: {
    /**
    * Get currenty mood level
    * @return integer
    */
    MoodLevel:function(){
      return this.$store.getters.getMood
    },
    /**
    * Get Joke
    */
    Joke:function(){
      return this.$store.getters.readNewJoke[this.$store.getters.getMood-1]
    }
  },

  mounted(){
      this._loadJokes()
      this.nextJoke()
  }
};


</script>
<style scoped>
  .modal-backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .modal {
    background: #FFFFFF;
    box-shadow: 2px 2px 20px 1px;
    overflow-x: auto;
    display: flex;
    flex-direction: column;
    border-radius: 5px;
    padding: 0 25px;

  }

  .modal-header,
  .modal-footer {
    padding: 15px;
    display: flex;
  }

  .modal-header {
    border-bottom: 1px solid #eeeeee;
    color: #4AAE9B;
    justify-content: space-between;
  }

  .modal-footer {
    border-top: 1px solid #eeeeee;
    justify-content: flex-end;
  }

  .modal-body {
    position: relative;
    width: 354px;
    height: 362px;
    font-size: 19px;
    line-height: 1.2em;
    color: #555;
    display: table;
  }
  .modal-body .texto{display: table-cell; vertical-align: middle;}

  .btn-close {
    border: none;
    font-size: 20px;
    padding: 20px;
    cursor: pointer;
    font-weight: bold;
    color: #4AAE9B;
    background: transparent;
  }

  .btn-orange {
    color: white;
    background: #f48225;
    border: 1px solid #f29345;
    border-radius: 2px;
    line-height: 42px;
    font-size: 15px;
    font-weight: bold;
    padding: 0px 17px;
    border-radius: 6px;
  }
  .btn-orange:active, .btn-orange:hover, .btn-orange:visited,.btn-orange:focus{border: 1px solid #f29345 !important;}

</style>
