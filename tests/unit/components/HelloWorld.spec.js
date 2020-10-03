import { mount, shallowMount } from '@vue/test-utils'
import HelloWorld from '@/components/HelloWorld.vue'

describe('HelloWorld.vue', () => {
  it('renders a HelloWorld 1', () => {
    const wrapper = mount(HelloWorld)
    //console.log(wrapper.html())
    expect(wrapper.text()).toMatch("teste")
  })

  it('renders a HelloWorld 2', () => {
    const shallowWrapper  = shallowMount(HelloWorld)
    //console.log(shallowWrapper.html())

  })
})
