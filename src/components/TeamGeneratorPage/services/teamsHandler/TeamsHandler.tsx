import {
	StorageGetterResults,
	Teams,
	Team,
	Player,
	ConstTeamsIndex,
	ToOptimizeTeams,
	Players,
	ToOptimizeTeam,
} from './TeamsHandlerInterface';
import TeamsHandlerStorage from './TeamsHandlerStorage';

export default class TeamsHandler {
	private static preTeams: Teams = [new Set()];
	private static MIN_TEAMS: number = 1;
	private static MAX_TEAMS: number = 11;

	static initTeamsHandler(preTeams: Teams): void {
		TeamsHandler.preTeams = preTeams;
	}

	static restoreTeamsHandler(): void {
		const { restoredPreTeams }: StorageGetterResults = TeamsHandlerStorage.get();
		TeamsHandler.initTeamsHandler(restoredPreTeams);
	}

	static addTeam(): Team | null {
		if (this.preTeams.length === this.MAX_TEAMS) return null;
		let team = new Set([]);
		this.preTeams.push(team);
		TeamsHandlerStorage.set();
		return team;
	}

	static removeTeam(): Team | null {
		if (this.preTeams.length === this.MIN_TEAMS) return null;
		let team: Team | null = this.preTeams.pop() || null;
		if (team && team.size) TeamsHandler.addPlayers([...team]);
		TeamsHandlerStorage.set();
		return team;
	}

	static getPreTeams(): Teams {
		const preTeams = [...TeamsHandler.preTeams];
		preTeams.splice(ConstTeamsIndex.publicGroup, 1);
		return preTeams;
	}

	static getPublicGroup(): Player[] {
		const publicGroup = TeamsHandler.preTeams[ConstTeamsIndex.publicGroup];
		if (publicGroup) return [...publicGroup];
		return [];
	}

	static getAllPlayers(): Player[] {
		const tempPlayers: Player[] = [...TeamsHandler.preTeams[ConstTeamsIndex.publicGroup]];
		TeamsHandler.preTeams.forEach((team: Team) => tempPlayers.concat([...team]));
		return tempPlayers;
	}

	static addPlayers(players: Player[]): void {
		players.forEach((player: Player) => {
			if (!TeamsHandler.hasPlayer(player)) {
				TeamsHandler.preTeams[ConstTeamsIndex.publicGroup].add(player);
			}
		});
		TeamsHandlerStorage.set();
	}

	static addPlayerToPreTeam(player: Player, moveToTeam: number): void {
		switch (moveToTeam) {
			case ConstTeamsIndex.publicGroup:
				TeamsHandler.preTeams[ConstTeamsIndex.publicGroup].add(player);
				break;
			default:
				TeamsHandler.preTeams[moveToTeam].add(player);
				break;
		}
		TeamsHandlerStorage.set();
	}

	static removePlayerFromTeam(player: Player, currentTeamIndex: number): void {
		switch (currentTeamIndex) {
			case ConstTeamsIndex.publicGroup:
				TeamsHandler.preTeams[ConstTeamsIndex.publicGroup].delete(player);
				break;
			default:
				TeamsHandler.preTeams[currentTeamIndex].delete(player);
				break;
		}

		TeamsHandlerStorage.set();
	}

	static clearTeams(): void {
		TeamsHandler.preTeams[ConstTeamsIndex.publicGroup].clear();
		TeamsHandler.preTeams = [new Set()];
		TeamsHandlerStorage.set();
	}

	static getRandomTeams(): Teams {
		if (TeamsHandler.preTeams.length <= 1) return [];
		let publicGroup: Players = [...TeamsHandler.preTeams[ConstTeamsIndex.publicGroup]];
		let team: Team;
		const size: number = publicGroup.length;

		const beforeOptimizePreTeamsList: ToOptimizeTeams = this.getPreTeams().map((team, i) => [
			new Set([...team]),
			i,
		]);
		const optimizedPreTeamsList = beforeOptimizePreTeamsList.toSorted((a, b) =>
			a[0].size < b[0].size ? -1 : 1,
		);

		for (let i = 0; i < size; i++) {
			team = this.#pickTeam(optimizedPreTeamsList)[0];
			team.add(this.#pickRandomPlayer(publicGroup));
		}

		const deOptimizePreTeamList = optimizedPreTeamsList.toSorted((a, b) => (a[1] < b[1] ? -1 : 1));
		const randomTeams: Teams = deOptimizePreTeamList.map((team) => team[0]);
		return randomTeams;
	}

	static #pickRandomPlayer(publicGroup: Players): Player {
		const randomNumber = Math.round(Math.random() * (publicGroup.length - 1));
		return publicGroup.splice(randomNumber, 1)[0];
	}

	static #pickTeam(beforeSortTeams: ToOptimizeTeams): ToOptimizeTeam {
		let index: number = 0;
		if (beforeSortTeams[index + 1]) {
			while (beforeSortTeams[index][0].size >= beforeSortTeams[index + 1][0].size) {
				index++;
				if (!beforeSortTeams[index + 1]) return beforeSortTeams[index];
			}
		}
		return beforeSortTeams[index];
	}

	// check if player exist in any team
	static hasPlayer(player: Player): boolean {
		if (TeamsHandler.getAllPlayers()?.includes(player)) return true;
		if (TeamsHandler.getPreTeams()?.some((team: Team) => team.has(player))) return true;
		return false;
	}
}
