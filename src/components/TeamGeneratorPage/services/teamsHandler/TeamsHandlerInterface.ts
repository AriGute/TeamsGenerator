export enum ConstTeamsIndex {
	publicGroup = 0,
}

export type Player = string;
export type Players = string[];

export type ToOptimizeTeams = Array<ToOptimizeTeam>;
export type ToOptimizeTeam = [Team, ToOptimizeIndex];
export type ToOptimizeIndex = number;

export type Teams = Team[];
export type Team = Set<string>;

export interface StorageGetterResults {
	restoredPreTeams: Teams;
}
