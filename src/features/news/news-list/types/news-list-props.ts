import { News, User } from '../../../../shared/types'

export interface NewsListProps {
  user: User | null
  news: News[]
  getNewsData(): void
}
