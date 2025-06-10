import { ChangeEvent, Dispatch, SetStateAction } from 'react'

//функция для установки значения
//name должен называться как в бд
export const changingInputState = <T extends object>(
  event: ChangeEvent<HTMLInputElement>,
  setData: Dispatch<SetStateAction<T>>,
) => {
  const { name, value } = event.target
  setData((prev) => ({
    ...prev,
    [name]: value.trimStart(),
  }))
}
