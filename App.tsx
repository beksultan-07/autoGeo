import React from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { getAutos } from './services/getAutos';
import AutosList, { autoType } from './components/autosList/AutosList';
import AutoFilter from './components/autoFilter/AutoFilter';
import AutoInfo from './components/autoInfo/AutoInfo';

const App = () => {
  
  const [autos, setAutos] = React.useState([])

  const [currentAutos, setCurrentAutos] = React.useState<autoType | null >()

  const [selectedAutos, setSelectedAutos] = React.useState('');


  const autoClick = (auto: autoType) => {
    setCurrentAutos(auto)
  }

  const handleSelect = (value: string) => {
    setSelectedAutos(value);
  };

  React.useEffect(() => {
    setAutos(getAutos())
  }, [])

  React.useEffect(() => {
    console.log(selectedAutos);
    const allAutos = getAutos()
    setAutos(allAutos.filter(el => el.category === selectedAutos || selectedAutos === 'all'))
  }, [selectedAutos])
  


  return (
    <View style={styles.container}>
      <AutoFilter handleSelect={handleSelect}/>
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
        <AutosList autoClick={autoClick} autos={autos}/>
      </MapView>
      <AutoInfo autoInfo={currentAutos} closeAutoInfo={() => setCurrentAutos(null)}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ccc',
    paddingTop: 40,
    position: 'relative'
  },
  map: {
    width: '100%',
    height: '100%',
  },
});

export default App;
