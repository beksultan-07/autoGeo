import React from 'react'
import { Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { autoType } from '../renderAutos/RenderAutos'

type Props = {
    autoInfo: autoType
    infoVisible: boolean
} 

const AutoInfo:React.FC<Props> = ({autoInfo, infoVisible}) => {


    // при нажатии позвонить
    const callHandler = (num: string) => {
        Linking.openURL(`tel:${num}`);
    }

    // при нажатии написать, перекидывает на вотсапп с готовым сообщением 
    const whatsappClickHandler = (num: string) => {
        const message = 'Добрый день, подскажите пожалуйста, какой номер заказа у вас сейчас в работе'; 
        const url = `whatsapp://send?phone=${num}&text=${encodeURIComponent(message)}`;
        Linking.openURL(url);
    }


  return (
    <View style={[styles.wrap, infoVisible ? styles.active : {}]}>
        <Text style={styles.text}>Имя: {autoInfo?.owner}</Text>
        <Text style={styles.text}>Категория: {autoInfo?.category}</Text>
        <Text style={styles.text}>Номер Телефонв: +{autoInfo?.contacts}</Text>
        <View style={styles.buttons}>
            <TouchableOpacity style={styles.button} onPress={() => callHandler(autoInfo.contacts)}>
                <Text>Позвонить</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => whatsappClickHandler(autoInfo.contacts)}>
                <Text>Написать</Text>
            </TouchableOpacity>
        </View>
    </View>
  )
}


const styles = StyleSheet.create({
    wrap: {
        backgroundColor: '#fff',
        position: 'absolute',
        bottom: '-50%',
        left: 0,
        width: '100%',
        zIndex: 1,
        padding: 20,
        paddingBottom: 60,
        borderTopColor: 'lightgray',
        borderWidth: 3
    },
    active: {
        bottom: 0,
        left: 0,
    },
    text: {
        paddingVertical: 10
    },
    buttons: {
        paddingVertical: 20,
        flexDirection: 'row',
        justifyContent: 'space-between'
    }, 
    button: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderColor: '#000',
        borderWidth: 1,
        borderRadius: 3
    }
  });

export default AutoInfo