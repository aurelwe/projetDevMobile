import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Keyboard } from 'react-native';
import { Input, Layout, Select, SelectItem, Icon, List, Divider, Button } from '@ui-kitten/components';
import data from '../data/data.json'

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

//ajoute le lieu qui vient d'être créé
const addLieu = async () => {
  console.log("lieu ajouté")

  // const RNFS = require('react-native-fs')
  // const path = RNFS.DocumentDirectoryPath + '/data.json'
  // const myData = JSON.parse(data)
  
  // myData.push(data)

  // const newData = {
  //    "lieu": {
  //     "id": 1,
  //     "name": nom,
  //     "description": description,
  //     "tag": [
  //         "Visiter"
  //     ],
  //     "location": {
  //         "address": adresse,
  //         "city": ville,
  //         "zipcode": cp,
  //         "latitude": 49.12044149204529, 
  //         "longitude": 6.175840312986322
  //     },
  //     "country_name": "France"   
  //   }
  // } 

  // RNFS.writeFile(data, newData, 'utf-8')
  // console.log(data)
  // myData.push(newData)
  // data = JSON.stringify(myData)
  // console.log(data)
  // fs.writeFileSync('../data/data.json', data, 'utf-8')
  // console.log(myData)
  // myObject.push(newData);
  // var newDataa = JSON.stringify(newData);
  // myObject.push(newDataa)
}

useEffect(() => {
  newLieu();
})

  const [tags, setTags] = useState([]);
  const tagsList = ["Boire", "Manger", "Visiter"];
  const [nom, setNom] = useState([])
  const [adresse, setAdresse] = useState([])
  const [description, setDescritpion] = useState([])
  const [note, setNote] = useState([])
  const [ville, setVille] = useState([])
  const [cp, setCp] = useState([])

  const TagsIcon = (props) => (
    <Icon {...props} name='tag' pack='fontawesome'/>
  );

  const VilleIcon = (props) => (
    <Icon {...props} name='pin'/>
  );

  const NoteIcon = (props) => (
    <Icon {...props} name='star' pack='fontawesome'/>
  );

   return (

    <React.Fragment>
      <Layout style={styles.container} level='1'>
        <Input
          style={styles.input}
          placeholder='Nom du lieu'
          onChangeText={(n) => setNom(n)}
        />

        <Input
          style={styles.input}
          accessoryLeft={VilleIcon}
          placeholder='Adresse'
          onChangeText={(a) => setAdresse(a)}
        />
        <View style={styles.rowContainer}>
          <Input
            style={styles.inputRow}
            accessoryLeft={VilleIcon}
            placeholder='Ville'
            onChangeText={(v) => setVille(v)}
          />
          <Input
            style={styles.inputRow}
            placeholder='Code postal'
            onChangeText={(cp) => setCp(cp)}
          />
        </View>
        
        <Input
          style={styles.input}
          multiline={true}
          textStyle={{ minHeight: 64 }}
          placeholder='Description'
          onChangeText={(d) => setDescritpion(d)}
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
            onChangeText={(rate) => setNote(rate)}
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