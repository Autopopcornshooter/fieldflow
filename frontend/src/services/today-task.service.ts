import { api } from './api';

import { TodayTask } from '../types/today-task';

export const getTodayTasks = async () => {
  const response = await api.get<TodayTask[]>(
    '/today-tasks',
  );

  return response.data;
};

export const createTodayTask = async (
  title: string,
  location?: string,
) => {
  const response = await api.post(
    '/today-tasks',
    {
      title,
      location,
    },
  );

  return response.data;
};