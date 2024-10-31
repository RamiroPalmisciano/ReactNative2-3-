import React from 'react';
import { View, Button, Alert } from 'react-native';
import * as AuthSession from 'expo-auth-session';

const CLIENT_ID_GOOGLE = 'YOUR_GOOGLE_CLIENT_ID';
const CLIENT_ID_FACEBOOK = 'YOUR_FACEBOOK_CLIENT_ID';
const CLIENT_ID_APPLE = 'YOUR_APPLE_CLIENT_ID';

export default function LoginScreen() {
  const handleGoogleLogin = async () => {
    const redirectUri = AuthSession.makeRedirectUri();
    const response = await AuthSession.startAsync({
      authUrl: `https://accounts.google.com/o/oauth2/auth?client_id=${CLIENT_ID_GOOGLE}&redirect_uri=${redirectUri}&response_type=token&scope=profile email`,
    });
    
    if (response.type === 'success') {
      Alert.alert("Login exitoso", `Token: ${response.params.access_token}`);
      // Aquí puedes gestionar el token para obtener la info del perfil
    } else {
      Alert.alert("Error", "No se pudo iniciar sesión con Google");
    }
  };

  const handleFacebookLogin = async () => {
    const redirectUri = AuthSession.makeRedirectUri();
    const response = await AuthSession.startAsync({
      authUrl: `https://www.facebook.com/v8.0/dialog/oauth?client_id=${CLIENT_ID_FACEBOOK}&redirect_uri=${redirectUri}&response_type=token&scope=public_profile,email`,
    });

    if (response.type === 'success') {
      Alert.alert("Login exitoso", `Token: ${response.params.access_token}`);
    } else {
      Alert.alert("Error", "No se pudo iniciar sesión con Facebook");
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Iniciar sesión con Google" onPress={handleGoogleLogin} />
      <Button title="Iniciar sesión con Facebook" onPress={handleFacebookLogin} />
      {/* Apple SignIn solo está disponible en iOS */}
    </View>
  );
}
