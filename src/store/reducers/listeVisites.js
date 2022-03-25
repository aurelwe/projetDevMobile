const initialState = { listeVisites: [] }

function listeVisites(state = initialState, action) {
  let nextState
  switch (action.type) {
    case 'SAVE_A_VISITER': // sauvegarde un lieu a visiter
      nextState = {
        ...state,
        listeVisites: [...state.listeVisites, action.value]
      };
      return nextState || state
    case 'UNSAVE_A_VISITER': // supprimer un lieu a visiter
      nextState = {
        ...state,
        listeVisites: state.listeVisites.filter(id => id !== action.value)
      };
      return nextState || state
    default:
      return state
  };
}

export default listeVisites;