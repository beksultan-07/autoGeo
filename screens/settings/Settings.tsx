import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const Settings = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState('');

  const languages = ['Russian', 'English']


  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (value) => {
    setSelectedValue(value);
    setIsOpen(false);
  };

  
  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.header} 
        onPress={toggleDropdown}
      >
        <Text style={styles.headerText}>{selectedValue || 'Select'}</Text>
      </TouchableOpacity>
      {isOpen && (
        <View style={styles.dropdown}>
          {
            languages.map((lang, index) => (
              <TouchableOpacity key={index} onPress={() => handleSelect(lang)}>
                <Text style={styles.dropdownItem}>{lang}</Text>
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
    marginTop: 40
  },
  header: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  headerText: {
    fontSize: 16,
    color: '#333',
  },
  dropdown: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  dropdownItem: {
    fontSize: 16,
    paddingVertical: 8,
    color: '#333',
  },
});



export default Settings