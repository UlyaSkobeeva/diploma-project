import { configureStore } from '@reduxjs/toolkit'
import { calendarsSlice } from './calendars/calendars-slice'
import { ideasSlice } from './ideas/ideas-slice'
import { workersSlice } from './workers/workers-slice'
import { newsSlice } from './news/news-slice'

export const store = configureStore({
  reducer: {
    calendars: calendarsSlice.reducer,
    ideas: ideasSlice.reducer,
    workers: workersSlice.reducer,
    news: newsSlice.reducer,
  },
})
