import { DocumentGroup } from '../../types/document-group'

export const DOCUMENTS_GROUPS: DocumentGroup[] = [
  {
    groupName: 'Оформление на работу, перевод, увольнение',
    documents: [
      {
        id: 'info-about-job',
        documentName: 'Заявление о приеме на работу',
      },
      {
        id: 'info-about-perevod',
        documentName: 'Заявление о переводе',
      },
      {
        id: 'info-about-yvol',
        documentName: 'Заявление на увольнение',
      },
    ],
  },
  {
    groupName: 'Оформление отпусков, назначение пособий',
    documents: [
      {
        id: 'info-about-holiday',
        documentName: 'Заявление на основной ежегодный оплачиваемый отпуск',
      },
      {
        id: 'info-about-freeHoliday',
        documentName: 'Заявление на отпуск без сохранения заработной платы',
      },
      {
        id: 'info-about-baby',
        documentName: 'Заявление на отпуск по уходу за ребенком до 3 лет',
      },
    ],
  },
  {
    groupName: ' Изменение учетных данных, режима рабочего времени работника',
    documents: [
      {
        id: 'info-about-pasport',
        documentName: 'Заявление об изменении паспортных данных',
      },
      {
        id: 'info-about-time',
        documentName: 'Заявление об изменении режима рабочего времени',
      },
    ],
  },
]
