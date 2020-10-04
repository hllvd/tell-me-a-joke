/* eslint-disable no-unused-vars */


// define nome dos 'Actions', exporto essas contantes para serem reutilizadas nos componentes
export const ACTION_APP_IMPROVE_MOOD        = 'ActionAppImproveMood'
export const ACTION_APP_RESET_MOOD          = 'ActionAppResetMood'
export const ACTION_APP_RESET_JOKES         = 'ActionAppResetJokes'
export const ACTION_APP_LOAD_JOKES          = 'ActionAppReadJoke'
export const ACTION_APP_LOAD_DEFAULT_JOKES  = 'ActionAppLoadDefaultJokes'

export const JOKE_LENGTH = 6

// Aqui nome das 'Mutations'
const IMPROVE_MOOD_LEVEL  = 'ImproveMoodLevel'
const RESET_MOOD_LEVEL    = 'ResetMoodLevel'
const LOAD_JOKE           = 'LoadJoke'
const RESET_JOKE          = 'ResetJoke'
const DEFAULT_JOKES       = 'DefaultJokes'



// app state inicial
const state = {
  level : 0,
  jokes : []
}

//Getters
const getters = {
  /**
  * Recupera o humor atual
  * @param state Array
  * @return int
  */
  getMood(state) {
    return state.level
  },
  /**
  * Recupera o humor atual
  * @param state Array
  * @return Array
  */
  readNewJoke(state){
    return state.jokes
  }
}

// Actions - Aqui damos o commit, que irá chamar os 'Mutations'
const actions = {
  /**
  * Aumenta o nivel de humor
  */
  [ACTION_APP_IMPROVE_MOOD](context){
    context.commit(IMPROVE_MOOD_LEVEL)
  },


  /**
  * Põe o humor a normal
  */
  [ACTION_APP_RESET_MOOD](context){
    context.commit(RESET_MOOD_LEVEL)
  },


  /**
  * Load list of jokes from endpoint. It loads all of them in local storage to improve performance
  * @return Boolean
  */
  [ACTION_APP_LOAD_JOKES](context,r){
    context.commit(LOAD_JOKE,r)
  },


  /**
  * Renova as piadas
  */
  [ACTION_APP_RESET_JOKES](context){
    context.commit(RESET_JOKE)
  },

  /**
  * Carrega piadas padrão em falta de conexão
  */
  [ACTION_APP_LOAD_DEFAULT_JOKES](context){
    let j = ['Era uma vez', 'uma internet', 'que parou', 'de funcionar','Fim','Dum ba tss']
    context.commit(DEFAULT_JOKES, j)
  }

}

// Mutations - responsáveis por atualizar os valores (são chamados pelos 'Actions')
const mutations={
  [IMPROVE_MOOD_LEVEL](state){
    if(state.level>JOKE_LENGTH-1) state.level = 0
    state.level = state.level + 1
  },
  [RESET_MOOD_LEVEL](state){
    state.level = 0
  },
  [LOAD_JOKE](state,r){
    state.jokes.push(r)
  },
  [RESET_JOKE](state){
    state.jokes = []
  },
  [DEFAULT_JOKES](state,jokes){
    jokes.forEach((el,i)=>{
      state.jokes.push(el)
    })
    console.log(state.jokes)
  }
}

export default {
  name:"AppStore",
  mutations,
  state,
  actions,
  getters
}
