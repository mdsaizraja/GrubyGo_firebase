import auth from '@react-native-firebase/auth';

export const getFirebaseIdToken = async () => {
  try {
    // Force-refresh the token to ensure it's not expired.
    const idToken = await auth().currentUser.getIdToken(true);
    return idToken;
  } catch (error) {
    console.error('Error getting Firebase ID token:', error);
    throw error;
  }
};
