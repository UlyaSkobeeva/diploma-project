import { createAsyncThunk } from '@reduxjs/toolkit'
import { News } from '../../../shared/types'
import { addData, fetchData, removeData, updateData } from '../fetch'

export const fetchNews = createAsyncThunk<News[]>(
  'news/fetchNews',
  async () => await fetchData('/api/news/'),
)

export const fetchNewsById = createAsyncThunk(
  'news/fetchNews/id',
  async (id: number) => await fetchData<News>(`/api/news/${id}`),
)

export const addNews = createAsyncThunk(
  'news/addNews',
  async (newsData: Omit<News, 'id'>) => await addData('/api/news/', newsData),
)

export const removeNews = createAsyncThunk(
  'news/removeNews',
  async (id: number) => removeData(`/api/news/${id}`, id),
)

export const updateNews = createAsyncThunk(
  'news/updateNews',
  async (newsData: News) =>
    await updateData<News>(`/api/news/${newsData.id}`, newsData),
)
