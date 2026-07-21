export const initStatePartner = {
  partner: {},
  partners: [],
  packs:[]
}

export const statePartner = (state, action) => {
  switch (action.type) {
    case 'SET_PARTNER':
      return { ...state, partner: action.payload }
    case 'SET_PARTNERS':
      return { ...state, partners: action.payload }
      case 'SET_PACKS':
      return { ...state, packs: action.payload }
    default:
      return state
  }
}
