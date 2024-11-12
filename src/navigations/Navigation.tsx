import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../screens/Home';
import AddTask from '../screens/AddTask';
import EditTask from '../screens/EditTask';
import Login from '../screens/Login';
import FirebaseNotification from '../firebase/FirebaseNotification';

const Stack = createStackNavigator();

export const Navigation = () => {
  return (
    <NavigationContainer>
      <FirebaseNotification />
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="AddTask" component={AddTask} />
        <Stack.Screen name="EditTask" component={EditTask} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
