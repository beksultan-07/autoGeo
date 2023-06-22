import React from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { useRoute } from '@react-navigation/native';

import RenderAutos, { autoType } from '../../components/renderAutos/RenderAutos';
import AutoFilter from '../../components/autoFilter/AutoFilter';
import AutoInfo from '../../components/autoInfo/AutoInfo';

import { getAutos } from '../../services/getAutos';


const Home = () => {
  
  // данные из бэка
  const [autos, setAutos] = React.useState([])

  // ТС на который нажал юзер
  const [currentAutos, setCurrentAutos] = React.useState<autoType>()
  // показывает или скрывает инфу о ТС 
  const [infoVisible, setInfoVisible] = React.useState<boolean>(false)

  // выбранные категории при фильтрации 
  const [selectedAutos, setSelectedAutos] = React.useState<Array<string>>([]);
  // показывает или скрывает дропдаун фильтрации 
  const [modalVisiblity, setModalVisiblity] = React.useState(false)

  const mapRef = React.useRef<MapView>(null);
  const route = useRoute();

  // если юэер нажал в списке на один ТС, то она переводит на карту и указывает на этот ТС с полной информацией 
  React.useEffect(() => {
    // не пон ошибку
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
  

  // авто фильтрация ТС
  React.useEffect(() => {
    const allAutos = getAutos()
    setAutos(allAutos.filter(auto => selectedAutos.includes(auto.category) || selectedAutos.length === 0))
  }, [selectedAutos])

  // добавляет категорию для фильтрации 
  const onSelect = (values: Array<string>) => {
    setSelectedAutos(values)
  }
  
  // при нажатии на ТС на карте
  const autoClickHandler = (auto: autoType) => {
    setCurrentAutos(auto)
    setInfoVisible(true)
  }

  // при нажатии на карту, чтоб все очистить
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