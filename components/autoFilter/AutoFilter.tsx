import React from 'react'
import { FlatList } from 'react-native'
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'


type Props = {
    selectedValues: any[]
    onSelect: (values: any) => void
    openModel(visibility: boolean): void
    modalVisiblity: boolean
}

const AutoFilter:React.FC<Props> = ({ selectedValues, onSelect, openModel, modalVisiblity }) => {

    const options = ['B', 'D', 'C'];

    const toggleOption = (value: string) => {
        const isSelected = selectedValues.includes(value);
        if (isSelected) {
            const updatedValues = selectedValues.filter((val) => val !== value);
            onSelect(updatedValues);
        } else {
            const updatedValues = [...selectedValues, value];
            onSelect(updatedValues);
        }
    };
  
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => openModel(!modalVisiblity)} style={styles.dropdownButton}>
          <Text>{selectedValues.length > 0 ? selectedValues.join(', ') : 'Выберите категории ТС'}</Text>
        </TouchableOpacity>

          <View style={[styles.modalContainer, modalVisiblity && styles.active]}>
            <FlatList
              data={options}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.option}
                  onPress={() => toggleOption(item)}
                >
                  <Text>Категория {item}</Text>

                  {selectedValues.includes(item) && (
                    <Text style={styles.selectedText}>Selected</Text>
                  )}
                
                </TouchableOpacity>
              )}
            />
          </View>
      </View>
  )
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        zIndex: 1,
    },
    dropdownButton: {
        padding: 10,
        backgroundColor: '#fff'
    },
    modalContainer: {
        position: 'absolute',
        width: '100%',
        left: 0,
        top: '-1000%',
        paddingHorizontal: 20,
        backgroundColor: 'white',
    },
    active: {
        top: '100%',
    },
    option: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 10,
      borderBottomWidth: 1,
      borderBottomColor: 'lightgray',
    },
    selectedText: {
      color: 'green',
      fontWeight: 'bold',
    },
  });
   

export default AutoFilter