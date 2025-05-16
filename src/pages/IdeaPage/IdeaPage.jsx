import { useEffect, useState } from 'react'
import './IdeaPage.css'
import PropTypes from 'prop-types'
import styles from './IdeaPage.module.css'
import { CustomForm } from '../../shared/ui/custom-form'
import { Button } from '../../shared/ui/button'

function Idea(props) {
  const [todos, setTodos] = useState([])
  const [nameOfTask, setnameOfTask] = useState('')
  const [editId, setEditId] = useState('')
  const [buttonText, setbuttonText] = useState('добавить')

  //получить с сервера
  const getTask = async () => {
    await fetch('/api/idea?_sort=id&_order=desc')
      .then((res) => res.json())
      .then((data) => setTodos(data))
  }

  useEffect(() => {
    getTask()
  }, [])

  // добавить
  const addTodo = async () => {
    if (nameOfTask === '') {
      alert('Введите новую идею!')
    } else {
      const task = { nameOfTask, isDone: false }
      await fetch('/api/idea', {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(task),
      })
      setnameOfTask('')
      getTask()
    }
  }

  // готово
  const checkTask = async (idNo) => {
    for (let todo of todos) {
      if (todo.id === parseInt(idNo)) {
        await fetch(`/api/idea/${idNo}`, {
          method: 'PUT',
          headers: { 'Content-type': 'application/json' },
          body: JSON.stringify({
            id: todo.id,
            nameOfTask: todo.nameOfTask,
            isDone: !todo.isDone,
          }),
        })
      }
    }
    getTask()
  }

  //удалить
  const deleteTask = async (idNo) => {
    if (window.confirm('Вы точно хотите удалить эту запись?')) {
      for (let todo of todos) {
        if (todo.id === parseInt(idNo)) {
          await fetch(`/api/idea/${idNo}`, {
            method: 'DELETE',
            headers: { 'Content-type': 'application/json' },
          })
        }
      }
      getTask()
    }
  }

  //редактировать
  const getEdit = (idNo) => {
    for (let todo of todos) {
      if (todo.id === idNo) {
        setnameOfTask(todo.nameOfTask)
      }
    }
    setbuttonText('сохранить')
    setEditId(idNo)
  }

  //редактировать
  const editTask = async () => {
    for (let todo of todos) {
      if (todo.id === editId) {
        await fetch(`/api/idea/${editId}`, {
          method: 'PUT',
          headers: { 'Content-type': 'application/json' },
          body: JSON.stringify({
            id: todo.id,
            nameOfTask: nameOfTask,
            isDone: todo.isDone,
          }),
        })
      }
    }
    setnameOfTask('')
    setbuttonText('добавить')
    getTask()
  }

  const handleFilter = async (value) => {
    await fetch(`/api/idea?isDone=${value}`)
      .then((res) => res.json())
      .then((data) => setTodos(data))
  }

  const handlesubmit = (e) => {
    e.preventDefault()
    buttonText === 'добавить' ? addTodo() : editTask()
  }

  const fields = [
    {
      type: 'textarea',
      name: 'nameOfTask',
      value: nameOfTask,
      onChange: (e) => setnameOfTask(e.target.value),
    },
  ]

  return (
    <>
      <CustomForm
        fields={fields}
        onSubmit={handlesubmit}
        title="Поделитесь идеями по улучшению работы компании или web-портала! Помогите нам стать лучше!"
        submitBtn={buttonText}
        containerClassName={styles['idea-page']}
        titleClassName={styles['idea-page__title']}
        buttonsClassName={styles['idea-page__button']}
      />
      <div
        className="input-container"
        style={{ paddingBottom: '20px', backgroundColor: '#fff' }}
      >
        <hr />
        <div className="input-button-section" style={{ marginBottom: '10px' }}>
          <Button
            className={styles['job__button']}
            onClick={() => handleFilter('false')}
          >
            В работе
          </Button>
          <Button
            className={styles['done__button']}
            onClick={() => handleFilter('true')}
          >
            Выполнено
          </Button>
          <Button className={styles['all__button']} onClick={() => getTask()}>
            ВСЕ
          </Button>
        </div>
        <hr />
        <div className="todo-container">
          {todos.map((todo) => (
            <div key={todo.id} className="todo-list">
              <div className="left-col">
                <button
                  className={`done ${props.user?.isAdmin && 'admin__button'}`}
                  onClick={() => checkTask(todo.id)}
                  disabled={props.user?.isAdmin === true ? false : true}
                >
                  {todo.isDone === true ? '✅' : '🕘'}
                </button>
                <p className={`idea-title ${todo.isDone && 'idea-done'} `}>
                  {todo.nameOfTask}
                </p>
              </div>

              {/* ДЛЯ АДМИНА */}
              {props.user?.isAdmin && (
                <div className="calendar-button">
                  <Button onClick={() => getEdit(todo.id)}>Изменить</Button>
                  <Button onClick={() => deleteTask(todo.id)}>удалить</Button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>{' '}
    </>
  )
}

export default Idea

Idea.propTypes = {
  user: PropTypes.object,
}
