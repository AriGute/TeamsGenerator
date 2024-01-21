export enum ConstTeamsIndex {
	publicGroup = 0,
}

export type Player = string;
export type Players = string[];

export type OptimizeTeams = Array<OptimizeTeam>;
export type OptimizeTeam = [Team, OptimizeIndex];
export type OptimizeIndex = number;

export type Teams = Team[];
export type Team = { id: string; players: Set<string> };

export interface StorageGetterResults {
	restoredPreTeams: Teams;
}
