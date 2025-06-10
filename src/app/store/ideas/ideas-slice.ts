import { createSelector, createSlice } from '@reduxjs/toolkit'
import { Idea, Options } from '../../../shared/types'
import { addIdea, fetchIdeas, removeIdea, toggleIdea } from './ideas-action'
import { RootState } from '../types'
import { ADD_ERROR, GET_ERROR, REMOVE_ERROR, UPDATE_ERROR } from '../error'

export interface IdeaState {
  ideaData: Idea[]
  defaultData: Idea[]
  currentStatus: Options
  error: string
}

const initialState: IdeaState = {
  ideaData: [],
  defaultData: [],
  currentStatus: Options.all,
  error: '',
}

export const ideasSlice = createSlice({
  name: 'ideas',
  initialState,
  reducers: {
    changeStatus: (state, action) => {
      state.currentStatus = action.payload

      if (action.payload === Options.all) {
        state.ideaData = state.defaultData
      } else {
        state.ideaData = state.defaultData.filter((data) =>
          action.payload === Options.active ? !data.isDone : data.isDone,
        )
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIdeas.fulfilled, (state, action) => {
        state.ideaData = action.payload
        state.defaultData = action.payload
      })
      .addCase(fetchIdeas.rejected, (state, action) => {
        state.error = GET_ERROR
      })
      .addCase(addIdea.fulfilled, (state, action) => {
        state.defaultData.push(action.payload as Idea)

        if (
          state.currentStatus === Options.active ||
          state.currentStatus === Options.all
        ) {
          state.ideaData.push(action.payload as Idea)
        }
      })
      .addCase(addIdea.rejected, (state, action) => {
        state.error = ADD_ERROR
      })
      .addCase(removeIdea.fulfilled, (state, action) => {
        state.ideaData = state.ideaData.filter(
          (data) => data.id !== action.payload,
        )
        state.defaultData = state.defaultData.filter(
          (data) => data.id !== action.payload,
        )
      })
      .addCase(removeIdea.rejected, (state, action) => {
        state.error = REMOVE_ERROR
      })
      .addCase(toggleIdea.fulfilled, (state, action) => {
        state.defaultData = state.defaultData.map((data) =>
          data.id === action.payload.id ? action.payload : data,
        )

        switch (state.currentStatus) {
          case Options.active: {
            state.ideaData = state.defaultData.filter((data) => !data.isDone)
            break
          }
          case Options.inactive: {
            state.ideaData = state.defaultData.filter((data) => data.isDone)
            break
          }
          case Options.all:
          default: {
            state.ideaData = state.defaultData
            break
          }
        }
      })
      .addCase(toggleIdea.rejected, (state, action) => {
        state.error = UPDATE_ERROR
      })
  },
})

export const { changeStatus } = ideasSlice.actions

const getIdeasState = (state: RootState) => state.ideas

export const ideaSelector = createSelector(
  getIdeasState,
  (state) => state.ideaData,
)
