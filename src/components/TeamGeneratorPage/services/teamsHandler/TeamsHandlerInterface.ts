export enum ConstTeamsIndex {
	publicGroup = 100,
}

export type Player = string;
export type Players = string[];

export type SortedTeams = Array<[Team, SortIndex]>;
export type SortIndex = number;

export type Teams = Team[];
export type Team = Set<string>;

export interface StorageGetterResults {
	restoredPublicGroup: Team;
	restoredPreTeams: Teams;
}
