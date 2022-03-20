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
    case 'ADD_LIEUX': // ajout un nouveau lieu
     
      nextState = {
        ...state,
        ajoutLieuxID: [...state.ajoutLieuxID, action.data]
      };
       return nextState || state;
      //return initialState; 

      case 'UPDATE_LIEU': // modifie un lieu a l'aide de son id
        // cherche le lieu en fonction de son id
        const index = state.ajoutLieuxID.findIndex(todo => todo.lieu.id === action.data.lieu.id); 
        const newArray = [...state.ajoutLieuxID]; 
        // change les donnees
        newArray[index] = action.data
        nextState = { 
         ...state, 
         ajoutLieuxID: newArray
        }
        return nextState || state

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