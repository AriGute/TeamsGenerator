export function pickTeams(list) {
	let teamA = [];
	let teamB = [];

	let size = list.length;
	for (let i = 0; i < size; i++) {
		let rand = Math.round(Math.random() * (list.length - 1));
		let pick = list[rand];
		teamA.length < teamB.length ? teamA.push(pick) : teamB.push(pick);
		list = [...list.slice(0, rand), ...list.slice(rand + 1)];
	}
	return [teamA, teamB];
}

export function getStoredPlayersList() {
	const list = localStorage.getItem('player_list');
	if (JSON.stringify(list).length > 2) {
		return list.split(',');
	}
	return [];
}
export function setStoredPlayersList(players) {
	localStorage.setItem('player_list', players);
}
