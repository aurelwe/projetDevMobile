import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Keyboard, Alert, Text } from 'react-native';
import { Input, Layout, Icon, Button } from '@ui-kitten/components';
import SelectBox from 'react-native-multi-selectbox';
import { xorBy } from 'lodash';
import { connect } from 'react-redux';
import Toast from 'react-native-root-toast';
import * as Location from 'expo-location';


const FormulaireAddUpdate  = ({ route, allLieux, dispatch}) => {

  // tags choisis dans le select
  const [tags, setTags] = useState([]);
  // tags choisis dans le select au bon format pour ajouter
  const [tagsOk, setTagsOk] = useState([]);
  // liste de tous les tags pour le select
  const [tagsList, setTagsList] = useState([]);
  const [name, setNom] = useState("");
  const [adress, setAdresse] = useState("");
  const [description, setDescritpion] = useState("");
  const [note, setNote] = useState([]);
  const [city, setVille] = useState("");
  const [zipCode, setCp] = useState("");
  const [country, setCounrty] = useState("");
  // id du lieu qu'on ajoute
  const [id, setId] = useState(0);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  // date d'ajout d'un lieu
  const [date, setDate] = useState(null);

  const [lieux, setLieux] = useState([]);


  useEffect(() => {
  }, [lieux, tags]); // quand la liste des lieux change et quand les tags selectionne changent
  

   return (

    <React.Fragment>
      <Layout style={styles.container} level='1'>
        <Input
          style={styles.input}
          value={name}
          placeholder='Nom du lieu'
          onChangeText={(n) => setNom(n)}
        />

        <Input
          style={styles.input}
          value={adress}
          accessoryLeft={VilleIcon}
          placeholder='Adresse'
          onChangeText={(a) => setAdresse(a)}
        />
        <View style={styles.rowContainer}>
          <Input
            style={styles.inputRow}
            value={city}
            accessoryLeft={VilleIcon}
            placeholder='Ville'
            onChangeText={(v) => setVille(v)}
          />
          <Input
            style={styles.inputRow}
            value={zipCode}
            placeholder='Code postal'
            onChangeText={(cp) => setCp(cp)}
          />
        </View>
        <View style={styles.rowContainer}>
          <Input
            style={styles.inputRow}
            value={country}
            accessoryLeft={VilleIcon}
            placeholder='Pays'
            onChangeText={(c) => setCounrty(c)}
          />
        </View>
        
        <Input
          style={styles.input}
          value={description}
          multiline={true}
          textStyle={{ minHeight: 64 }}
          placeholder='Description'
          onChangeText={(d) => setDescritpion(d)}
        />

        <View style={styles.rowContainer}>
            <SelectBox
              label="Choisir une catégorie "
              options={tagsList}
              selectedValues={tags}
              onMultiSelect={onMultiChange()}
              onTapClose={onMultiChange()}
              isMulti
            />
            </View>
           {/* <View style={styles.rowContainer}>
          <Input
            style={styles.inputRow}
            placeholder='Note'
            accessoryLeft={NoteIcon}
            onChangeText={(rate) => setNote(rate)}
          />
        </View> */}

        <Button onPress={verificationFormulaire}>Ajouter le lieu</Button>

      </Layout>
    </React.Fragment>
            
  );
}

const mapStateToProps = (state) => {
  return {
    allLieux: state
  }
}

export default connect(mapStateToProps)(FormulaireAddUpdate);


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