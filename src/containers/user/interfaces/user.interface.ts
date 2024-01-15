import { ACCESS_LEVEL } from 'src/constants/roles';

export interface AccessLevelData {
  [ACCESS_LEVEL.FREE]: LevelData;
  [ACCESS_LEVEL.BASIC]: LevelData;
  [ACCESS_LEVEL.PREMIUM]: LevelData;
  [ACCESS_LEVEL.GOLD]: LevelData;
}

interface LevelData {
  months: number[];
  weeks: number[];
}

export interface DateData {
  label: string;
  months: number[];
  weeks: number[];
}

export interface QuantityData {
  label: string;
  numbers: number[];
}
