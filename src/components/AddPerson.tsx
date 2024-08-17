import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faPlus, faTrashCan} from '@fortawesome/free-solid-svg-icons';

export default function AddPerson({onPeopleChange, people}) {
  const [personName, setPersonName] = useState<string>('');
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const handleAddPerson = () => {
    if (personName.trim()) {
      const updatedPeople = [...people, personName.trim()];
      onPeopleChange(updatedPeople);
      setPersonName('');
    }
  };

  const handleDeletePerson = (index: number) => {
    Alert.alert(
      'Silmek Üzeresiniz',
      'Bu kişiyi silmek istediğinizden emin misiniz?',
      [
        {
          text: 'Hayır',
          onPress: () => console.log('Silme işlemi iptal edildi'),
          style: 'cancel',
        },
        {
          text: 'Evet',
          onPress: () => {
            const updatedPeople = people.filter((_, i) => i !== index);
            onPeopleChange(updatedPeople);
          },
        },
      ],
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Kişi Ekle:</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, isFocused && styles.inputFocused]}
          value={personName}
          onChangeText={setPersonName}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        <TouchableOpacity onPress={handleAddPerson} style={styles.addButton}>
          <FontAwesomeIcon icon={faPlus} color="#fafafa" size={20} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={people}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item, index}) => (
          <View style={styles.personCard}>
            <Text style={styles.personName}>{item}</Text>
            <TouchableOpacity
              onPress={() => handleDeletePerson(index)}
              style={styles.deleteButton}>
              <FontAwesomeIcon icon={faTrashCan} size={20} color="#4F79AD" />
            </TouchableOpacity>
          </View>
        )}
        contentContainerStyle={styles.peopleList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#4F709C',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
  },
  input: {
    flex: 1,
    height: 46,
    backgroundColor: '#fafafa',
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 5,
    fontSize: 14,
    paddingHorizontal: 10,
  },
  inputFocused: {
    borderColor: '#6482AD',
  },
  addButton: {
    marginLeft: 10,
    height: 46,
    width: 46,
    backgroundColor: '#4F79AD',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 23,
  },
  personCard: {
    backgroundColor: '#F4F9F9',
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    borderRadius: 5,
    marginBottom: 10,
    borderColor: '#7FA1C3',
    borderWidth: 1,
  },
  personName: {
    fontSize: 16,
  },
  peopleList: {
    height: 350,
    marginTop: 20,
    flexGrow: 1,
  },
  deleteButton: {
    display: 'flex',
  },
});
