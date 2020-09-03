/* 
  Created by dungnt at 09-03-2020 09:11:55
  Màn hình Bắt đầu chơi game
*/

import { Constants } from 'constans/constants';
import Matter from 'matter-js';
import PlayGameScreen from '../view/play-game.screen';
import Floor from '../view/components/floor';
import Bird from '../view/components/bird';
import { resetPipes } from '../view/components/physics';

export class PlayGameAdapter {
  private view: PlayGameScreen;
  constructor(view: PlayGameScreen) {
    this.view = view;
  }

  public setupWorld = () => {
    let engine = Matter.Engine.create({ enableSleeping: false });
    let world = engine.world;
    world.gravity.y = 0.0;

    let bird = Matter.Bodies.rectangle(
      Constants.MAX_WIDTH / 2,
      Constants.MAX_HEIGHT / 2,
      Constants.BIRD_WIDTH,
      Constants.BIRD_HEIGHT
    );

    let floor1 = Matter.Bodies.rectangle(
      Constants.MAX_WIDTH / 2,
      Constants.MAX_HEIGHT - 25,
      Constants.MAX_WIDTH + 4,
      50,
      { isStatic: true }
    );

    let floor2 = Matter.Bodies.rectangle(
      Constants.MAX_WIDTH + Constants.MAX_WIDTH / 2,
      Constants.MAX_HEIGHT - 25,
      Constants.MAX_WIDTH + 4,
      50,
      { isStatic: true }
    );

    Matter.World.add(world, [bird, floor1, floor2]);
    Matter.Events.on(engine, 'collisionStart', (event) => {
      var pairs = event.pairs;

      this.view.gameEngine.dispatch({ type: 'game-over' });
    });

    return {
      physics: { engine: engine, world: world },
      floor1: { body: floor1, renderer: Floor },
      floor2: { body: floor2, renderer: Floor },
      bird: { body: bird, pose: 1, renderer: Bird },
    };
  };

  onEvent = (e: any) => {
    if (e.type === 'game-over') {
      this.view.setState({
        running: false,
      });
    } else if (e.type === 'score') {
      this.view.setState({
        score: this.view.state.score + 1,
      });
    }
  };

  reset = () => {
    resetPipes();
    this.view.gameEngine.swap(this.setupWorld());
    this.view.setState({
      running: true,
      score: 0,
    });
  };
}
