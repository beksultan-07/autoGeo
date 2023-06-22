import { autoType } from 'components/autosList/AutosList'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

type Props = {
    autoInfo?: autoType
    closeAutoInfo(): void
} 

const AutoInfo:React.FC<Props> = ({autoInfo, closeAutoInfo}) => {
  return (
    <View style={[styles.wrap, autoInfo ? styles.active : {}]}>
        <Text style={styles.text} onPress={closeAutoInfo}>Close</Text>
        <Text style={styles.text}>name: {autoInfo?.owner}</Text>
        <Text style={styles.text}>category: {autoInfo?.category}</Text>
        <Text style={styles.text}>contacts: {autoInfo?.contacts}</Text>
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
    },
    active: {
        bottom: 0,
        left: 0,
    },
    text: {
        paddingVertical: 10
    }
  });

export default AutoInfo