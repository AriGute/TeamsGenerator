import TeamsHandler from './TeamsHandler';

export default class TeamsHandlerStorage {
	static get() {
		const data = localStorage.getItem('player_list');
		const payload = JSON.parse(data);
		if (!payload)
			return {
				publicGroup: new Set([]),
				preTeams: [],
			};

		const { publicGroup, preTeams } = payload;
		const restoredPublicGroup = new Set([]);
		const restoredPreTeams = [];

		preTeams.forEach((team) => {
			let tempTeam = new Set([]);
			[...team].forEach((player) => tempTeam.add(player));
			restoredPreTeams.push(tempTeam);
		});

		publicGroup.forEach((player) => {
			restoredPublicGroup.add(player);
		});

		return { restoredPublicGroup, restoredPreTeams };
	}

	static set() {
		const payload = {
			publicGroup: TeamsHandler.getPublicGroup(),
			preTeams: TeamsHandler.getPreTeams().map((team) => [...team]),
		};
		localStorage.setItem('player_list', JSON.stringify(payload));
	}
}
