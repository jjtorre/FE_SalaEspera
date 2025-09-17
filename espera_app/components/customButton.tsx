import React from 'react';
import { TouchableOpacity, Text, StyleSheet,StyleProp,ViewStyle } from 'react-native';

type Props = {
  title: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  variant?: 'primary' | 'secondary' | 'tertiary';
};

export default function CustomButton({title, onPress, variant = 'primary'}: Props) {
    const styles = getStyles(variant);

  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const getStyles = (variant: 'primary' | 'secondary' | 'tertiary' ) => 
    StyleSheet.create({
        button: {
            padding: 12, 
            margin: 10,
            borderRadius: 6,
            backgroundColor: 
                variant === 'primary' ? '#1c1c30' : 
                variant === 'secondary' ? '#65659c':
                '#dfdff7',
            borderWidth: variant === 'tertiary'? 1 : 0,
            borderColor: '#ccc'
        },
        text:{
            color: 
            variant === 'primary' || variant === 'secondary' ?
                '#ededf7' : '#010117',
            fontWeight: 'bold'
        },
    })


