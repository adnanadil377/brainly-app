export enum ExerciseType {
  RIVER_CROSSING = 'river_crossing',
  BROKEN_CALCULATOR = 'broken_calculator',
  LOGIC_FRIENDS = 'logic_friends',
  MATCHSTICK = 'matchstick',
  RIDDLES = 'riddles',
  SECRET_CODES = 'secret_codes',
  ACTIVITY_CARD = 'activity_card' // For physical activities like Marshmallow/Map
}

export interface Activity {
  id: string;
  title: string;
  type: ExerciseType;
  icon: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
