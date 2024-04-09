import moment from 'moment/moment'
import React from 'react'
import { deleteTodo, markTodo } from '../../services/api.js'
import { toast } from 'react-toastify'

const Todo = ({ todo, setRefreshList }) => {

    const handleDelete = async (id) => {

        const result = await deleteTodo({
            todo_id: id
        })

        if (result.data.status === 200) {
            setRefreshList(new Date())
            toast.success("Todo Deleted!")
        } else {
            toast.error("Failed to delete , please try again!")
        }
    }

    const handleMarkTodo = async (id) => {

        const result = await markTodo({
            todo_id: id
        })

        if (result.data.status === 200) {
            setRefreshList(new Date())
            toast.success(result.data.message)
        } else {
            toast.error("Failed to Mark , please try again!")
        }
    }

    return (
        <div className='col-sm-3 mx-3 my-2 alert bg-light'>

            <div className="card-header">
                {todo.isCompleted ? 'Completed' : "Not Completed"}
            </div>

            <div className="card-body">

                <h4 className='card-title' style={{ textDecoration: todo.isCompleted ? 'line-through' : 'none' }} >{todo.desc}</h4>
                <p className="card-text">{moment(todo.date).fromNow()}</p>

            </div>

            <div className="actionButtons" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '25px' }}>

                <div className="deleteButton">
                    <button
                        style={{ background: 'red', border: 'none', borderRadius: '20px', color: 'white' }}
                        onClick={() => handleDelete(todo._id)}>
                        Delete
                    </button>
                </div>

                <div className="markTodo">
                    <button
                        style={{ background: 'darkGreen', border: 'none', borderRadius: '20px', color: 'white' }}
                        onClick={() => handleMarkTodo(todo._id)}
                    >
                        {todo.isCompleted ? 'Mark Uncompleted' : "Mark Completed"}
                    </button>
                </div>

            </div>
        </div>
    )
}

export default Todo