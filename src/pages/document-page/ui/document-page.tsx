import { DOCUMENTS_GROUPS } from '../lib/constants/documents-group'

import styles from './document-page.module.css'

export const DocumentPage = () => {
  const saveFile = async (id: string): Promise<void> => {
    try {
      const response = await fetch('/api/files/')
      const files = await response.json()
      const link = document.createElement('a')

      link.href = files[id].file
      link.download = files[id].fileName
      link.click()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className={styles['document-page']}>
      <h2 className={styles['document-page__title']}>Бланки заявлений</h2>

      {DOCUMENTS_GROUPS.map((group, index) => (
        <ul className={styles['document-page__list']} key={index}>
          <h4 className="document-logo">{group.groupName}</h4>
          {group.documents.map((document, docIndex) => (
            <li key={docIndex}>
              <a
                className={styles['document-page__link']}
                onClick={() => saveFile(document.id)}
              >
                {document.documentName}
              </a>
            </li>
          ))}
        </ul>
      ))}
    </div>
  )
}
