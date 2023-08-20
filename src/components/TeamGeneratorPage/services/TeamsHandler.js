import { teams } from '../../../utils/consts';

export default class TeamsHandler {
	static #players = new Set([]);
	static #preTeamA = new Set([]);
	static #preTeamB = new Set([]);

	static #initTeamsHandler(players, preTeamA, preTeamB) {
		TeamsHandler.#players = players;
		TeamsHandler.#preTeamA = preTeamA;
		TeamsHandler.#preTeamB = preTeamB;
	}
	static restoreTeamsHandler() {
		const payload = TeamsHandler.#getStoredPlayersList();
		if (!payload) return;
		const { publicGroup, preTeams } = payload || { publicGroup: [], preTeams: [[], []] };

		const players = new Set([]);
		const preTeamA = new Set([]);
		const preTeamB = new Set([]);

		publicGroup.forEach((player) => players.add(player));
		preTeams[0].forEach((player) => preTeamA.add(player));
		preTeams[1].forEach((player) => preTeamB.add(player));

		TeamsHandler.#initTeamsHandler(players, preTeamA, preTeamB);
	}
	static getPublicGroup(players) {
		return [...TeamsHandler.#players];
	}

	static getAllPlayers(players) {
		return [...TeamsHandler.#players, ...TeamsHandler.#preTeamA, ...TeamsHandler.#preTeamB];
	}

	static addPlayers(players) {
		players.forEach((player) => {
			if (!TeamsHandler.#hasPlayer(player)) {
				TeamsHandler.#players.add(player);
			}
		});
		TeamsHandler.#setStoredPlayersList();
	}

	static addPlayerToPreTeam(player, team) {
		TeamsHandler.#preTeamA.delete(player);
		TeamsHandler.#preTeamB.delete(player);
		TeamsHandler.#players.delete(player);

		switch (team) {
			case teams.A:
				TeamsHandler.#preTeamA.add(player);
				break;
			case teams.B:
				TeamsHandler.#preTeamB.add(player);
				break;
			case teams.publicGroup:
				TeamsHandler.#players.add(player);
				break;
		}
		TeamsHandler.#setStoredPlayersList();
	}

	static removeFromPreTeam(player, team) {
		switch (team) {
			case teams.teamA:
				TeamsHandler.#preTeamA.delete(player);
				break;
			case teams.teamB:
				TeamsHandler.#preTeamB.delete(player);
				break;
			default:
				break;
		}
		TeamsHandler.#players.add(player);
		TeamsHandler.#setStoredPlayersList();
	}

	static removePlayers(player) {
		TeamsHandler.#players.delete(player);
		TeamsHandler.#setStoredPlayersList();
	}

	static clearTeams() {
		TeamsHandler.#players.clear();
		TeamsHandler.#preTeamA = [];
		TeamsHandler.#preTeamB = [];
		TeamsHandler.#setStoredPlayersList();
	}

	static getRandomTeams() {
		let teamA = [...TeamsHandler.#preTeamA];
		let teamB = [...TeamsHandler.#preTeamB];
		let publicGroup = [...TeamsHandler.#players];
		const size = publicGroup.length;

		for (let i = 0; i < size; i++) {
			let rand = Math.round(Math.random() * (publicGroup.length - 1));
			let pick = publicGroup[rand];
			teamA.length < teamB.length ? teamA.push(pick) : teamB.push(pick);
			publicGroup.splice(rand, 1);
		}

		return [teamA, teamB];
	}

	static getPreTeams() {
		return [[...TeamsHandler.#preTeamA], [...TeamsHandler.#preTeamB]];
	}

	static #getStoredPlayersList() {
		const data = localStorage.getItem('player_list');
		const payload = JSON.parse(data);

		return payload;
	}

	static #setStoredPlayersList() {
		const payload = {
			publicGroup: TeamsHandler.getPublicGroup(),
			preTeams: TeamsHandler.getPreTeams(),
		};
		localStorage.setItem('player_list', JSON.stringify(payload));
	}

	static #hasPlayer(player) {
		return (
			TeamsHandler.#players?.has(player) |
			TeamsHandler.#preTeamA?.has(player) |
			TeamsHandler.#preTeamB?.has(player)
		);
	}
}
