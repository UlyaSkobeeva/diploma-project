import { createAsyncThunk } from '@reduxjs/toolkit'
import { Idea } from '../../../shared/types'
import { addData, fetchData, removeData, updateData } from '../fetch'

export const fetchIdeas = createAsyncThunk<Idea[]>(
  'ideas/fetchIdeas',
  async () => fetchData('/api/idea'),
)

export const addIdea = createAsyncThunk(
  'ideas/addIdea',
  async (ideaData: Omit<Idea, 'id'>) => addData('/api/idea', ideaData),
)

export const removeIdea = createAsyncThunk(
  'ideas/removeIdea',
  async (id: number) => removeData(`/api/idea/${id}`, id),
)

export const toggleIdea = createAsyncThunk(
  'ideas/toggleIdea',
  async (ideaData: Idea) => updateData(`/api/idea/${ideaData.id}`, ideaData),
)
