/* 
  Created by dungnt at 09-03-2020 09:11:55
  Màn hình Bắt đầu chơi game
*/

export interface PlayGameProps {
  route: any;
}

export interface PlayGameState {
  running: boolean;
  score: number;
}

export enum EAudio {
  POINT = 'sfx_point.wav',
  DIE = 'sfx_die.wav',
  HIT = 'sfx_hit.wav',
  WING = 'sfx_wing.wav',
  SWOOSHING = 'sfx_swooshing.wav',
}
