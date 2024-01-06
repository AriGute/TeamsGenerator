import {
	StorageGetterResults,
	Teams,
	Team,
	Player,
	ConstTeamsIndex,
	SortedTeams,
	Players,
} from './TeamsHandlerInterface';
import TeamsHandlerStorage from './TeamsHandlerStorage';

//TODO fix bug move player from one group into another
export default class TeamsHandler {
	// static #publicGroup: Team = new Set([]);
	static #preTeams: Teams = [new Set()];
	static #MIN_TEAMS = 1;
	static #MAX_TEAMS = 11;

	static #initTeamsHandler(preTeams: Teams): void {
		TeamsHandler.#preTeams = preTeams;
	}

	static restoreTeamsHandler(): void {
		const { restoredPreTeams }: StorageGetterResults = TeamsHandlerStorage.get();
		TeamsHandler.#initTeamsHandler(/*restoredPublicGroup,*/ restoredPreTeams);
	}

	/**
	 * @returns new team
	 */
	static addTeam(): Team | null {
		if (this.#preTeams.length === this.#MAX_TEAMS) return null;
		let team = new Set([]);
		this.#preTeams.push(team);
		TeamsHandlerStorage.set();
		return team;
	}

	/**
	 * @param {number} index of the team that need to be remove
	 * @returns the removed team
	 */
	static removeTeam(): Team | null {
		if (this.#preTeams.length === this.#MIN_TEAMS) return null;
		let team: Team | null = this.#preTeams.pop() || null;
		if (team && team.size) TeamsHandler.addPlayers([...team]);
		TeamsHandlerStorage.set();
		return team;
	}

	static getPreTeams(): Teams {
		const preTeams = [...TeamsHandler.#preTeams];
		preTeams.splice(ConstTeamsIndex.publicGroup, 1);
		return preTeams;
	}

	static getPublicGroup(): Player[] {
		const publicGroup = TeamsHandler.#preTeams[ConstTeamsIndex.publicGroup];
		if (publicGroup) return [...publicGroup];
		return [];
	}

	static getAllPlayers(): Player[] {
		const tempPlayers: Player[] = [...TeamsHandler.#preTeams[ConstTeamsIndex.publicGroup]];
		TeamsHandler.#preTeams.forEach((team: Team) => tempPlayers.concat([...team]));
		return tempPlayers;
	}

	static addPlayers(players: Player[]): void {
		players.forEach((player: Player) => {
			if (!TeamsHandler.#hasPlayer(player)) {
				TeamsHandler.#preTeams[ConstTeamsIndex.publicGroup].add(player);
			}
		});
		TeamsHandlerStorage.set();
	}

	static addPlayerToPreTeam(player: Player, moveToTeam: number): void {
		switch (moveToTeam) {
			case ConstTeamsIndex.publicGroup:
				TeamsHandler.#preTeams[ConstTeamsIndex.publicGroup].add(player);
				break;
			default:
				TeamsHandler.#preTeams[moveToTeam].add(player);
				break;
		}
		TeamsHandlerStorage.set();
	}

	static removePlayerFromTeam(player: Player, currentTeamIndex: number): void {
		switch (currentTeamIndex) {
			case ConstTeamsIndex.publicGroup:
				TeamsHandler.#preTeams[ConstTeamsIndex.publicGroup].delete(player);
				break;
			default:
				TeamsHandler.#preTeams[currentTeamIndex].delete(player);
				break;
		}

		TeamsHandlerStorage.set();
	}

	static clearTeams(): void {
		TeamsHandler.#preTeams[ConstTeamsIndex.publicGroup].clear();
		TeamsHandler.#preTeams = [new Set()];
		TeamsHandlerStorage.set();
	}

	/**
	 * @returns {Array<Set>}
	 */
	static getRandomTeams(): Teams {
		let toSortTeams: SortedTeams = [];
		if (TeamsHandler.#preTeams.length <= 1) return [];

		this.getPreTeams().forEach((team, i) => toSortTeams.push([new Set([...team]), i]));
		toSortTeams.sort((a, b) => (a[0] < b[0] ? -1 : 1));

		let publicGroup: Players = [...TeamsHandler.#preTeams[ConstTeamsIndex.publicGroup]];
		let rand: number;
		let pick: Player;
		let index: number;
		const size: number = publicGroup.length;

		for (let i = 0; i < size; i++) {
			rand = Math.round(Math.random() * (publicGroup.length - 1));
			pick = publicGroup[rand];
			index = 0;

			if (toSortTeams[index + 1]) {
				while (toSortTeams[index][0].size >= toSortTeams[index + 1][0].size) {
					index++;
					if (!toSortTeams[index + 1]) break;
				}
			}

			toSortTeams[index][0].add(pick);
			if (index === toSortTeams.length - 1) index = 0;
			publicGroup.splice(rand, 1);
		}

		toSortTeams.sort((a, b) => (a[1] < b[1] ? -1 : 1));
		const sortedTeams: Teams = toSortTeams.map((team) => team[0]);

		return sortedTeams;
	}

	// check if player exist in any team
	static #hasPlayer(player: Player): boolean {
		if (TeamsHandler.getAllPlayers()?.includes(player)) return true;
		if (TeamsHandler.getPreTeams()?.some((team: Team) => team.has(player))) return true;
		return false;
	}
}
