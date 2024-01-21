import { uidGenerator } from '../../../utils/utils';
import {
	StorageGetterResults,
	Teams,
	Team,
	Player,
	ConstTeamsIndex,
	OptimizeTeams,
	Players,
	OptimizeTeam,
} from './TeamsHandlerInterface';
import TeamsHandlerStorage from './TeamsHandlerStorage';

export default class TeamsHandler {
	private static preTeams: Teams = [TeamsHandler.createTeam()];
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
		const team: Team = TeamsHandler.createTeam();
		this.preTeams.push(team);
		TeamsHandlerStorage.set();
		return team;
	}

	static removeTeam(index?: number): Team | null {
		if (this.preTeams.length === this.MIN_TEAMS) return null;
		let team = null;
		if (index) {
			team = this.preTeams.splice(index, 1)[0] || null;
		} else {
			team = this.preTeams.pop() || null;
		}
		if (team?.players.size) TeamsHandler.addPlayers([...team.players]);
		TeamsHandlerStorage.set();
		return team;
	}

	static getPreTeams(): Teams {
		const preTeams = [...TeamsHandler.preTeams];
		preTeams.splice(ConstTeamsIndex.publicGroup, 1);
		return preTeams;
	}

	static getPublicGroup(): Team {
		const publicGroup: Team = TeamsHandler.preTeams[ConstTeamsIndex.publicGroup];
		if (publicGroup) return publicGroup;
		return TeamsHandler.createTeam();
	}

	static getAllPlayers(): Player[] {
		const tempPlayers: Player[] = [...TeamsHandler.preTeams[ConstTeamsIndex.publicGroup].players];
		TeamsHandler.preTeams.forEach((team: Team) => tempPlayers.concat([...team.players]));
		return tempPlayers;
	}

	static addPlayers(players: Player[]): void {
		players.forEach((player: Player) => {
			if (!TeamsHandler.hasPlayer(player)) {
				TeamsHandler.preTeams[ConstTeamsIndex.publicGroup].players.add(player);
			}
		});
		TeamsHandlerStorage.set();
	}

	static addPlayerToPreTeam(player: Player, moveToTeam: number): void {
		switch (moveToTeam) {
			case ConstTeamsIndex.publicGroup:
				TeamsHandler.preTeams[ConstTeamsIndex.publicGroup].players.add(player);
				break;
			default:
				TeamsHandler.preTeams[moveToTeam].players.add(player);
				break;
		}
		TeamsHandlerStorage.set();
	}

	static removePlayerFromTeam(player: Player, currentTeamIndex: number): void {
		switch (currentTeamIndex) {
			case ConstTeamsIndex.publicGroup:
				TeamsHandler.preTeams[ConstTeamsIndex.publicGroup].players.delete(player);
				break;
			default:
				TeamsHandler.preTeams[currentTeamIndex].players.delete(player);
				break;
		}

		TeamsHandlerStorage.set();
	}

	static clearTeams(): void {
		TeamsHandler.preTeams[ConstTeamsIndex.publicGroup].players.clear();
		TeamsHandler.preTeams = [TeamsHandler.createTeam()];
		TeamsHandlerStorage.set();
	}

	static getRandomTeams(): Teams {
		if (TeamsHandler.preTeams.length <= 1) return [];
		let publicGroup: Players = [...TeamsHandler.preTeams[ConstTeamsIndex.publicGroup].players];
		let team: Team;
		const size: number = publicGroup.length;

		// before optimize pre-teams e.g: [[p,p], [], [p], []]
		const beforeOptimizePreTeamsList: OptimizeTeams = this.getPreTeams().map((team, i) => [
			TeamsHandler.createTeam([...team.players]),
			i,
		]);
		// after optimize pre-teams e.g: [[] , [], [p], [p,p]]
		const optimizedPreTeamsList = beforeOptimizePreTeamsList.toSorted((a, b) =>
			a[0].players.size < b[0].players.size ? -1 : 1,
		);

		for (let i = 0; i < size; i++) {
			team = this.pickTeam(optimizedPreTeamsList)[0];
			team.players.add(this.pickRandomPlayer(publicGroup));
		}

		const deOptimizePreTeamList = optimizedPreTeamsList.toSorted((a, b) => (a[1] < b[1] ? -1 : 1));
		const randomTeams: Teams = deOptimizePreTeamList.map((team) => team[0]);
		return randomTeams;
	}

	static createTeam(players: Players = [], id?: string): Team {
		return { id: id || uidGenerator(), players: new Set(players) };
	}

	// check if player exist in any team
	static hasPlayer(player: Player): boolean {
		if (TeamsHandler.getAllPlayers()?.includes(player)) return true;
		if (TeamsHandler.getPreTeams()?.some((team: Team) => team.players.has(player))) return true;
		return false;
	}

	private static pickRandomPlayer(publicGroup: Players): Player {
		const randomNumber = Math.round(Math.random() * (publicGroup.length - 1));
		return publicGroup.splice(randomNumber, 1)[0];
	}

	private static pickTeam(optimizedTeams: OptimizeTeams): OptimizeTeam {
		let index: number = 0;
		if (optimizedTeams[index + 1]) {
			while (optimizedTeams[index][0].players.size >= optimizedTeams[index + 1][0].players.size) {
				index++;
				if (!optimizedTeams[index + 1]) return optimizedTeams[index];
			}
		}
		return optimizedTeams[index];
	}
}
