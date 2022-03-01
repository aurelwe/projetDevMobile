import React from 'react';
import FormulaireAddUpdate from './FormulaireAddUpdate';

const EditLieu  = ({ route }) => {

   return (
    <FormulaireAddUpdate buttonName={"Modifier le lieu"} lieuId={route.params.lieuID} />            
  );
}

export default EditLieu;