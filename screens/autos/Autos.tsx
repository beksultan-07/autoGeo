import React from 'react'
import { StyleSheet, Text, ScrollView, View, TouchableOpacity } from 'react-native'
import { getAutos } from '../../services/getAutos'
import { autoType } from 'components/renderAutos/RenderAutos'
import { useNavigation } from '@react-navigation/native';

const Autos = () => {

  // данные с бэка
  const [autos, setAutos] = React.useState<Array<autoType>>([])


  const navigation = useNavigation();

  // получение данных
  React.useEffect(() => {
    setAutos(getAutos())
  }, [])

  // перенаправление на главную(на карту), чтоб указать где этот ТС и более подробая инфа
  const autoHandleClick = (autoData: autoType) => {
    // не пон
    navigation.navigate('Home', { auto: autoData }); 

  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerItem}>Id</Text>
        <Text style={styles.headerItem}>Имя владельца</Text>
        <Text style={styles.headerItem}>Категория</Text>
      </View>
      {
        autos.length > 0 ? autos.map((auto) => (
          <TouchableOpacity key={auto.id} onPress={() => autoHandleClick(auto)}>
            <View style={styles.body}>
              <Text style={styles.headerItem}>{auto.id}</Text>
              <Text style={styles.headerItem}>{auto.owner}</Text>
              <Text style={styles.headerItem}>{auto.category}</Text>
            </View>
          </TouchableOpacity>
        ))
        : <Text>...Loading...</Text>
      }
    </ScrollView>
  )
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingVertical: 40,
    position: 'relative',
    paddingHorizontal: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomColor: 'lightgray',
    borderTopColor: '#fff',
    borderRightColor: '#fff',
    borderLeftColor: '#fff',
    borderWidth: 1
  },
  headerItem: {
    flex: 1,
    textAlign: 'left',
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
  }, 
  body: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  }
})

export default Autos