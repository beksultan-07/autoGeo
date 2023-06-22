import React from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { MapPressEvent, PROVIDER_GOOGLE } from 'react-native-maps';
import { getAutos } from './services/getAutos';
import AutosList, { autoType } from './components/autosList/AutosList';
import AutoFilter from './components/autoFilter/AutoFilter';
import AutoInfo from './components/autoInfo/AutoInfo';

const App = () => {
  
  const [autos, setAutos] = React.useState<Array<autoType>>([])

  const [currentAutos, setCurrentAutos] = React.useState<autoType>()

  const [autoInfoVisible, setAutoInfoVisible] = React.useState<boolean>(false)

  const [selectedModalVisible, setSelectedModalVisible] = React.useState(false);

  const [selectedValues, setSelectedValues] = React.useState<Array<string>>([]);

  React.useEffect(() => {
    setAutos(getAutos())
  }, [])

  React.useEffect(() => {
    const allAutos = getAutos()
    setAutos(allAutos.filter(el => selectedValues.includes(el.category) || selectedValues.length === 0))
  }, [selectedValues])

  const autoClick = (auto: autoType) => {
    setCurrentAutos(auto)
    setAutoInfoVisible(true)
  }

  const handleSelect = (values: Array<string>) => {
    setSelectedValues(values);
  };

  const mapClickHandler = (e: MapPressEvent) => {
    setAutoInfoVisible(false)
    setSelectedModalVisible(false)
  }

  return (
    <View style={styles.container}>
      <AutoFilter 
        selectedValues={selectedValues} 
        onSelect={handleSelect}
        modalVisiblity={selectedModalVisible}
        openModel={(visible: boolean) => setSelectedModalVisible(visible)}
      />
      <MapView
        onPress={(e) => mapClickHandler(e)}
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
      <AutoInfo autoInfo={currentAutos} infoVisible={autoInfoVisible}/>
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
