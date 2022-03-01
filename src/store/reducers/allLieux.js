const initialState = {
  ajoutLieuxID: [],
  tagListe:[
    {
      "item": "Visiter",
      "id": 1
    },
    {
      "item": "Manger",
      "id": 2
    },
    {
      "item": "Boire un coup",
      "id": 3
    }
  ],
}

function allLieux (state = initialState, action) {
  let nextState
  switch (action.type) {
    case 'ADD_LIEUX':
        console.log("action new lieu a ajouter === " + JSON.stringify(action.data));
      nextState = {
        ...state,
        ajoutLieuxID: [...state.ajoutLieuxID, action.data]
      };
       return nextState || state;
      // return initialState; 

      case 'DELETE_LIEU': // supprimer un lieu a l'aide de son id
        nextState = {
          ...state,
          ajoutLieuxID: state.ajoutLieuxID.filter(id => id.lieu.id !== action.value)
        };
        return nextState || state

    default:
      console.log("state default === " + JSON.stringify(state));
      return state
  };
}

export default allLieux;