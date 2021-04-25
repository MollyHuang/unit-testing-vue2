import MessageDisplay from '@/components/MessageDisplay'
import { mount } from '@vue/test-utils'
import { getMessage } from '@/services/axios'
import flushPromises from 'flush-promises'
//如果要測試promise就必須使用flush-promises的lib或是其他類似的lib，用以保證promise會被等待，否則測試永遠不會進入then的區塊

// mock the API call
jest.mock('@/services/axios')
beforeEach(() => {
  jest.clearAllMocks()
})

describe('MessageDisplay', () => {

  it('Calls getMessage and displays message', async () => {

    // mock the API call
    const mockMessage = "Hello from the db!"
    getMessage.mockResolvedValueOnce({ text: mockMessage }) // calling our mocked get request

    const wrapper = mount(MessageDisplay)

    // wait for promise to resolve
    // 呼叫 flushPromise會等待Promise完成
    await flushPromises()

    // check that call happened once
    expect(getMessage).toHaveBeenCalledTimes(1)

    // check that component displays message
    const message = wrapper.find('[data-testid="message"]').element.textContent
    expect(message).toEqual(mockMessage)
  })

  it('Displays an error when getMessage call fails', async () => {
    // mock the failed API call
    const mockError = 'Oops! Something went wrong.'
    getMessage.mockRejectedValueOnce({ text: mockError }) // Mocking a failed request

    const wrapper = mount(MessageDisplay)
    // wait for promise to resolve
    // 呼叫 flushPromise會等待Promise完成
    await flushPromises()

    // check that call happened once
    expect(getMessage).toHaveBeenCalledTimes(1)
    const displayedError = wrapper.find('[data-testid="message-error"]').element.textContent
    // check that component displays error
    expect(displayedError).toEqual(mockError)
  })

})
