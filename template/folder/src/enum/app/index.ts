// General app enums

export enum Key {
  LEFT = 'ArrowLeft',
  RIGHT = 'ArrowRight',
  UP = 'ArrowUp',
  DOWN = 'ArrowDown',
  A = 'a',
  S = 's',
  W = 'w',
  D = 'd',
  SPACE = 'Space',
}

export const Language = {
  EN: { code: 'en', label: 'English' },
  JA: { code: 'ja', label: '日本語' },
}

export enum Mouse {
  LEFT_CLICK = 0,
  RIGHT_CLICK = 2,
}

export enum Render {
  GAME_WIDTH = 320,
  GAME_HEIGHT = 180,
  RESOLUTION = 2,
}

export enum Resolution {
  LOW = 'low',
  NORMAL = 'normal',
  HIGH = 'high',
}

export enum Scene {
  /* PLOP_INJECT_SCENE */
  MAIN_MENU = 'mainMenu',
  GAME = 'game',
}

export const TextStyle = {
  MAIN: {
    fontFamily: 'Press Start 2P',
    fill: 'white',
    fontSize: 12,
  },
}

enum TO_WORKER {
  INITIALIZE_WORKER = 'initializeWorker',
  UPDATE = 'update',
}

enum FROM_WORKER {
  UPDATE = 'update',
  DEBUG = 'debug',
  WORKER_INITIALIZED = 'workerInitialized',
}

export const MessageType = {
  TO_WORKER,
  FROM_WORKER,
}
