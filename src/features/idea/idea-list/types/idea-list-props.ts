import { Idea, User } from '../../../../shared/types'

export interface IdeaListProps {
  ideas: Idea[]
  user: User | null
  getIdeas(): void
}
