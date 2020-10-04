import { mount, shallowMount, createLocalVue  } from '@vue/test-utils'
import Piada from '@/views/Piada.vue'
import Modal from '@/components/Modal.vue'
import Vuex from 'vuex'
import { JOKE_LENGTH, ACTION_APP_IMPROVE_MOOD, ACTION_APP_LOAD_JOKES} from '@/store/app.store'
import AppStore from '@/store/app.store'
import VueRouter from "vue-router"
import routes from "@/router"


const localVue = createLocalVue()
localVue.use(Vuex, VueRouter)


AppStore['state']['level'] = 1
const router = new VueRouter(routes)
const store = new Vuex.Store(AppStore)

describe("App", () => {
    router.push("/leia-me-uma-piada")
    AppStore['state']['level'] = 1

  it("Clique no fundo, retorna modal", async () => {
    const wrapper = mount(Piada, {
      store, localVue,router
    })
    await wrapper.find('.piada').trigger('click')
    expect(wrapper.find('.modal').exists()).toBeTruthy()

  })
  })
