import { RoutePath } from '../../../../shared/types/route-path'

export const MENU_ITEMS = [
  { path: RoutePath.home, label: 'Главная' },
  { path: RoutePath.worker, label: 'Сотрудники' },
  { path: RoutePath.document, label: 'Документы' },
  { path: RoutePath.info, label: 'ИнфоЦентр' },
  { path: RoutePath.idea, label: 'Банк идей' },
  // { path: RoutePath.company, label: 'О компании' }, //скрыто
  //   { path: RoutePath.admin, label: '⚙' }, //скрыто
]
