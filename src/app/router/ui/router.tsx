import { Routes, Route } from 'react-router-dom'

import { Layout } from '../../layout'

import { HomePage } from '../../../pages/home-page'
import { WorkerPage } from '../../../pages/worker-page'
import { DocumentPage } from '../../../pages/document-page'
import { InfoPage } from '../../../pages/info-page'
import { IdeaPage } from '../../../pages/idea-page'

import { WorkerEditorForm } from '../../../features/worker/worker-editor-form'
import { CalendarEditorForm } from '../../../features/info-calendar/calendar-editor-form'
import { NewsEditorForm } from '../../../features/news/news-editor-form/ui/news-editor-form'

import { InfoCalendarDetail } from '../../../entities/calendar-detail'
import { NewsDetail } from '../../../entities/news-detail'
import { RoutePath } from '../../../shared/types/route-path'

// import { CompanyPage } from '../../../pages/company-page' //скрыто
// import Admin from '../../../pages/admin-page/admin-page' //скрыто

export const Router = () => {
  return (
    <Routes>
      <Route path={RoutePath.home} element={<Layout />}>
        <Route index element={<HomePage />} />

        <Route
          path={RoutePath.calendarCreate}
          element={<CalendarEditorForm isCreate />}
        />
        <Route
          path={`${RoutePath.calendarDetail}:calendarId`}
          element={<InfoCalendarDetail />}
        />
        <Route
          path={`${RoutePath.calendarEdit}:calendarId`}
          element={<CalendarEditorForm />}
        />

        <Route
          path={RoutePath.newsCreate}
          element={<NewsEditorForm isCreate />}
        />
        <Route
          path={`${RoutePath.newsDetail}:newsId`}
          element={<NewsDetail />}
        />
        <Route
          path={`${RoutePath.newsEdit}:newsId`}
          element={<NewsEditorForm />}
        />

        <Route path={RoutePath.worker} element={<WorkerPage />} />

        <Route
          path={RoutePath.workerCreate}
          element={<WorkerEditorForm isCreate />}
        />

        <Route
          path={`${RoutePath.workerEdit}:workerId`}
          element={<WorkerEditorForm />}
        />

        <Route path={RoutePath.document} element={<DocumentPage />} />

        <Route path={RoutePath.info} element={<InfoPage />} />
        <Route path={RoutePath.idea} element={<IdeaPage />} />

        {/* скрыто */}
        {/* <Route path={RoutePath.company} element={<CompanyPage />} /> */}
        {/* <Route path={RoutePath.admin} element={<Admin />} /> */}
      </Route>
    </Routes>
  )
}
