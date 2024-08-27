import { useEffect, useState } from 'react'
import './IdeaPage.css'
import PropTypes from 'prop-types'

function Idea(props) {
  const [todos, setTodos] = useState([])
  const [nameOfTask, setnameOfTask] = useState('')
  const [editId, setEditId] = useState('')
  const [buttonText, setbuttonText] = useState('добавить')

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

  // const handleKeyPress = (e) => {
  //   if (e.keyCode === 13) {
  //     addTodo()
  //   }
  // }

  //получить с сервера
  const getTask = async () => {
    await fetch('/api/idea?_sort=id&_order=desc')
      .then((res) => res.json())
      .then((data) => setTodos(data))
  }

  useEffect(() => {
    getTask()
  }, [])

  const handleFilter = async (value) => {
    await fetch(`/api/idea?isDone=${value}`)
      .then((res) => res.json())
      .then((data) => setTodos(data))
  }

  return (
    <div
      className="input-container"
      style={{ paddingBottom: '20px', backgroundColor: '#fff' }}
    >
      <div className="head-container">
        <h3 className="input-logo" style={{ marginBottom: '20px' }}>
          Поделитесь идеями по улучшению работы компании или web-портала!
          Помогите нам стать лучше!
        </h3>

        <textarea
          type="text"
          autoComplete="off"
          placeholder="Введите новую идею..."
          className="input-inp"
          value={nameOfTask}
          onChange={(e) => setnameOfTask(e.target.value)}
          // onKeyUp={handleKeyPress}
        />
        <button
          className="operate-button"
          style={{ width: '150px' }}
          onClick={() => {
            buttonText === 'добавить' ? addTodo() : editTask()
          }}
        >
          {buttonText}
        </button>
      </div>
      <hr />
      <div className="input-button-section" style={{ marginBottom: '10px' }}>
        <a
          onClick={() => handleFilter('false')}
          className="operate-button "
          style={{ marginRight: '10px' }}
        >
          В работе
        </a>
        <a
          onClick={() => handleFilter('true')}
          type="button"
          className="operate-button "
          // style={{ backgroundColor: '#285D49' }}
          style={{ marginRight: '10px' }}
        >
          Выполнено
        </a>
        <a
          onClick={() => getTask()}
          className="operate-button"
          style={{ width: '75px', textAlign: 'center', marginRight: '0px' }}
        >
          ВСЕ
        </a>
      </div>
      <hr />
      <div className="todo-container">
        {todos.map((todo) => (
          <div key={todo.id} className="todo-list">
            <div className="left-col">
              {todo.isDone === true ? (
                <>
                  <button
                    className="done "
                    value={todo.id}
                    // onClick={(e) => checkTask(e.target.value)}
                  >
                    ✅
                  </button>
                  <p className="idea-title idea-done">{todo.nameOfTask}</p>
                </>
              ) : (
                <>
                  <button
                    className="done "
                    value={todo.id}
                    // onClick={(e) => checkTask(e.target.value)}
                  >
                    🕘
                  </button>
                  <p className="idea-title">{todo.nameOfTask}</p>
                </>
              )}
            </div>

            {/* ДЛЯ АДМИНА */}
            {props.user?.isAdmin && (
              <div className="calendar-button">
                <a onClick={() => getEdit(todo.id)} className="operate-button">
                  Изменить
                </a>
                <a
                  onClick={() => deleteTask(todo.id)}
                  className="operate-button"
                >
                  удалить
                </a>
                {todo.isDone === true ? (
                  <>
                    <button
                      className="done Adone"
                      value={todo.id}
                      onClick={(e) => checkTask(e.target.value)}
                    >
                      ✅
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="done Adone"
                      value={todo.id}
                      onClick={(e) => checkTask(e.target.value)}
                    >
                      🕘
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Idea

Idea.propTypes = {
  user: PropTypes.object,
}
