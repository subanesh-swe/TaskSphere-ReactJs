
import Checkbox from "./Checkbox";
import { useState } from "react";

export default function Task({ name, done, dateLog, onToggle, onTrash, onRename }) {
    const [editMode, setEditMode] = useState(false);
    return (
        <div className={'bg-[#30313D] rounded-[10px] px-[9px] py-[5px] mt-[5px] transition-opacity ease-linear duration-300 hover:opacity-100 ' + (done ? 'opacity-30 task done' : 'task')}>
            <div className={'flex items-center'}>
                <Checkbox
                    checked={done} onClick={() => onToggle(!done)}
                />
                {done && (
                    <div className="task-name grow ">
                        <span className="line-through">{name}</span>
                    </div>
                )}
                {!editMode && !done && (
                    //<div className="task-name grow " onClick={() => setEditMode(prev => !prev)}>
                    <div className="task-name grow ">
                        <span>{name}</span>
                    </div>
                )}
                {editMode && !done && (
                    <form
                        className="grow mr-[5px]"
                        onSubmit={ev => { ev.preventDefault(); setEditMode(false); }}>
                        <input
                            className="bg-transparent text-white border-md border-solid border-2 border-[#555] px-[4px] py-[2px] block w-full outline-none"
                            autofocus
                            type="text"
                            value={name}
                            onChange={ev => onRename(ev.target.value)} />
                    </form>
                )}
                {!done && (
                    <button className="trash cursor-pointer" onClick={() => setEditMode(prev => !prev)}>
                        <svg
                            className="h-[14px] mr-[6px] stroke-[#aaa] hover:stroke-[#61DAFB] feather feather-edit"
                            fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                        </svg>
                    </button>
                )}
                <button className="trash cursor-pointer" onClick={onTrash}>
                    <svg
                        className="h-[14px] mr-[6px] fill-[#888] hover:fill-[#61DAFB]"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512">
                        <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
                    </svg>
                </button>

            </div>
            <div className={'flex flex-col mt-[2px] text-xs'}>
                {dateLog?.created && (<p>Created: {dateLog?.created}</p>)}
                {dateLog?.updated && (<p>Updated: {dateLog?.updated}</p>)}
                {done && dateLog?.completed && (<p>Completed: {dateLog?.completed}</p>)}
            </div>
        </div>
    );
}
