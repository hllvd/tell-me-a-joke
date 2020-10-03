/* eslint-disable no-unused-vars */
// define nome dos 'Actions'
export const ACTION_APP_IMPROVE_MOOD  = 'ActionAppImproveMood'
export const ACTION_APP_RESET_MOOD    = 'ActionAppResetMood'
export const ACTION_APP_LOAD_JOKES = 'ActionAppReadJoke'

export const JOKE_LENGTH = 6

// Aqui nome das 'Mutations'
const IMPROVE_MOOD_LEVEL  = 'ImproveMoodLevel'
const RESET_MOOD_LEVEL    = 'ResetMoodLevel'
const LOAD_JOKE = 'LoadJoke'



// app state inicial
const state = {
  level : 0,
  jokes : []
}

//Recupera o 'state'
const getters = {
  getMood(state) {
    return state.level
  },
  readNewJoke(state){
    return state.jokes
  }
}

// Actions - Aqui damos o commit, que irá chamar os 'Mutations'
const actions = {
  [ACTION_APP_IMPROVE_MOOD](context){
    context.commit(IMPROVE_MOOD_LEVEL)
  },
  [ACTION_APP_RESET_MOOD](context){
    context.commit(RESET_MOOD_LEVEL)
  },
  [ACTION_APP_LOAD_JOKES](context, r){
    context.commit(LOAD_JOKE,r)
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
  }
}

export default {
  mutations,
  state,
  actions,
  getters
}
