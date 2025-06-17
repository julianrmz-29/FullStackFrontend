import React, {useState, useEffect} from "react";
import './TodoView.css';
import TaskModal from './TodoForm/TodoModalFormAddEdit'


export default function TodoView(){

    const [todoData, setTodoData] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState('add');
    const [selectedTask, setSelectedTask] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const BASE_URL = 'https://localhost:7113/api/'
    
    const fetchTodos = async() =>{
        try {
        const response = await fetch(`${BASE_URL}Todo`);
        if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json();
        if(result.success){            
            setTodoData(result.data)
        }else{
            console.error('Error retriving todos: ', result.message);        
        }      
        } catch (error) {
        console.error('Error an occurred in the fetch data: ', error)
        }
    };

    const addTask = async (taskData) => {
        try {
            setIsLoading(true);
            const response = await fetch(`${BASE_URL}Todo`,{
                method:'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify({
                    taskName: taskData.taskName,
                    completed: false
                })
            });

            if(response.ok){
                console.log('Task add successfull');
                fetchTodos();
                closeModal();
            }
            else{
                console.log('Error ocurred: ', response);
                
            }
        } catch (error) {
            console.error('error: ', error);
            
        }
        finally{
            setIsLoading(false);
        }
    }

    const editTask = async (taskData) => {
        try {
            setIsLoading(true);
            const response = await fetch(`${BASE_URL}Todo/${taskData.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: taskData.id,
                    taskName: taskData.taskName,
                    completed: taskData.completed
                })
            });

            if (response.ok) {
                console.log('Task updated successfully');
                fetchTodos();
                closeModal();
            } else {
                console.error("Error occurred: ", response);
                alert('Error updating task');
            }
        } catch (error) {
            console.error("Error: ", error);
            alert('Error updating task');
        } finally {
            setIsLoading(false);
        }
    };

    const deleteTask = async (id) => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            try {
                const response = await fetch(`${BASE_URL}Todo/${id}`, {
                    method: 'DELETE'
                });
                
                if (response.ok) {
                    console.log('Successfully removed id: ', id);
                    fetchTodos(); 
                } else {
                    console.error("Error occurred: ", response);
                    alert('Error deleting task');
                }
            } catch (error) {
                console.error("Error: ", error);
                alert('Error deleting task');
            }
        }
    };
    
    const openAddModal = () => {
        setModalMode('add');
        setSelectedTask(null);
        setIsModalOpen(true);
    };
    
    const openEditModal = (task) => {
        setModalMode('edit');
        setSelectedTask(task);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedTask(null);
    };

    const handleSaveTask = (taskData) => {
        if (modalMode === 'add') {
            addTask(taskData);
        } else {
            editTask(taskData);
        }
    };

    useEffect(() => {
        fetchTodos()
    },[]);

    return (
        <div className="DivTodo">
            <h2 className="H2">Todo List</h2>
            <section>
                <button className="AddBtn" onClick={openAddModal}>Add new task</button>
            </section>
            <section className="Table-Section">
                <table className="Table">
                    <thead className="T-Head">
                        <tr>
                            <th>Id</th>
                            <th>Task</th>
                            <th>Completed</th>
                            <th>Creation date</th>
                            <th>Modification date</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody className="T-Body">
                    {todoData && todoData.length > 0 ? (
                        todoData.map((todo) => (
                        <tr key={todo.id} className="T-Tr">
                            <td>{todo.id}</td>
                            <td>{todo.taskName}</td>
                            <td>{todo.completed ? "Yes" : "No"}</td>
                            <td>{new Date(todo.creationDate).toLocaleString()}</td>
                            <td>{todo.updateDate ? new Date(todo.updateDate).toLocaleString() : "N/A"}</td>
                            <td><button className="EditBtn" onClick={() => openEditModal(todo)}>Edit</button></td>
                            <td><button className="DelBtn" onClick={() => deleteTask(todo.id)}>Delete</button></td>
                        </tr>
                        ))
                    ) : (
                        <tr>
                            <td className="Span-inf" colSpan="9">No tasks available!..</td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </section>
            <TaskModal
                isOpen={isModalOpen}
                onClose={closeModal}
                mode={modalMode}
                task={selectedTask}
                onSave={handleSaveTask}
                isLoading={isLoading}
            />
        </div>
    )
}