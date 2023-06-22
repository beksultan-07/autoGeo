import React from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { useRoute } from '@react-navigation/native';
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

  const mapRef = React.useRef<MapView>(null);
  const route = useRoute();

  React.useEffect(() => {
    setAutos(getAutos())
  }, [])

  React.useEffect(() => {
    const auto = route.params?.auto;
    
    if (auto) {
      setCurrentAutos(auto);
      setInfoVisible(true);

      if (mapRef.current) {
        mapRef.current.animateToRegion({
          latitude: auto.coordinate.latitude,
          longitude: auto.coordinate.longitude,
          latitudeDelta: 0,
          longitudeDelta: 0
        });
      }
    }
  }, [route])
  

  React.useEffect(() => {
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
    setCurrentAutos(null)
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
        ref={mapRef}
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