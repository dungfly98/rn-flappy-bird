import { createStackNavigator } from '@react-navigation/stack';
import PlayGameScreen from 'features/play-game/view/play-game.screen';
import * as React from 'react';
import * as ScreenName from 'routing/screen-name';

const Stack = createStackNavigator();

function MainStack(): JSX.Element {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={ScreenName.PlayGameScreen} component={PlayGameScreen} />
    </Stack.Navigator>
  );
}

export default MainStack;
