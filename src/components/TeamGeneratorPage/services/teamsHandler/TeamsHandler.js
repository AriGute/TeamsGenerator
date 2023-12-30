import { constTeams } from '../../../../utils/consts';
import TeamsHandlerStorage from './TeamsHandlerStorage';

export default class TeamsHandler {
	static #publicGroup = new Set([]);
	static #preTeams = [];

	static #initTeamsHandler(publicGroup, preTeams) {
		TeamsHandler.#publicGroup = publicGroup;
		TeamsHandler.#preTeams = preTeams;
	}

	static restoreTeamsHandler() {
		const { restoredPublicGroup, restoredPreTeams } = TeamsHandlerStorage.get();
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
	static removeTeam() {
		let team = this.#preTeams.shift();
		if (team.size) TeamsHandler.addPlayers([...team]);
		TeamsHandlerStorage.set();
		return team;
	}

	static getPreTeams() {
		return this.#preTeams;
	}

	static getPublicGroup() {
		return [...TeamsHandler.#publicGroup];
	}

	static getAllPlayers() {
		const tempPlayers = [...TeamsHandler.#publicGroup];
		TeamsHandler.#preTeams.forEach((team) => tempPlayers.concat(team));
		return tempPlayers;
	}

	static addPlayers(players) {
		players.forEach((player) => {
			if (!TeamsHandler.#hasPlayer(player)) {
				TeamsHandler.#publicGroup.add(player);
			}
		});
		TeamsHandlerStorage.set();
	}

	static addPlayerToPreTeam(player, moveToTeam) {
		switch (moveToTeam) {
			case constTeams.publicGroup:
				TeamsHandler.#publicGroup.add(player);
				break;
			default:
				TeamsHandler.#preTeams[moveToTeam].add(player);
				break;
		}
		TeamsHandlerStorage.set();
	}

	static removePlayerFromTeam(player, currentTeam) {
		switch (currentTeam) {
			case constTeams.publicGroup:
				TeamsHandler.#publicGroup.delete(player);
				break;
			default:
				TeamsHandler.#preTeams[currentTeam].delete(player);
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
	static getRandomTeams() {
		let teams = [];
		if (TeamsHandler.#preTeams.length === 0) return teams;

		this.getPreTeams().forEach((team, i) => teams.push([new Set([...team]), i]));
		teams.sort((a, b) => (a[0] < b[0] ? -1 : 1));

		let publicGroup = [...TeamsHandler.#publicGroup];
		const size = publicGroup.length;

		for (let i = 0; i < size; i++) {
			let rand = Math.round(Math.random() * (publicGroup.length - 1));
			let pick = publicGroup[rand];
			let index = 0;

			if (teams[index + 1]) {
				while (teams[index][0].size >= teams[index + 1][0].size) {
					index++;
					if (!teams[index + 1]) break;
				}
			}

			teams[index][0].add(pick);
			if (index === teams.length - 1) index = 0;
			publicGroup.splice(rand, 1);
		}
		teams.sort((a, b) => (a[1] < b[1] ? -1 : 1));
		teams = teams.map((team) => team[0]);

		return teams;
	}

	// check if player exist in any team
	static #hasPlayer(player) {
		return (
			TeamsHandler.getAllPlayers()?.includes(player) |
			TeamsHandler.getPreTeams()?.some((p) => p === player)
		);
	}
}
