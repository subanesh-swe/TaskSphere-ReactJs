
import '../Stylesheets/App.css';
import TaskForm from "./TaskForm";
import Task from "./Task";
import { useEffect, useState } from "react";

const localStorageKeyName = 'todo-list-react-tasks';
function App() {
    const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem(localStorageKeyName)) || []);

    useEffect(() => {
        localStorage.setItem(localStorageKeyName, JSON.stringify(tasks));
    }, [tasks]);

    function getDateTime() {
        var currentdate = new Date();
        var datetime = currentdate.getDate() + "/" + currentdate.getMonth()
            + "/" + currentdate.getFullYear() + " @ "
            + currentdate.getHours() + ":"
            + currentdate.getMinutes() + ":" + currentdate.getSeconds();
        return datetime;
    }
    function addTask(name) {
        name = name.trim();
        if (name.length !== 0) {
            setTasks(prev => {
                return [...prev,
                    {
                        name: name,
                        done: false,
                        dateLog: {
                            created: getDateTime(),
                        }
                    }];
            });
        }
    }

    function renameTask(index, newName) {
        setTasks(prev => {
            let newTasks = [...prev];
            newTasks[index].name = newName;
            newTasks[index].dateLog = {
                ...newTasks[index].dateLog,
                updated: getDateTime()
            };
            return newTasks;
        })
    }

    function removeTask(indexToRemove) {
        setTasks(prev => {
            return prev.filter((taskObject, index) => index !== indexToRemove);
        });
    }

    function updateTaskDone(taskIndex, newDone) {
        setTasks(prev => {
            let newTasks = [...prev];
            newTasks[taskIndex].done = newDone;
            newTasks[taskIndex].dateLog = {
                ...newTasks[taskIndex].dateLog,
                completed: getDateTime()
            };
            return newTasks;
        });
    }

    const numberComplete = tasks.filter(t => t.done).length;
    const numberTotal = tasks.length;

    function getMessage() {
        const percentage = numberComplete / numberTotal * 100;
        if (percentage === 0) {
            return 'Try to do at least one! 🙏';
        }
        if (percentage === 100) {
            return 'Nice job for today! 🏝';
        }
        return 'Keep it going 💪🏻';
    }

    return (
        <main className="mx-auto my-5 min-w-[300px] max-w-[300px] md:max-w-[350px] lg:max-w-[550px]">
            <h1 className="text-4xl font-bold text-center">{numberComplete}/{numberTotal} Complete</h1>
            <br />
            <h2 className="text-2xl font-bold text-center">{getMessage()}</h2>
            <br />
            <TaskForm onAdd={addTask} />
            {tasks.some(task => !task.done) && (
                <div>
                    <br />
                    <h3>Scheduled Tasks</h3>
                    {tasks.map((task, index) => (
                        !task.done && (
                            <Task
                                key={index}
                                {...task}
                                onRename={newName => renameTask(index, newName)}
                                onTrash={() => removeTask(index)}
                                onToggle={done => updateTaskDone(index, done)}
                            />
                        )
                    ))}
                </div>
            )}
            {tasks.some(task => task.done) && (
                <div>
                    <br />
                    <h3>Completed Tasks</h3>
                    {tasks.map((task, index) => (
                        task.done && (
                            <Task
                                key={index}
                                {...task}
                                onRename={newName => renameTask(index, newName)}
                                onTrash={() => removeTask(index)}
                                onToggle={done => updateTaskDone(index, done)}
                            />
                        )
                    ))}
                </div>
            )}
            {tasks.length === 0 && (
                <div>
                    <br />
                    <h3>No Tasks Found</h3>
                </div>
            )}
        </main>
    );
}

export default App;
