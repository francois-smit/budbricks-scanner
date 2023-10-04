import React from 'react';
import { Pressable, Text, View, StyleSheet, Image } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

type Props = {
  navigation: StackNavigationProp<any>;
};

const LandingScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image source={require('../../../assets/logo.png')} style={styles.logo} />
      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate('Scan Brick')}
      >
        <Text style={styles.buttonText}>SCAN A BRICK NOW</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
    paddingBottom: 100,
  },
  button: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 2,
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
    textAlign: 'center',
  },
  logo: {
    flex: 1,
    width: 300,
    height: null,
    resizeMode: 'contain',
  },
});

export default LandingScreen;
