import { createSelector, createSlice } from '@reduxjs/toolkit'

import { RootState } from '../types'
import { ADD_ERROR, GET_ERROR, REMOVE_ERROR, UPDATE_ERROR } from '../error'
import { News } from '../../../shared/types'
import {
  addNews,
  fetchNews,
  fetchNewsById,
  removeNews,
  updateNews,
} from './news-action'

export interface NewsState {
  data: News[]
  error: string
  dataById?: Omit<News, 'id'>
}

const initialState: NewsState = {
  data: [],
  error: '',
}

export const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.data = action.payload
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.error = GET_ERROR
      })
      .addCase(fetchNewsById.fulfilled, (state, action) => {
        state.dataById = action.payload
      })
      .addCase(fetchNewsById.rejected, (state, action) => {
        state.error = GET_ERROR
      })
      .addCase(addNews.fulfilled, (state, action) => {
        state.data.push(action.payload as News)
      })
      .addCase(addNews.rejected, (state, action) => {
        state.error = ADD_ERROR
      })
      .addCase(removeNews.fulfilled, (state, action) => {
        state.data = state.data.filter(
          (newsElelment) => newsElelment.id !== action.payload,
        )
      })
      .addCase(removeNews.rejected, (state, action) => {
        state.error = REMOVE_ERROR
      })
      .addCase(updateNews.fulfilled, (state, action) => {
        state.data = state.data.map((newsElement) =>
          newsElement.id === action.payload.id ? action.payload : newsElement,
        )
        state.dataById = action.payload
      })
      .addCase(updateNews.rejected, (state, action) => {
        state.error = UPDATE_ERROR
      })
  },
})

const getNewsState = (state: RootState) => state.news

export const NewsSelector = createSelector(getNewsState, (state) => state.data)

export const NewsByIdSelector = createSelector(
  getNewsState,
  (state) => state.dataById,
)
