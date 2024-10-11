import React, {useMemo, useState} from 'react';
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
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import PersonModel from '../models/PersonModel';
import TaskRepository from '../repository/TaskRepository';
import LottieView from 'lottie-react-native';
import {DeleteAnimation} from '../assets/animations';

interface AddPersonProps {
  onPeopleChange: (people: PersonModel[]) => void;
  people: PersonModel[];
  taskName: string;
}
export default function AddPerson({
  onPeopleChange,
  people,
  taskName,
}: AddPersonProps) {
  const [personName, setPersonName] = useState<string>('');
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const taskRepo = useMemo(() => TaskRepository.getInstance(), []);
  //const taskRepo = TaskRepository.getInstance();

  const handleAddPerson = () => {
    if (personName.trim()) {
      const updatedPeople = [
        ...people,
        {
          personFullName: personName.trim(),
          shareUrl: '',
          inJoined: false,
          isStart: false,
          isNewAdded: true,
        } as PersonModel & {isNewAdded: boolean},
      ];
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
          style: 'cancel',
        },
        {
          text: 'Evet',
          onPress: async () => {
            const updatedPeople = people.filter(
              (a: PersonModel, i: number) => i !== index,
            );
            const personToDelete = people[index] as PersonModel & {
              isNewAdded: boolean;
            };
            if (personToDelete.isNewAdded) {
              onPeopleChange(updatedPeople);
              return;
            }
            try {
              await taskRepo.deletePersonFromTask(taskName, personToDelete.id);
              onPeopleChange(updatedPeople);
            } catch (error) {
              Alert.alert('Hata', 'Kişi silinirken bir hata oluştu.');
            }
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
        keyExtractor={(item, index) =>
          item.id ? item.id.toString() : index.toString()
        }
        renderItem={({item, index}) => (
          <View style={styles.personCard}>
            <Text style={styles.personName}>{item.personFullName}</Text>
            <TouchableOpacity
              onPress={() => handleDeletePerson(index)}
              style={styles.deleteButton}>
              <LottieView
                autoPlay
                loop
                style={{height: 30, width: 30}}
                source={DeleteAnimation}
              />
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
    fontSize: 15,
    paddingHorizontal: 10,
  },
  inputFocused: {
    borderColor: '#6482AD',
  },
  addButton: {
    marginLeft: 10,
    height: 46,
    width: 46,
    backgroundColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 23,
  },
  personCard: {
    backgroundColor: '#F4F9F9',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    borderRadius: 5,
    marginBottom: 10,
    borderColor: '#7FA1C3',
    borderWidth: 1,
  },
  personName: {
    flex: 1,
    fontSize: 16,
  },
  peopleList: {
    height: 350,
    marginTop: 20,
  },
  deleteButton: {
    flex: 0.06,
  },
});
