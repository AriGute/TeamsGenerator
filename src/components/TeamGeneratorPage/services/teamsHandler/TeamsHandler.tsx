import {
	StorageGetterResults,
	Teams,
	Team,
	Player,
	ConstTeamsIndex,
	SortedTeams,
} from './TeamsHandlerInterface';
import TeamsHandlerStorage from './TeamsHandlerStorage';

export default class TeamsHandler {
	static #publicGroup: Team = new Set([]);
	static #preTeams: Teams = [];

	static #initTeamsHandler(publicGroup: Team, preTeams: Teams) {
		TeamsHandler.#publicGroup = publicGroup;
		TeamsHandler.#preTeams = preTeams;
	}

	static restoreTeamsHandler() {
		const { restoredPublicGroup, restoredPreTeams }: StorageGetterResults =
			TeamsHandlerStorage.get();
		TeamsHandler.#initTeamsHandler(restoredPublicGroup, restoredPreTeams);
	}

	/**
	 * @returns new team
	 */
	static addTeam() {
		let team = new Set([]);
		this.#preTeams.unshift(team);
		TeamsHandlerStorage.set();
		return team;
	}

	/**
	 * @param {number} index of the team that need to be remove
	 * @returns the removed team
	 */
	static removeTeam(): Team | null {
		if (this.#preTeams.length === 0) return null;
		let team: Team | null = this.#preTeams.shift() || null;
		if (team && team.size) TeamsHandler.addPlayers([...team]);
		TeamsHandlerStorage.set();
		return team;
	}

	static getPreTeams(): Teams {
		return this.#preTeams;
	}

	static getPublicGroup(): Player[] {
		return [...TeamsHandler.#publicGroup];
	}

	static getAllPlayers(): Player[] {
		const tempPlayers: Player[] = [...TeamsHandler.#publicGroup];
		TeamsHandler.#preTeams.forEach((team: Team) => tempPlayers.concat([...team]));
		return tempPlayers;
	}

	static addPlayers(players: Player[]): void {
		players.forEach((player: Player) => {
			if (!TeamsHandler.#hasPlayer(player)) {
				TeamsHandler.#publicGroup.add(player);
			}
		});
		TeamsHandlerStorage.set();
	}

	static addPlayerToPreTeam(player: Player, moveToTeam: number) {
		switch (moveToTeam) {
			case ConstTeamsIndex.publicGroup:
				TeamsHandler.#publicGroup.add(player);
				break;
			default:
				TeamsHandler.#preTeams[moveToTeam].add(player);
				break;
		}
		TeamsHandlerStorage.set();
	}

	static removePlayerFromTeam(player: Player, currentTeamIndex: number) {
		switch (currentTeamIndex) {
			case ConstTeamsIndex.publicGroup:
				TeamsHandler.#publicGroup.delete(player);
				break;
			default:
				TeamsHandler.#preTeams[currentTeamIndex].delete(player);
				break;
		}

		TeamsHandlerStorage.set();
	}

	static clearTeams() {
		TeamsHandler.#publicGroup.clear();
		TeamsHandler.#preTeams = [];
		TeamsHandlerStorage.set();
	}

	/**
	 * @returns {Array<Set>}
	 */
	static getRandomTeams(): Teams {
		let toSortTeams: SortedTeams = [];
		if (TeamsHandler.#preTeams.length === 0) return [];

		this.getPreTeams().forEach((team, i) => toSortTeams.push([new Set([...team]), i]));
		toSortTeams.sort((a, b) => (a[0] < b[0] ? -1 : 1));

		let publicGroup = [...TeamsHandler.#publicGroup];
		let rand;
		let pick;
		let index;
		const size = publicGroup.length;

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
	static #hasPlayer(player: Player) {
		if (TeamsHandler.getAllPlayers()?.includes(player)) return true;
		if (TeamsHandler.getPreTeams()?.some((team: Team) => team.has(player))) return true;
		return false;
	}
}
