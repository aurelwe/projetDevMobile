import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ActivityIndicator, ScrollView  } from 'react-native';
import { getLieuDetails } from '../data/RecupereData';

const DetailsLieu = ({ route }) => {

  const [isLoading, setIsLoading] = useState(true);
  const [lieu, setLieu] = useState(null);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    requestLieu();
  }, []); // Uniquement à l'initialisation

  const requestLieu = async () => {
    try {
      const jsonLieuResult = await getLieuDetails(route.params.lieuID);
      setLieu(jsonLieuResult);
      setIsLoading(false);
    } catch (error) {
      setIsError(true);
    }
  }



  return (
    <View>
      {isError ?
        (<DisplayError message='Impossible de récupérer les données du restaurants' />) :
        (isLoading ?   
          (<View style={styles.containerLoading}>
            <ActivityIndicator size="large" />
          </View>) :
          
            (<ScrollView>
              <View>
                <View>
                  <Text>
                    {lieu.name}
                  </Text>
                </View>

                <View>
                  <Text>
                    {lieu.description}
                  </Text>
                </View>

                <View >
                  <Text>
                    {lieu.tag}
                  </Text>
                </View>

                <View >
                  <Text>
                    {lieu.location.address}
                  </Text>
                  <Text>
                    {lieu.location.city}
                  </Text>
                  <Text>
                    {lieu.location.zip}
                  </Text>
                </View>
              </View>
              
            </ScrollView>)
        )
          
        }
        
    </View>
  );
};

export default DetailsLieu;

const styles = StyleSheet.create({
  containerLoading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});