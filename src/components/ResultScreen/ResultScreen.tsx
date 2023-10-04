import React from 'react';
import {
  Linking,
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

interface ResultScreenProps {
  route: ResultScreenRouteProp;
  navigation: StackNavigationProp<any>;
}
type Item = {
  id: string;
  img_url: string;
};

type Props = {
  brickCode: string;
  anotherApiUrl: string;
  items: Item[];
  navigation: StackNavigationProp<any>;
};

type RouteParams = {
  Result: Props;
};

type ResultScreenRouteProp = RouteProp<RouteParams, 'Result'>;

const ResultScreen: React.FC<ResultScreenProps> = ({ route, navigation }) => {
  const { brickCode, items } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Pressable
        style={styles.backButton}
        onPress={() => navigation.navigate('Scan Brick')}
      >
        <Text style={styles.backButtonText}>SCAN A NEW BRICK</Text>
      </Pressable>
      <Text style={styles.codeText}>{brickCode}</Text>

      {items?.map((item, index) => (
        <View key={index} style={styles.gridItem}>
          <Image style={styles.image} source={{ uri: item.img_url }} />
          <Pressable
            style={styles.overlay}
            onPress={() =>
              Linking.openURL(
                `https://store.bricklink.com/Troepster?p=Troepster&sortBy=1&stateID=27085#/shop?o={"itemID":${item.id},"showHomeItems":0}`
              )
            }
          >
            <Text style={styles.buttonText}>VIEW IN STORE</Text>
          </Pressable>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  codeText: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  gridItem: {
    position: 'relative',
    padding: 60,
  },
  image: {
    width: '100%',
    height: 200,
  },
  overlay: {
    position: 'relative',

    alignItems: 'center',
    backgroundColor: '#000',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 2,
    width: '100%',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  backButton: {
    backgroundColor: '#000',
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
  backButtonText: {
    color: '#fff',
    textAlign: 'center',
  },
});

export default ResultScreen;
