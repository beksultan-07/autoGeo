import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { getAutos } from './services/getAutos';
import AutosList, { autoType } from './components/autosList/AutosList';
import carIcon from './assets/car.png'

const App = () => {
  
  const [autos, setAutos] = React.useState([])

  const autoClick = (auto: autoType) => {
    console.log('car');
  }


  React.useEffect(() => {
    setAutos(getAutos())
  }, [])
  


  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        showsUserLocation={true}
      >
        {/* <Marker
          coordinate={{
            latitude: 37.78825,
          longitude: -122.4324,
          }}
          image={carIcon}
        /> */}

        <AutosList autoClick={autoClick} autos={autos}/>
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ccc',
    marginTop: 40
  },
  map: {
    width: '100%',
    height: '100%',
  },
});

export default App;
