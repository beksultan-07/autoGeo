import React from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { getAutos } from '../../services/getAutos';
import RenderAutos, { autoType } from '../../components/renderAutos/RenderAutos';
import AutoFilter from '../../components/autoFilter/AutoFilter';
import AutoInfo from '../../components/autoInfo/AutoInfo';

const Home = () => {
  
  const [autos, setAutos] = React.useState([])

  const [currentAutos, setCurrentAutos] = React.useState<autoType>()
  const [infoVisible, setInfoVisible] = React.useState<boolean>(false)

  const [selectedAutos, setSelectedAutos] = React.useState<Array<string>>([]);
  const [modalVisiblity, setModalVisiblity] = React.useState(false)

  React.useEffect(() => {
    setAutos(getAutos())
  }, [])

  React.useEffect(() => {
    console.log(selectedAutos);
    const allAutos = getAutos()
    setAutos(allAutos.filter(auto => selectedAutos.includes(auto.category) || selectedAutos.length === 0))
  }, [selectedAutos])

  const onSelect = (values: Array<string>) => {
    setSelectedAutos(values)
  }
  
  const autoClickHandler = (auto: autoType) => {
    setCurrentAutos(auto)
    setInfoVisible(true)
  }

  const mapClickhandler = () => {
    setInfoVisible(false)
    setModalVisiblity(false)
  }


  return (
    <View style={styles.container}>
      <AutoFilter 
        selectedValues={selectedAutos} 
        modalVisiblity={modalVisiblity}
        onSelect={onSelect} 
        openModel={(visibility: boolean) => setModalVisiblity(visibility)}
        />
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
        onPress={mapClickhandler}
      >
        <RenderAutos onAutoClick={autoClickHandler} autos={autos}/>
      </MapView>
      <AutoInfo autoInfo={currentAutos} infoVisible={infoVisible}/>
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

export default Home;