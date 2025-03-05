import axios from 'axios';
import type { Launch, Rocket, LaunchFilters } from '../types/api';

const api = axios.create({
  baseURL: 'https://api.spacexdata.com/v4',
});

export async function getLaunches(filters: LaunchFilters = {}): Promise<Launch[]> {
  const { data } = await api.get<Launch[]>('/launches');
  
  return data.filter(launch => {
    // Filter by upcoming status
    if (filters.upcoming !== undefined && launch.upcoming !== filters.upcoming) {
      return false;
    }

    // Filter by success status
    if (filters.success !== undefined) {
      if (filters.success === null) {
        return false; // Hide all launches when both switches are off
      }
      if (launch.success !== filters.success) {
        return false;
      }
    }

    // Filter by year
    if (filters.year !== undefined && filters.year !== null) {
      const launchYear = new Date(launch.date_utc).getFullYear();
      if (launchYear !== filters.year) {
        return false;
      }
    }

    return true;
  });
}

export async function getLaunch(id: string): Promise<Launch> {
  const { data } = await api.get<Launch>(`/launches/${id}`);
  return data;
}

export async function getRocket(id: string): Promise<Rocket> {
  const { data } = await api.get<Rocket>(`/rockets/${id}`);
  return data;
}