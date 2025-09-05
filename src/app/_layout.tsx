
import { Stack, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import AuthModal from './authModal'; // Import the modal
import SplashScreen from './splash';
import { useAuthStore } from '../state/authStore';

export default function RootLayout() {
  const [showSplash, setShowSplash] = useState(true);
  const { user } = useAuthStore();
  const [modalVisible, setModalVisible] = useState(false);
  const [authAttempted, setAuthAttempted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const splashTimer = setTimeout(() => setShowSplash(false), 1000);
    return () => clearTimeout(splashTimer);
  }, []);

  useEffect(() => {
    if (showSplash) return;

    if (user) {
      // If user is logged in, ensure modal is closed and navigate to tabs.
      setModalVisible(false);
      router.replace('/(tabs)');
    } else if (!authAttempted) {
      // If no user and we haven't shown the modal yet, show it.
      setModalVisible(true);
    }
  }, [showSplash, user, authAttempted, router]);

  const handleCloseModal = () => {
    // This is called on successful login OR on skip.
    setModalVisible(false);
    // Mark that the user has passed the auth screen.
    setAuthAttempted(true);
    // If the user skipped, they won't have a `user` object, so we need to manually navigate.
    // If they logged in, the `user` object will trigger the useEffect, but this navigation is harmless.
    router.replace('/(tabs)');
  };

  if (showSplash) {
    return <SplashScreen />;
  }

  return (
    <>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="sellerLogin" options={{ headerShown: false }} />
        <Stack.Screen name="deliveryPartnerLogin" options={{ headerShown: false }} />
      </Stack>
      <AuthModal visible={modalVisible} onClose={handleCloseModal} />
    </>
  );
}
