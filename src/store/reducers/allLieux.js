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
     
      nextState = {
        ...state,
        ajoutLieuxID: [...state.ajoutLieuxID, action.data]
      };
       return nextState || state;
      //return initialState; 

      case 'UPDATE_LIEU': // modifie un lieu a l'aide de son id
        // cherche le lieu en fonction de son id
        /*const index = state.ajoutLieuxID.findIndex(todo => todo.lieu.id !== action.data); 
        const newArray = [...state.ajoutLieuxID]; 
        console.log("newArray de index ==========" + JSON.stringify(newArray[index]));
        // change les donnees
        newArray[index] = action.data
        nextState = { 
         ...state, 
         ajoutLieuxID: newArray
        }
        return nextState || state*/

        //////////////////// TEST
        /*return state.lieu.map((item, index) => {
          console.log("index ====" + JSON.stringify(index));
          if (index !== action.data.id) {
            // This isn't the item we care about - keep it as-is
            return state
          }
      
          // Otherwise, this is the one we want - return an updated value
          return {
            ...state,
            ...action.data
          }
        })*/

        ////////////////////:: TEST
        
        return state.ajoutLieuxID.map(beer => {
          console.log("beeeer ====" + JSON.stringify(beer));
          /*if (beer.uid === action.uid) {
            return {
              ...beer,
              ...action.data,
            };
          } else {
            return beer;
          }*/
        });

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