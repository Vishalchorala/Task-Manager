import React, { useState } from "react";
import '../stylesheet/taskmanager.css';

const   TaskManager = () => {

    const [task, settask] = useState('');
    const [tasks, settasks] = useState([]);

    const [showCompleted, setshowCompleted] = useState(false)

    const addTask = () => {
        if (task === '') {
            alert("Task Field is empty...!")
        }
        else {
            const newTask = { text: task, completed: false };
            settasks([...tasks, newTask])
            settask('')
        }
    }

    const taskCompleted = (index) => {
        const filterCompleteTask = tasks.map((item, ind) =>
            ind === index ? { ...item, completed: !item.completed } : item)
        settasks(filterCompleteTask);
    }

    const deleteTask = (index) => {
        const updatedTask = tasks.filter((_, ind) => ind !== index)
        settasks(updatedTask)
    }

    const totalTask = tasks.length;
    const completedTask = tasks.filter(tasks => tasks.completed).length;
    const pendingTask = tasks.filter(tasks => !tasks.completed).length;
    const progressTask = totalTask > 0 ? Math.round((completedTask / totalTask) * 100) : 0;

    return (
        <>
            <div className="container w-75 mt-5">
                <h2 className="fw-bold my-3">Task Manager</h2>

                <div className="row">
                    <div className="col-6">
                        <div className="Total">
                            <p>Total Tasks</p>
                            <h3 className="fw-bold">{totalTask}</h3>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="Completed">
                            <p>Completed</p>
                            <h3 className="fw-bold">{completedTask}</h3>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="Pending">
                            <p>Pending</p>
                            <h3 className="fw-bold">{pendingTask}</h3>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="Progress">
                            <p>Progress</p>
                            <h3 className="fw-bold">{progressTask}%</h3>
                        </div>
                    </div>
                </div>

                <div className="d-flex gap-2 mt-2">
                    <input type="text" className="form-control todo-input" placeholder="Enter new task..."
                        value={task} onChange={(e) => settask(e.target.value)} />
                    <button className="btn btn-primary px-4 py-2 fw-bold" onClick={addTask}>Add Task</button>
                </div>

                <div className="mt-4 mb-3">
                    <input type="checkbox" className="me-2" id="showCompleted"
                        checked={showCompleted} onChange={() => setshowCompleted(!showCompleted)} />
                    <label htmlFor="showCompleted" id="showCompleted" className="showCompleted mb-0">Show Completed Only</label>
                </div>

                <div>
                    {
                        tasks.filter(task => !showCompleted || task.completed).map((item, index) => {
                            return (
                                <div key={index} className="shadow px-4 py-3 card-items mb-3">
                                    <div>
                                        <input type="checkbox" className="me-2"
                                            checked={item.completed} onChange={() => taskCompleted(index)}
                                        />
                                        <label htmlFor="" className={`${item.completed ? "taskCompleted" : ""}`} >
                                            {item.text}
                                        </label>
                                    </div>
                                    <button className="btn btn-danger px-4 fw-bold" onClick={() => deleteTask(index)}>Delete</button>
                                </div>
                            )
                        })
                    }
                </div>

            </div>
        </>
    )
};

export default TaskManager;