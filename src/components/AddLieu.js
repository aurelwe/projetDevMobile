import React from 'react';
import FormulaireAddUpdate from './FormulaireAddUpdate';

const AddLieu  = ({navigation}) => {

   return (
    <FormulaireAddUpdate navigation={navigation} buttonName="Ajouter un nouveau lieu" />            
  );
}

export default AddLieu;