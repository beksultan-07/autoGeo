import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'


type Props = {
    handleSelect(value: string): void
}

const AutoFilter:React.FC<Props> = ({handleSelect}) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [selectedValue, setSelectedValue] = React.useState('');
    const [options] = React.useState(['B', 'C', 'D', 'all']);



//   const handleSelect = (value) => {
//     setSelectedValue(value);
//     setIsOpen(false);
//   };

  return (
    <View style={styles.container}>
        <TouchableOpacity style={styles.header} onPress={() => setIsOpen(!isOpen)}>
        <Text>{`Категория ${selectedValue}` || 'Категории'}</Text>
        </TouchableOpacity>

    {isOpen && (
      <View style={styles.dropdown}>
        {
            options.map((option, index) => (
                <TouchableOpacity
                    key={index}
                    style={styles.dropDownItem} 
                    onPress={() => handleSelect(option)}
                >
                    <Text>Категория {option}</Text>
                </TouchableOpacity>
            ))
        }  
      </View>
    )}
  </View>
  )
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        zIndex: 1
    },
    header: {
        backgroundColor: '#f0f0f0',
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderRadius: 5,
    },
    dropdown: {
        position: 'absolute',
        top: '100%',
        left: 0,
        zIndex: 1,
        width: '100%',
        padding: 10,
        backgroundColor: '#f0f0f0',
    },
    dropDownItem: {
        paddingVertical: 10 
    }
});
    

export default AutoFilter