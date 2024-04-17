import { useState } from "react";

export default function TaskForm({ onAdd }) {
    const [taskName, setTaskName] = useState('');
    function handleSubmit(ev) {
        ev.preventDefault();
        onAdd(taskName);
        setTaskName('');
    }
    return (
        <form
            className="border-[3px] p-[5px] flex items-center border-solid border-gray-800 rounded-lg"
            onSubmit={handleSubmit}>
            <input 
                className="bg-transparent text-white border-0 px-[8px] block w-full outline-none"
                type="text"
                value={taskName}
                onChange={ev => setTaskName(ev.target.value)}
                placeholder="Your next task..." required/>
            <button
                className={{ /*"h-[20px] flex justify-center items-center align-middle bg-blue-500 px-[5px] border-0 rounded-md cursor-pointer"*/}}
                type="submit"
            >
                <svg
                    className="mr-[6px] hover:text-[#61DAFB]"
                    height="21" width="21"
                    strokeWidth="1"
                    viewBox="0 0 21 21"
                    xmlns="http://www.w3.org/2000/svg" >
                    <g fill="none" fillRule="evenodd" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" transform="translate(4 6)"><path d="m.5.5h12" /><path d="m.5 4.5h12" /><path d="m.5 8.5h7" /><path d="m9.5 8.5h4zm2 2v-4z" /></g>
                </svg>
            </button>

        </form>
    );
}