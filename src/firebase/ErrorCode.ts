const ErrorCode = (errorCode: string) => {
  switch (errorCode) {
    case 'auth/invalid-email':
      return 'Lütfen geçerli bir e-posta adresi giriniz';
    case 'auth/user-disabled':
      return 'Bu kullanıcı devre dışı bırakılmıştır';
    case 'auth/user-not-found':
      return 'Kullanıcı bulunamadı';
    case 'auth/wrong-password':
      return 'Hatalı şifre';
    case 'auth/email-already-in-use':
      return 'Bu e-posta adresi zaten kullanımda';
    case 'auth/operation-not-allowed':
      return 'Bu işlem izin verilmiyor';
    case 'auth/weak-password':
      return 'Şifre zayıf';
    default:
      return 'Bir hata oluştu';
  }
};
export default ErrorCode;
