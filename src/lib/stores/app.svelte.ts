export const appState = $state({
  activeTab: 'dashboard',
});

export function setActiveTab(tab: 'dashboard' | 'study' | 'stats' | 'library' | 'profile') {
  appState.activeTab = tab;
}
