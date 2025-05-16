//функция для установки значения
//name должен называться как в бд
export const changingInputState = (event, setData) => {
  const { name, value } = event.target
  setData((prev) => ({
    ...prev,
    [name]: value.trimStart(), // Очищает пробелы только в начале строки
  }))
}
