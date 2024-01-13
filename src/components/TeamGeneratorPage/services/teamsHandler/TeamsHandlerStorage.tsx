import { StorageGetterResults, Teams, Team } from './TeamsHandlerInterface';
import TeamsHandler from './TeamsHandler';

export default class TeamsHandlerStorage {
	static get(): StorageGetterResults {
		const data: string | null = localStorage.getItem('player_list') || null;
		if (!data) {
			const publicGroup: Team = new Set();
			return {
				restoredPreTeams: [publicGroup],
			};
		}
		const payload = JSON.parse(data);

		const { preTeams } = payload;
		const restoredPreTeams: Teams = [];

		preTeams.forEach((team: string) => {
			let tempTeam: Team = new Set([]);
			[...team].forEach((player: string) => tempTeam.add(player));
			restoredPreTeams.push(tempTeam);
		});

		return { restoredPreTeams };
	}

	static set() {
		const publicGroup = TeamsHandler.getPublicGroup();
		const preTeams = TeamsHandler.getPreTeams();
		const toStoreData = [publicGroup, ...preTeams];
		const payload = {
			preTeams: toStoreData.map((team) => [...team]),
		};
		localStorage.setItem('player_list', JSON.stringify(payload));
	}
}
