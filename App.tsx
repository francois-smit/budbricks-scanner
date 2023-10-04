import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { LandingScreen } from './src/components/LandingScreen/';
import { CameraScreen } from './src/components/CameraScreen/';
import { ResultScreen } from './src/components/ResultScreen/';

const Stack = createStackNavigator();

const WrappedResultScreen = (props: any) => <ResultScreen {...props} />;

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="BudBricks Scanner" component={LandingScreen} />
        <Stack.Screen name="Scan Brick" component={CameraScreen} />
        <Stack.Screen name="Scan Result" component={WrappedResultScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
