import React, { useState, useEffect, useRef } from 'react';
import { Camera } from 'expo-camera';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View, Text, Pressable, Image } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import * as FileSystem from 'expo-file-system';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';

type RootStackParamList = {
  'Scan Result': { response: any; items: any[] };
};
type CameraScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Scan Result'
>;

const CameraScreen: React.FC = () => {
  const navigation = useNavigation<CameraScreenNavigationProp>();
  const cameraRef = useRef<Camera>(null);
  const [loading, setLoading] = useState(false);
  const [joke, setJoke] = useState<{ setup: string; punchline: string } | null>(
    null
  );

  useEffect(() => {
    const fetchData = async () => {
      const options = {
        method: 'GET',
        url: 'https://dad-jokes.p.rapidapi.com/random/joke',
        headers: {
          'X-RapidAPI-Key':
            'd57bd6314amsh778f3cdbba2abc0p17fc89jsndf27efdc08cb',
          'X-RapidAPI-Host': 'dad-jokes.p.rapidapi.com',
        },
      };

      try {
        const response = await axios.request(options);
        if (response.data.success) {
          setJoke({
            setup: response.data.body[0].setup,
            punchline: response.data.body[0].punchline,
          });
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need camera permissions.');
      }
    })();
  }, []);
  useFocusEffect(
    React.useCallback(() => {
      return () => setLoading(false);
    }, [])
  );

  const handleCapture = async () => {
    setLoading(true);
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      handleUpload(photo.uri); // Automatically upload
    }
  };

  const handleUpload = async (uri: string) => {
    setLoading(true);
    try {
      const options = {
        httpMethod: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
        mimeType: 'image/jpeg',
        uploadType: FileSystem.FileSystemUploadType.MULTIPART,
        fieldName: 'query_image',
      };

      const res = await FileSystem.uploadAsync(
        'https://api.brickognize.com/predict/',
        uri,
        options as any
      );

      const responseData = JSON.parse(res.body);
      navigation.navigate('Scan Result', {
        response: responseData,
        items: responseData.items,
      });
    } catch (err: any) {
      console.error(err);
    }
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.loadingOverlay}>
          <Image source={require('../../../assets/loading.gif')} />
          <Text style={styles.loadingText}>LOADING... {'\n'}</Text>

          <Text style={styles.jokeHead}>{joke?.setup}</Text>
          <Text style={styles.joke}>{joke?.punchline}</Text>
        </View>
      ) : null}
      <Camera
        ref={cameraRef}
        style={StyleSheet.absoluteFillObject}
        type={(Camera.Constants.Type as any)['back']}
      >
        <View style={styles.buttonView}>
          <Pressable
            onPress={handleCapture}
            disabled={loading}
            style={styles.button}
          >
            <Text>CAPTURE</Text>
          </Pressable>
        </View>
      </Camera>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#444',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    padding: 20,
  },
  loadingText: {
    color: '#fff',
    fontSize: 13,
  },
  buttonView: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 36,
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#fff',
    color: '#000',
    borderRadius: 2,
    alignItems: 'center',
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 34,
    paddingRight: 34,
  },
  jokeHead: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 13,
    textAlign: 'center',
  },
  joke: {
    color: '#fff',
    fontSize: 11,
    textAlign: 'center',
  },
});

export default CameraScreen;
