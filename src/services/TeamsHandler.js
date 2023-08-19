import { teams } from '../utils/consts';

export default class TeamsHandler {
	static #players = new Set([]);
	static #preTeamA = new Set([]);
	static #preTeamB = new Set([]);

	static initTeamsHandler(players, preTeamA, preTeamB) {
		TeamsHandler.#players = players;
		TeamsHandler.#preTeamA = preTeamA;
		TeamsHandler.#preTeamB = preTeamB;
	}

	static getAllPlayers(players) {
		return [...TeamsHandler.#players];
	}

	static addPlayers(players) {
		players.forEach((player) => {
			TeamsHandler.#players.add(player);
		});
	}

	static addPlayerToPreTeam(player, team) {
		switch (team) {
			case teams.A:
				TeamsHandler.#preTeamA.add(player);
				TeamsHandler.#preTeamB.delete(player);
				TeamsHandler.#players.delete(player);
				break;
			case teams.B:
				TeamsHandler.#preTeamB.add(player);
				TeamsHandler.#preTeamA.delete(player);
				TeamsHandler.#players.delete(player);
				break;
			case teams.publicGroup:
				TeamsHandler.#players.add(player);
				TeamsHandler.#preTeamA.delete(player);
				TeamsHandler.#preTeamB.delete(player);
				break;
		}
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
	}

	static removePlayers(player) {
		TeamsHandler.#players.delete(player);
	}

	static clearTeams() {
		TeamsHandler.#players.clear();
		TeamsHandler.#preTeamA = [];
		TeamsHandler.#preTeamB = [];
		window.dispatchEvent(new Event('clear'));
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
}
