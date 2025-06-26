import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { CustomForm } from '../ui/custom-form'
import { Field, FieldType } from '../../../types'

const fields: Field[] = [
  {
    label: 'Заголовок',
    type: FieldType.text,
    name: 'title',
    value: 'title',
    onChange: jest.fn(),
  },
  {
    label: 'Дата',
    type: FieldType.date,
    name: 'date',
    value: 'date',
    onChange: jest.fn(),
  },
  {
    label: 'Описание',
    type: FieldType.textarea,
    name: 'description',
    value: 'description',
    onChange: jest.fn(),
  },
]

const title = 'форма'
const submitBtnTitle = 'сохранить'

describe('Custom Form', () => {
  test('render', () => {
    const handleSubmit = jest.fn()
    render(
      <CustomForm
        fields={fields}
        title={title}
        onSubmit={handleSubmit}
        submitBtnTitle={submitBtnTitle}
      />,
    )
    const formTitle = screen.getByText(title)

    expect(formTitle.textContent).toBe(title)
  })

  test('number of fields', () => {
    const handleSubmit = jest.fn()
    const { container } = render(
      <CustomForm
        fields={fields}
        title={title}
        onSubmit={handleSubmit}
        submitBtnTitle={submitBtnTitle}
      />,
    )

    const formItems = container.querySelectorAll('.custom-form__item')

    expect(formItems).toBeDefined()
    expect(fields.length).toBe(formItems.length)
  })

  test('render input with correct type', () => {
    const handleSubmit = jest.fn()
    render(
      <CustomForm
        fields={fields}
        title={title}
        onSubmit={handleSubmit}
        submitBtnTitle={submitBtnTitle}
      />,
    )

    const dateInput = screen.getByLabelText('Дата') as HTMLInputElement

    expect(dateInput.type).toBe(FieldType.date)
  })

  test('submitting the form', () => {
    const handleSubmit = jest.fn()
    const { container } = render(
      <CustomForm
        fields={fields}
        title={title}
        onSubmit={handleSubmit}
        submitBtnTitle={submitBtnTitle}
      />,
    )

    const form = container.querySelector('form') as HTMLFormElement

    fireEvent.submit(form)

    expect(handleSubmit).toHaveBeenCalledTimes(1)
  })

  test('cleaning input fields', () => {
    const handleSubmit = jest.fn()
    const { container } = render(
      <CustomForm
        fields={fields}
        title={title}
        onSubmit={handleSubmit}
        submitBtnTitle={submitBtnTitle}
      />,
    )

    const btn = container.querySelectorAll('.custom-form__button--cleaning')
    const event = { target: { name: 'title', value: '' } }

    fireEvent.click(btn[0])

    expect(fields[0].onChange).toHaveBeenCalledWith(
      expect.objectContaining(event),
    )
  })
})
