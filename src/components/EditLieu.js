import React from 'react';
import FormulaireAddUpdate from './FormulaireAddUpdate';

const EditLieu  = ({ route, navigation }) => {
   return (
    <FormulaireAddUpdate navigation={navigation} buttonName={"Modifier le lieu"} lieuId={route.params.lieuID} />
               
  );
}

export default EditLieu;