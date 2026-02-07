import { format, startOfWeek, subWeeks } from "date-fns";

// Returns ID like "2023-W42" for the current week (Monday start)
export const getCurrentWeekId = () => {
  const now = new Date();
  const start = startOfWeek(now, { weekStartsOn: 1 });
  return format(start, "yyyy-'W'ww");
};

// Returns ID for the previous week (for voting)
export const getVotingWeekId = () => {
  const now = new Date();
  const lastWeek = subWeeks(now, 1);
  const start = startOfWeek(lastWeek, { weekStartsOn: 1 });
  return format(start, "yyyy-'W'ww");
};
