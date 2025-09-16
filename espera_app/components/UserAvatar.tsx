import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

type Props = {
  name: string;
};

export default function UserAvatar({ name }: Props) {
  return (
    <View style={styles.container}>
      <FontAwesome name="user-circle" size={32} color="#555" />
      {/* <Image source={require('../assets/usuario.png')} style={styles.image} /> */}
      <Text style={styles.name}>{name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', marginBottom: 20 },
  image: { width: 150, height: 150, borderRadius: 75, marginVertical: 10 },
  name: { fontSize: 18, fontWeight: '600' },
});