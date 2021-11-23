import {lol} from './index.js'

const consoleLogMock = jest.spyOn(console, 'log').mockImplementation(() => {})

afterAll(() => consoleLogMock.mockRestore())

test('lolo test', () => {
  expect(lol()).toBe('lol')
  expect(consoleLogMock).toBeCalled()
})
