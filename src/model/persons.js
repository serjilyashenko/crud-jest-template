const uuid = require('uuid')

const persons = {
  1: {
    name: 'lololo',
    id: '1',
  },
  2: {
    name: 'lololo',
    id: '2',
  },
  3: {
    name: 'lololo',
    id: '3',
  },
}

export const getPersons = () => Object.values(persons)

export const getPerson = id => {
  if (!id || !persons[id]) {
    return null
  }

  return persons[id]
}

export const addPerson = data => {
  const id = uuid.v4()

  persons[id] = {
    ...(data || {}),
    id,
  }

  return persons[id]
}

export const updatePerson = (id, data) => {
  if (!id || !persons[id]) {
    return null
  }

  persons[id] = {
    ...persons[id],
    ...(data || {}),
    id,
  }

  return persons[id]
}

export const removePerson = id => {
  if (!id || !persons[id]) {
    return null
  }

  delete persons[id]
}
