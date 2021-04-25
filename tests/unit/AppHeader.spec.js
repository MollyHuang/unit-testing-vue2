import AppHeader from "@/components/AppHeader"
import { mount } from '@vue/test-utils'

// 1. Create a test suite (a block of tests)
describe("AppHeader", () => {
  // Put test(s) here

  // 2. Set up your test(s)
  test("If user is not logged in, do not show logout button", () => {
    // testing function

    // 3. Mount the component with vue-test-utils
    const wrapper = mount(AppHeader)
    expect(wrapper.find('button').isVisible()).toBe(false)
  });

  // Using async/await when waiting on DOM updates
  test("If user is logged in, show logout button", async () => {
    // testing function
    const wrapper = mount(AppHeader)

    // 4. Set data, if necessary
    wrapper.setData({ loggedIn: true })

    await wrapper.vm.$nextTick()

    // 5. Assert what the result should be
    expect(wrapper.find('button').isVisible()).toBe(true)
  });
});
