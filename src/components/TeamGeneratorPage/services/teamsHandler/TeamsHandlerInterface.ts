export enum ConstTeamsIndex {
	publicGroup = 0,
}

export type Player = string;
export type Players = string[];

export type SortedTeams = Array<[Team, SortIndex]>;
export type SortIndex = number;

export type Teams = Team[];
export type Team = Set<string>;

export interface StorageGetterResults {
	restoredPreTeams: Teams;
}
