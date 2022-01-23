import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Keyboard } from 'react-native';
import { Input, Layout, Select, SelectItem, Icon, List, Divider, Button } from '@ui-kitten/components';

import JSONDATA from '../data/data.json';

function getSelectValue(selectedIndexPaths, options) {
  if (selectedIndexPaths.length) {
    // multiSelect
    return selectedIndexPaths
    .map((indexPath) => options[indexPath.row])
    .join(', ');
  } else {
    // singleSelect
    return options[selectedIndexPaths.row]
  }
}


const AddLieu = () => {
    
  const newLieu = async () => {
    
  //   const data = fs.readFileSync('../data/data.json');
  //   const myObject= JSON.parse(data);

  //   const newData = {
  //     "country": "England"
  // } 
  // myObject.push(newData);
  // var newDataa = JSON.stringify(myObject);
  // fs.writeFile('data.json', newDataa, err => {
  //     // error checking
  //     if(err) throw err;
      
  //     console.log("New data added");
  // }); 
}

useEffect(() => {
  newLieu();
})

  const [tags, setTags] = useState([]);
  const tagsList = ["Boire", "Manger", "Visiter"];

  const TagsIcon = (props) => (
    <Icon {...props} name='tag' pack='fontawesome'/>
  );

  const VilleIcon = (props) => (
    <Icon {...props} name='pin'/>
  );

  const NoteIcon = (props) => (
    <Icon {...props} name='star' pack='fontawesome'/>
  );

  //ajoute le lieu qui vient d'être créé
  const addLieu = async () => {
    try {
      console.log("lieu ajouté")
    } catch (error) {
      // TO DO
    }
  }

   return (

    <React.Fragment>
      <Layout style={styles.container} level='1'>
        <Input
          style={styles.input}
          placeholder='Nom du lieu'
        />

        <Input
          style={styles.input}
          accessoryLeft={VilleIcon}
          placeholder='Adresse'
        />
        <Input
          style={styles.input}
          multiline={true}
          textStyle={{ minHeight: 64 }}
          placeholder='Description'
        />

        <View style={styles.rowContainer}>
          <Select
            style={styles.selectRow}
            accessoryLeft={TagsIcon}
            multiSelect={true}
            placeholder="Tags"
            selectedIndex={tags}
            onSelect={index => setTags(index)}
            value={getSelectValue(tags, tagsList)}>
              {tagsList.map((value) => 
                <SelectItem title={value} key={value}/>
              )}          
          </Select> 

          <Input
            style={styles.inputRow}
            placeholder='Note'
            accessoryLeft={NoteIcon}
          />
        </View>
        <Button onPress={addLieu}>Ajouter</Button>

      </Layout>
    </React.Fragment>
            
  );
}


export default AddLieu;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 7,
  },
  input: {
    margin: 2,
  },
  select: {
    margin: 2,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputRow: {
    margin: 2,
    flex: 1,
  },
  selectRow: {
    margin: 2,
    flex: 1,
  }
});