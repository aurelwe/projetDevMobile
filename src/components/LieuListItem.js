import React from 'react';
import { View } from 'react-native-web';


const LieuListItem = ({ lieuData }) => {
    return(
        <View>
            <Text>
                {lieuData.name}
            </Text>
        </View>
    );
}



export default LieuListItem;