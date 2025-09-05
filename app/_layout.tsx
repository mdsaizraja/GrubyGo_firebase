
import { Stack } from 'expo-router';
import React, { useEffect, useState } from 'react';
import SplashScreen from './splash';
import AuthModal from './authModal'; // Import the modal

export default function RootLayout() {
  const [showSplash, setShowSplash] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Assume user is not logged in
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    // Show splash screen for 1 second
    const splashTimer = setTimeout(() => {
      setShowSplash(false);
    }, 1000);

    return () => clearTimeout(splashTimer);
  }, []);

  useEffect(() => {
    // If the splash screen is hidden and the user is not logged in, show the modal
    if (!showSplash && !isLoggedIn) {
      setModalVisible(true);
    }
  }, [showSplash, isLoggedIn]);

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  // Show the splash screen first
  if (showSplash) {
    return <SplashScreen />;
  }

  return (
    <>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
      </Stack>
      <AuthModal visible={modalVisible} onClose={handleCloseModal} />
    </>
  );
}
