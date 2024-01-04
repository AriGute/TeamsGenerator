import { storageGetterResults, Teams, Team } from './TeamsHandlerInterface';
import TeamsHandler from './TeamsHandler';

export default class TeamsHandlerStorage {
	static get(): storageGetterResults {
		const data: string = localStorage.getItem('player_list') || '';
		const payload = JSON.parse(data);
		if (!payload)
			return {
				restoredPublicGroup: new Set([]),
				restoredPreTeams: [],
			};

		const { publicGroup, preTeams } = payload;
		const restoredPublicGroup: Team = new Set([]);
		const restoredPreTeams: Teams = [];

		preTeams.forEach((team: string) => {
			let tempTeam: Team = new Set([]);
			[...team].forEach((player: string) => tempTeam.add(player));
			restoredPreTeams.push(tempTeam);
		});

		publicGroup.forEach((player: string) => {
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
