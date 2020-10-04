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
            <div class="texto"  @mouseup="isAllTextSelected()" v-if="!isLastJoke()">
                  {{Joke}}
            </div>
            <img   src="meme/teste.gif" rel="preload" v-if="isLastJoke()" class="theend">
        </section>
        <footer class="modal-footer">
          <slot name="footer">
            <button type="button" v-if="isMobile() && !isLastJoke()" @click="nextJoke()" class="btn-orange">Muito boa, próxima</button>
            <pre v-if="!isLastJoke() && !isMobile()"><strong>Esther</strong> só consegue ler textos selecionados</pre>
            <router-link to="/" v-if="isLastJoke()" tag="button" class="btn-orange secundary">Fechar piadas</router-link>
          </slot>
        </footer>
      </div>
    </div>
  </transition>
</template>
<script>
import { JOKE_LENGTH, ACTION_APP_IMPROVE_MOOD, ACTION_APP_LOAD_JOKES, ACTION_APP_LOAD_DEFAULT_JOKES} from '@/store/app.store'
import axios from 'axios'

export default {
  name: 'modal',

  methods: {
    /*
    * Verifica se a seleção atual é a mesma que o texto completo
    */
    isAllTextSelected:function(){
        if(  window.getSelection().toString().replace(/\s/g, '') == this.Joke.toString().replace(/\s/g, '')  ){
          window.getSelection().removeAllRanges();
          this.nextJoke();
        }
    },

    /**
    * Verifica se é um celular
    * @return Boolean
    */
    isMobile : function() {
        if( screen.width <= 600 ) {
            return true;
        }
        else {
            return false;
        }
    },

    /*
     * set next humor level
     * @return null
     */
    nextJoke:function(){
      this.improveMoodLevel()
    },

    /*
     * Verica se é a última piada
     * @return Boolean
     */
    isLastJoke:function(){
      if (this.MoodLevel>=JOKE_LENGTH ){
        return true;
      }
    },

    /*
     * Seguir o fluxo
     * @return Boolean
     */
    nextBtn:function(){
      if (this.MoodLevel<JOKE_LENGTH ){
        return true;
      }
    },

    /*
    * Melhora o humor
    */
    improveMoodLevel: function(){
      this.$store.dispatch(ACTION_APP_IMPROVE_MOOD)
    },

    /*
    * Abrir Modal
    */
    showModal() {
      this.isModalVisible = true;
    },

    /*
    * Fechar Modal
    */
    closeModal() {
      this.isModalVisible = false;
    },

    /*
    * Emite envento para fechar Modal
    */
    close() {
     this.$emit('close');
    },

    /*
     * Carrega piadas todas de uma vez e guarda no estado app.store.js/state.jokes
     * Caso não houve conexão, o action ACTION_APP_LOAD_DEFAULT_JOKES carrega uma piada padrão
     */
    _loadJokes:function(){
      let urls = new Array(JOKE_LENGTH).fill(('https://geek-jokes.sameerkumar.website/api?format=json'))
      urls.map(url=>{
        axios.get(url).then( result =>{
          this.$store.dispatch(ACTION_APP_LOAD_JOKES,result.data.joke)
        })
        .catch(e => {
          this.$store.dispatch(ACTION_APP_LOAD_DEFAULT_JOKES)
          console.log(e)
        })
      })
    }
  },

  computed: {
    /*
    * Recupera humor atual
    * @return integer
    */
    MoodLevel:function(){
      return this.$store.getters.getMood
    },

    /*
    * Recupera a piada da vez
    * @return String
    */
    Joke:function(){
      return this.$store.getters.readNewJoke[this.$store.getters.getMood-1]
    }
  },

  /*
  * Set init config
  */
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

@media (max-width: 600px)
{
  .modal
   {
     zoom: 73%;
     position: absolute;
     bottom: 11px;
     height: 400px;
   }
   .text{font-size: 23px;}
   .theend{zoom:70%}
   .modal-body{
     position: relative;
      width: 354px;
      height: 280px;
      font-size: 19px;
      line-height: 1.2em;
      color: #555;
      display: table;
   }
}


</style>
