import {supabase} from './supabase';
import {Schedule} from '../types/global.d';

// List
export const getArtistList = async () => {
  try {
    const {data} = await supabase.from('artists').select('*');
    return data;
  } catch (error) {
    // console.log('error', error);
  }
};

// Schedule
export const getArtistSchedule = async () => {
  try {
    const {data} = await supabase.from('schedule').select('*');
    return data;
  } catch (error) {
    // console.log('error', error);
  }
};

export const addSchedule = async (schedule: Schedule) => {
  try {
    const {error} = await supabase.from('userSchedule').insert(schedule);
  } catch (error) {
    // console.log('Error', error);
  }
};

export const deleteSchedule = async (id: number) => {
  try {
    await supabase.from('userSchedule').delete().eq('scheduleId', id);
  } catch (error) {
    // console.log('Error', error);
  }
};

export const getUserSchedule = async () => {
  try {
    const {data} = await supabase.from('userSchedule').select('*');
    return data;
  } catch (error) {
    // console.log('error', error);
  }
};

// Detail
export const getArtistDetail = async () => {
  try {
    const {data} = await supabase.from('artistDetail').select('*');
    return data;
  } catch (error) {
    // console.log('error', error);
  }
};
