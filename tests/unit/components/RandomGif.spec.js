import { mount, shallowMount, createLocalVue  } from '@vue/test-utils'
import RandomGif from '@/components/RandomGif.vue'
import Vuex from 'vuex'
import { JOKE_LENGTH} from '@/store/app.store'

const localVue = createLocalVue()
localVue.use(Vuex)



describe('RandomGif', () => {
  let num= Number(RandomGif.methods.showRandomGif().match(/\d/g)[0]);
  let store
  let mutations
  beforeEach(() => {
    mutations = {
      MUTATION: jest.fn()
    }
    store = new Vuex.Store({
      mutations
    })
  })

  it('method: showRandomGif', () => {
    expect(num).toBeGreaterThanOrEqual(1)
    expect(num).toBeLessThan(6)
  });

  it('Quando RandomGif está off', () => {
    const wrapper = mount(RandomGif,{store,localVue})
    expect(wrapper.html()).not.toContain("img")
  });

  it('Quando RandomGif está on', () => {
    const wrapper = mount(RandomGif, {
      mocks: {
        $store: {
          getters:{getMood : JOKE_LENGTH}
        }
      },localVue
      })
    expect(wrapper.html()).toContain("img")

  });




});
