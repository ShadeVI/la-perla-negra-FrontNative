import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

interface LanguageButtonProps {
  item: { 
    id: string; 
    name: string;
  };
  theme: {
    background: string;
    text: string;
  };
  styles: {
    buttonContainer: object;
    button: object;
    buttonText: object;
    };
}

const LanguageButton: React.FC<LanguageButtonProps> = ({ item, theme,
    styles }) => {
  return (
    <View key={item.id} style={[styles.buttonContainer, { backgroundColor: theme.background }]}>
      <Pressable
        style={styles.button}
        onPress={() => {
          console.log(item.name); 
          // Ora restiruisce in console il nome della lingua selezionata
        }}
      >
        <Text style={[styles.buttonText, { color: theme.text }]}>{item.name}</Text>
      </Pressable>
    </View>
  );
};

export default LanguageButton;
