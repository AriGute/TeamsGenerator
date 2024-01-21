function uidGenerator(): string {
	return (performance.now() + Math.random()).toString(16).split('.').join('');
}

export { uidGenerator };
