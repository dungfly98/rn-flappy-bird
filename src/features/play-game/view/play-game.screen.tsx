/* 
  Created by dungnt at 09-03-2020 09:11:55
  Màn hình Bắt đầu chơi game
*/

import { Constants } from 'constans/constants';
import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { GameEngine } from 'react-native-game-engine';
import R from 'res/R';
import { PlayGameAdapter, PlayGameProps, PlayGameState } from '../model';
import Physics from './components/physics';

export default class PlayGameScreen extends React.PureComponent<PlayGameProps, PlayGameState> {
  private adapter: PlayGameAdapter;

  public gameEngine: any;

  private entities: any;

  constructor(props: PlayGameProps) {
    super(props);
    this.adapter = new PlayGameAdapter(this);

    this.state = {
      running: true,
      score: 0,
    };

    this.gameEngine = null;
    this.entities = this.adapter.setupWorld();
  }

  public render(): React.ReactNode {
    return (
      <View style={styles.container}>
        {/* Background Image */}
        <FastImage
          source={R.images.background}
          style={styles.backgroundImage}
          resizeMode="stretch"
        />
        <GameEngine
          ref={(ref) => {
            this.gameEngine = ref;
          }}
          style={styles.gameContainer}
          systems={[Physics]}
          running={this.state.running}
          onEvent={this.adapter.onEvent}
          entities={this.entities}
        />
        {/* Count Point */}
        <Text style={styles.score}>{this.state.score}</Text>

        {/* Restart Game */}
        {!this.state.running && (
          <TouchableOpacity style={styles.fullScreenButton} onPress={this.adapter.reset}>
            <View style={styles.fullScreen}>
              <Text style={styles.gameOverText}>Game Over</Text>
              <Text style={styles.gameOverSubText}>Try Again</Text>
            </View>
          </TouchableOpacity>
        )}
      </View>
    );
  }
}

// styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    width: Constants.MAX_WIDTH,
    height: Constants.MAX_HEIGHT,
  },
  gameContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  gameOverText: {
    color: 'white',
    fontSize: 48,
    // fontFamily: '04b_19',
  },
  gameOverSubText: {
    color: 'white',
    fontSize: 24,
    // fontFamily: '04b_19',
  },
  fullScreen: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'black',
    opacity: 0.8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  score: {
    position: 'absolute',
    color: 'white',
    fontSize: 72,
    top: 50,
    left: Constants.MAX_WIDTH / 2 - 20,
    textShadowColor: '#444444',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 2,
    // fontFamily: '04b_19',
  },
  fullScreenButton: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    flex: 1,
  },
});
