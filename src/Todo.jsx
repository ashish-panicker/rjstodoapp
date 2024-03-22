import React from 'react'
import { collection, addDoc, getDocs } from 'firebase/firestore'
import { db } from './firebaseConfig'

const Todo = () => {
  const [todo, setTodo] = React.useState('')
  const [todos, setTodos] = React.useState([])

  React.useEffect(() => {
    fetchPost()
  }, [])

  const fetchPost = async () => {
    await getDocs(collection(db, 'todos')).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }))
      setTodos(newData)
      console.log(todos, newData)
    })
  }

  const addTodo = async (e) => {
    e.preventDefault()
    const newTodo = {
      text: todo,
      isComplete: false,
    }
    try {
      // Sending data to firebase colelction named todos
      const docRef = await addDoc(collection(db, 'todos'), newTodo)
      console.log('Document written with ID: ', docRef.id)
      setTodo('')
    } catch (e) {
      console.error('Error adding document: ', e)
    }
  }

  return (
    <section className="todo-container">
      <div className="todo">
        <h1 className="header">Todo-App</h1>

        <div>
          <div>
            <input
              type="text"
              placeholder="What do you have to do today?"
              onChange={(e) => setTodo(e.target.value)}
              value={todo}
            />
          </div>

          <div className="btn-container">
            <button type="submit" className="btn" onClick={addTodo}>
              Submit
            </button>
          </div>
        </div>

        <div className="todo-content">
          {todos.length > 0 &&
            todos.map((todo, i) => (
              <p key={i} style={{ marginBottom: '8px' }}>
                {todo.text}
              </p>
            ))}
        </div>
      </div>
    </section>
  )
}

export default Todo
