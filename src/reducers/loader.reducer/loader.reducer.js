export const initStateLoad = {
  load: false
}

export const stateLoad = (state, action) => {
  switch (action.type) {
    case 'LOAD_TRUE':
      return { ...state, load: true }
    case 'LOAD_FALSE':
      return { ...state, load: false }

    default:
      return state
  }
}
