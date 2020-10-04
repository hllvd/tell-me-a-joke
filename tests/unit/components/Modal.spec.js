import { mount, shallowMount, createLocalVue  } from '@vue/test-utils'
import Modal from '@/components/Modal.vue'
import Vuex from 'vuex'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { JOKE_LENGTH, ACTION_APP_IMPROVE_MOOD, ACTION_APP_LOAD_JOKES} from '@/store/app.store'
import AppStore from '@/store/app.store'
import VueRouter from "vue-router"
import routes from "@/router"





const localVue = createLocalVue()
localVue.use(Vuex, VueRouter)


AppStore['state']['level'] = JOKE_LENGTH
const router = new VueRouter(routes)
const store = new Vuex.Store(AppStore)

describe("Modal", () => {
  it("Mostrar botão fechar piadas", async () => {
    const wrapper = mount(Modal, {
      store, localVue,router
    })
    expect(wrapper.find('.btn-orange').text()).toBe('Fechar piadas')
  })

  it("Mostrar botão próximas piadas", async () => {
    AppStore['state']['level'] = JOKE_LENGTH - 1
    const wrapper = mount(Modal, {
      store, localVue,router
    })
    expect(wrapper.find('.btn-orange').text()).toContain('próxima')
  })

  it('Testando axios', async () => {
	var mock = new MockAdapter(axios)
	mock.onGet("https://geek-jokes.sameerkumar.website/api?format=json").reply(200, {joke:'resultado piada'});
	axios
		.get('https://geek-jokes.sameerkumar.website/api?format=json')
		.then(function(response){
			expect(response.data).toEqual({joke:'resultado piada'})
		}).catch(e => {console.log(e)});
  })


})
