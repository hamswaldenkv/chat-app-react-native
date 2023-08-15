import AsyncStorage from '@react-native-community/async-storage';

export async function getKey(key) {
  return await AsyncStorage.getItem(key);
}

export async function removeKey(key) {
  return await AsyncStorage.removeItem(key);
}

export async function saveKey(key, value) {
  await AsyncStorage.setItem(key, value);
}
