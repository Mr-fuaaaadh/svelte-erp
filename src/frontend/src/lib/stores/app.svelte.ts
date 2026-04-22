export function createAppStore() {
	let isDarkMode = $state(false);
	let sidebarCollapsed = $state(false);

	return {
		get isDarkMode() { return isDarkMode; },
		set isDarkMode(v) { isDarkMode = v; },
		get sidebarCollapsed() { return sidebarCollapsed; },
		set sidebarCollapsed(v) { sidebarCollapsed = v; },
		toggleDarkMode() { isDarkMode = !isDarkMode; },
		toggleSidebar() { sidebarCollapsed = !sidebarCollapsed; }
	};
}

export const appStore = createAppStore();
