import { NavigationContainer } from '@react-navigation/native';
import RootComponent from 'libraries/container/root-component';
import ToastComponent from 'libraries/toast/toast.component';
import * as React from 'react';
import MainStack from 'routing/main-navigation';
import { navigationRef } from 'routing/service-navigation';
import { StatusBar } from 'react-native';

interface AppProps {}

interface AppState {}

StatusBar.setHidden(true);

export default class App extends React.Component<AppProps, AppState> {
  public render(): React.ReactNode {
    return (
      <RootComponent>
        <NavigationContainer ref={navigationRef}>
          <MainStack />
        </NavigationContainer>
        <ToastComponent />
      </RootComponent>
    );
  }
}
