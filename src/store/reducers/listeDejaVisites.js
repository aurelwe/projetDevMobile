const initialState = { listeDejaVisitesID: [] }

function listeDejaVisites(state = initialState, action) {
  let nextState
  switch (action.type) {
    case 'SAVE_DEJA_VISITE': // sauvegarde un lieu comme déja visité
      nextState = {
        ...state,
        listeDejaVisitesID: [...state.listeDejaVisitesID, action.value]
      };
      return nextState || state
    case 'UNSAVE_DEJA_VISITE': // supprimer un lieu comme déja visité
      nextState = {
        ...state,
        listeDejaVisitesID: state.listeDejaVisitesID.filter(id => id !== action.value)
      };
      return nextState || state
    default:
      return state
  };
}

export default listeDejaVisites;