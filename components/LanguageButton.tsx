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
}

const LanguageButton: React.FC<LanguageButtonProps> = ({ item, theme }) => {
  return (
    <View style={[styles.buttonContainer, { backgroundColor: theme.background }]}>
      <Pressable
        style={styles.button}
        onPress={() => {
          console.log(item.name); // Logga il nome della lingua selezionata
        }}
      >
        <Text style={[styles.buttonText, { color: theme.text }]}>{item.name}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    width: 120,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    borderRadius: 10,
  },
  button: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(202,202,202)',
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 20,
    textAlign: 'center',
  },
});

export default LanguageButton;
