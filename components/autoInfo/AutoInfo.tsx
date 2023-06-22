import { autoType } from 'components/autosList/AutosList'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

type Props = {
    autoInfo: autoType
    infoVisible: boolean
} 

const AutoInfo:React.FC<Props> = ({autoInfo, infoVisible}) => {
  return (
    <View style={[styles.wrap, infoVisible ? styles.active : {}]}>
        <Text style={styles.text}>name: {autoInfo?.owner}</Text>
        <Text style={styles.text}>category: {autoInfo?.category}</Text>
        <Text style={styles.text}>contacts: {autoInfo?.contacts}</Text>
        <View style={styles.buttons}>
            <TouchableOpacity style={styles.button}>
                <Text>Позвонить</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
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