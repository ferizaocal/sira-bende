import {useEffect} from 'react';
import {Alert} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import NotificationTypes from './NotificationTypes';

export default function FirebaseNotification() {
  useEffect(() => {
    const requestUserPermission = async () => {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        console.log('Bildirim izni verildi:', authStatus);
      } else {
        console.log('Bildirim izni reddedildi');
      }
    };

    requestUserPermission();

    const unsubscribeOnMessage = messaging().onMessage(async remoteMessage => {
      getNotificationContent(remoteMessage.data, remoteMessage);
    });

    const unsubscribeOnNotificationOpenedApp =
      messaging().onNotificationOpenedApp(remoteMessage => {
        getNotificationContent(remoteMessage.data, remoteMessage);
      });

    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          getNotificationContent(remoteMessage.data, remoteMessage);
        }
      });

    return () => {
      unsubscribeOnMessage();
      unsubscribeOnNotificationOpenedApp();
    };
  }, []);

  const getNotificationContent = (data: any, remoteMessage?: any) => {
    let notificationType = data?.notificationType;
    let notificationTitle = remoteMessage?.notification?.title;
    let notificationBody = remoteMessage?.notification?.body;

    if (notificationType) {
      switch (notificationType) {
        case NotificationTypes.DAILY_PRICE:
          Alert.alert(
            notificationTitle || 'Bildirim',
            notificationBody || 'Yeni bir bildirim var.',
            [
              {
                text: 'Tamam',
                onPress: () => console.log('Alert kapatıldı'),
              },
            ],
            {cancelable: false},
          );
          break;
        default:
          break;
      }
    }
  };

  return null;
}
