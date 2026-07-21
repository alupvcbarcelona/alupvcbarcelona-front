export const initStatePack = {
  pack: {},
  my_packs: [],
  my_partner_pack: [],
  my_sold_packs: [],
  user_sold_packs:[]
}

export const statePacks = (state, action) => {
  switch (action.type) {
    case 'SET_PACK':
      return { ...state, pack: action.payload }
    case 'SET_PACKS':
      return { ...state, my_packs: action.payload }
    case 'SET_PARTNER_PACKS':
      return { ...state, my_partner_pack: action.payload }
    case 'SET_SOLD_PACKS':
      return { ...state, my_sold_packs: action.payload }
      case 'SET_USER_SOLD_PACKS':
      return { ...state, user_sold_packs: action.payload }
    default:
      return state
  }
}
