import './DocumentPage.css'

export default function Document() {
  const saveFile = async (id) => {
    const response = await fetch('/api/files/')
    // console.log(response)
    const files = await response.json()
    // console.log(files)
    // console.log(files.docs)
    const link = document.createElement('a')
    // console.log('link', link)
    link.href = files[id].file
    link.download = files[id].fileName
    link.click()
    // console.log(id)
  }

  const documentsGroups = [
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

  return (
    <div className="docment-container">
      <div
        className="input-container"
        style={{
          paddingBottom: '20px',
          border: 'thick double #ccc',
          borderRadius: '20px',
          background: '#2a4359',
        }}
      >
        <h2
          className="document-logo document-title"
          style={{ textAlign: 'center', margin: '10px 0px 20px 0px' }}
        >
          Бланки заявлений
        </h2>

        {documentsGroups.map((group, groupIndex) => (
          <div key={groupIndex}>
            <h4 className="document-logo">{group.groupName}</h4>
            <ul className="document-list">
              {group.documents.map((doc, docIndex) => (
                <li key={docIndex}>
                  <a className="document-link" onClick={() => saveFile(doc.id)}>
                    {doc.documentName}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}
