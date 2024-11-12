# Sıra Bende

Sıra Bende, kullanıcıların görevleri sırasıyla birbirlerine devretmesini sağlayan bir görev yönetim uygulamasıdır. Her kullanıcıya belirli bir görev atanır ve bu görevlerin sırası, seçilen periyot tipine göre otomatik olarak düzenlenir. Uygulama, Firebase ile veritabanı yönetimi sağlar ve React Native ile mobil platformlarda çalışır.

![Sıra Bende Demo](src/assets/gif/sira-bende-demo.gif)

## Özellikler

- **Görev oluşturma**: Kullanıcılar, görev adı, başlangıç tarihi, bitiş tarihi, periyot tipi ve katılımcılar ekleyebilir.
- **Görev listeleme ve silme**: Kullanıcılar görevlerini listeleyebilir ve silebilir.
- **Görev düzenleme**: Mevcut görevlerin bilgileri düzenlenebilir.
- **Kullanıcılar arası görev dağılımı**: Görevler, katılımcılar arasında belirli bir periyoda göre sırasıyla dağıtılır.
- **Push bildirimleri**: Kullanıcıya bildirim gönderilir.

## Kullanılan Teknolojiler ve Kütüphaneler

- **React Native**: Mobil uygulama geliştirme framework'ü.
- **TypeScript**: Tip güvenliği sağlayan JavaScript üzerine kurulu dil.
- **Firebase**: Gerçek zamanlı veritabanı ve kimlik doğrulama servisi.
- **React Navigation**: Uygulama içi sayfa geçişleri için kullanılan yönlendirme kütüphanesi.
- **Lottie React Native**: Uygulama içi animasyonları entegre etmek için kullanılan kütüphane.
- **Moment.js & Dayjs**: Tarih ve saat işlemleri için kullanılan kütüphaneler.
- **FontAwesome**: Uygulamada ikonlar kullanmak için kullanılan kütüphane.
- **React Native Firebase**: Firebase ile entegrasyon için kullanılan kütüphane.
- **Google Sign-In**: Google ile kullanıcı giriş işlemleri.
- **Apple Authentication**: Apple ile oturum açma için kullanılan kütüphane.
- **React Native Modal DateTime Picker**: Tarih ve saat seçici modallar.
- **React Native AsyncStorage**: Uygulama içinde basit veri depolama.
- **React Native Gesture Handler**: Kullanıcı etkileşimlerini yönetmek için kullanılan kütüphane.
- **React Native SVG**: SVG görsellerini uygulamaya entegre etmek için kullanılan kütüphane.
- **React Native Dropdown Picker**: Dropdown menü oluşturma için kullanılan kütüphane.
- **React Native Safe Area Context**: Güvenli alan yönetimi için kullanılan kütüphane.

## Kurulum

Bu projeyi yerel ortamınızda çalıştırmak için aşağıdaki adımları takip edebilirsiniz:

1. **Depoyu klonlayın**:
   git clone https://github.com/ferizaocal/sira-bende.git

2. **Bağımlılıkları yükleyin: Projenin bulunduğu klasöre gidin ve bağımlılıkları yüklemek için aşağıdaki komutu çalıştırın**:
   npm install

3. **Proje çalıştırın**:
   npm start

   **iOS için**: npm run ios

   **Android için**: npm run android

## **Lisans**

Bu proje **MIT Lisansı** ile lisanslanmıştır.

## **Yazarlar**

- **Feriza Nur Öcal** - Proje geliştiricisi
- Projeyle ilgili herhangi bir sorunuz varsa, lütfen **ferizaocal60@gmail.com** adresinden benimle iletişime geçin.
