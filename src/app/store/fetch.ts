//утилиты для запросов

export const fetchData = async <T>(endpoint: string): Promise<T> => {
  const response = await fetch(endpoint)

  return await response.json() //это action.payload
}

export const addData = async <T>(endpoint: string, data: T): Promise<T> => {
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(data),
  })

  return await response.json()
}

export const updateData = async <T>(endpoint: string, data: T): Promise<T> => {
  const response = await fetch(endpoint, {
    method: 'PUT',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(data),
  })

  return await response.json()
}

export const removeData = async (endpoint: string, id: number) => {
  await fetch(endpoint, {
    method: 'DELETE',
  })

  return id
}
