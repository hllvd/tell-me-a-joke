import { mount, shallowMount, createLocalVue  } from '@vue/test-utils'
import Modal from '@/components/Modal.vue'
import Vuex from 'vuex'
import { JOKE_LENGTH, ACTION_APP_IMPROVE_MOOD, ACTION_APP_LOAD_JOKES} from '@/store/app.store'


const localVue = createLocalVue()
localVue.use(Vuex)

/*
* DRY
*/
const factory = (propsData) => {
  return mount(Modal, {
    propsData: {
      ...propsData
    }
  })
}


describe('Modals',()=>{
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

  it('Modal 1',()=>{
    //const wrapper = shallowMount(Modal,{store,localVue})
    const wrapper = mount(Modal, {
      mocks: {
        $store: {
          getters:{getMood : 0}
        }
      },localVue
      })


    console.log(wrapper.html())

  })

})
