const consoleLogMock = jest.spyOn(console, 'log').mockImplementation(() => {})

afterAll(() => consoleLogMock.mockRestore())

test('lolo test', () => {
  console.log('>> lololo')
  expect(consoleLogMock).toBeCalled()
})
