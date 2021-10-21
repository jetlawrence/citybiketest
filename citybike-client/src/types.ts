export interface IStation {
  id: string;
  extra?: {
    address?: string;
    uid?: string;
  };
  empty_slots?: number;
  free_bikes?: number;
  latitude?: number;
  longitude?: number;
  name?: string;
  timestamp?: Date;
}
