import React, { useEffect, useState } from 'react'
import Header from './partials/Header.jsx'
import Todo from './partials/Todo.jsx'
import AddTodoModal from './partials/AddTodoModal.jsx'
import { useNavigate } from 'react-router-dom'
import { getTodoList } from '../services/api.js'



const Home = () => {

  const [list, setList] = useState([])
  const [refreshList, setRefreshList] = useState();
  const [searchText, setSearchText] = useState('');
  const [filteredList, setFilteredList] = useState([]);

  const navigate = useNavigate();


  useEffect(() => {

    const findUser = localStorage.getItem("user");
    if (!findUser) {
      navigate('/login')
    }

    fetchTodoList();

  }, [refreshList])

  useEffect(() => {

    if (searchText === '') {
      setFilteredList(list);
    } else {
      const filterTodo = list.filter(todo => todo.desc.toLowerCase().includes(searchText.toLowerCase().trim()));
      setFilteredList(filterTodo)
    }

  }, [list, searchText])



  const fetchTodoList = async () => {

    const result = await getTodoList();

    if (result.status === 200 && result.data.status === 200) {
      setList(result.data.data.todos.reverse());
    }
  }


  return <>
    <Header searchText={searchText} setSearchText={setSearchText} />


    <div className="container">
      <div className="row justify-content-md-center mt-4">

        {
          filteredList.map((todo) => <Todo todo={todo} key={todo._id} setRefreshList={setRefreshList} />)
        }

        {
          filteredList.length === 0 && (
            <div className="notFoundTodos">
              No Todos 
            </div>
          )
        }

      </div>
    </div>

    <div style={{ position: 'fixed', right: 50, bottom: 50, zIndex: 1030 }}>
      <button
        type="button"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        className='btn btn-outline-light'
      >
        Add
      </button>
    </div>

    <AddTodoModal setRefreshList={setRefreshList} />

  </>
}

export default Home