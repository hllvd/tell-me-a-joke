import { mount } from '@vue/test-utils'
import AppStore from '@/store/app.store.js'
//const localVue = createLocalVue()
//localVue.use(Vuex)
describe('Mutations', () => {
  const state = {
    level: 1,
    jokes: ["1","2","3"]
  }
  it('Incrementa humor', () => {
      AppStore.mutations.ImproveMoodLevel(state,2)
      expect(state).toEqual({ level: 2, jokes: [ '1', '2', '3' ] })
  })

  it('Reseta humor', () => {
      AppStore.mutations.ResetMoodLevel(state)
      expect(state).toEqual({ level: 0, jokes: [ '1', '2', '3' ] })
  })

  it('Carrega piada ', () => {
      AppStore.mutations.LoadJoke(state,"4")
      expect(state).toEqual({ level: 0, jokes: [ '1', '2', '3','4' ] })
  })

  it('Reseta piadas', () => {
      AppStore.mutations.ResetJoke(state)
      expect(state).toEqual({ level: 0, jokes: [] })
  })

})
