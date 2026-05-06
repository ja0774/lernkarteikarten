export const statsStore = $state({
  streak: 12,
  dailyGoal: {
    current: 35,
    target: 50, // cards
  },
  momentumScore: 840,
  weeklyVelocity: [
    { day: 'Mon', count: 45 },
    { day: 'Tue', count: 52 },
    { day: 'Wed', count: 38 },
    { day: 'Thu', count: 65 },
    { day: 'Fri', count: 48 },
    { day: 'Sat', count: 20 },
    { day: 'Sun', count: 0 },
  ],
  accuracy: 88,
  cardsMastered: 142,
});

export function getDailyGoalPercentage() {
  return Math.min(100, Math.round((statsStore.dailyGoal.current / statsStore.dailyGoal.target) * 100));
}
