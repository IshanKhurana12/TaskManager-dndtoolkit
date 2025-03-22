import { DragDropProvider } from '@dnd-kit/react';

import { Draggable } from './Draggable';
import { Droppable } from './Droppable';
import { useState, useContext } from 'react';
import TaskContext from './TaskProvider';
import Input from './Input';
import './app.css'
import useLocalStorage from './useLocalStorage';
import Mode from './Mode';
export default function App() {
  const [droppedArea, setDroppedArea] = useLocalStorage('droppedArea',{});
  const { tasks, setTasks } = useContext(TaskContext);
  const [types, setTypes] = useState(['delete','pending','complete']);

  //i will now use localstorage for storing and retriving the dropped area object

  function handledelete(id){
    setTasks(tasks.filter((task) => task.id !== id));
  }

  function completeTask(id){
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: true } : task
      ))
  }

  function pendingTask(id){
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: false } : task
      ))
  }
console.log(droppedArea)
  return (
    <DragDropProvider
      onDragEnd={(event) => {
        if (event.canceled) return;

        const { target } = event.operation;
        console.log(event);

       const {active}=event;
       console.log(event.operation?.source.id);//because i was not able to get the active from event idk why?
        if (target?.id) {
          const droppedTaskId = event.operation?.source.id; //console mai dekh kr nikali hai 
          const dropArea = target.id; 

          console.log(typeof(droppedTaskId));
          if(dropArea=='delete')
          {
            handledelete(droppedTaskId);
          }

          if(dropArea=='complete')
            {
            completeTask(droppedTaskId);
            }

            if(dropArea=='pending')
              {
              pendingTask(droppedTaskId);
              }
          setDroppedArea((prevState) => ({
            ...prevState,
            [droppedTaskId]: dropArea, // Store the task ID and its drop location
          }));
        }
      }}
    >
      <Input />
      <Mode/>
      <h1>ALL TASKS</h1>
      <p>Drag the Tasks to mutate the state</p>
      <div className='droppable'>
        
      {/* Render tasks that haven't been dropped yet  orrrr in pending state right now 
      or at time of creation */}
      {tasks.length > 0 && tasks.map((task) => (
        <div key={task.id}>
          {droppedArea[task.id] == null  && (
            <Draggable id={task.id} task={task} />
          )}
        </div>
      ))}
         </div>

      {/* Droppable Areas */}
      <div className="droppable">
        {types.map((type) => ( 
          <Droppable key={type} id={type}>
             <h2 style={{color:'black'}}>{type}</h2>
            {tasks.map((task) => {
              // Check if the task was dropped into this droppable area
              if (droppedArea[task.id] === type) {
                return <Draggable key={task.id} id={task.id} task={task} />;
              }//if the task is in pending or complete state then also show the task
             
              return null;
            })}
          </Droppable>
          
        ))}
      </div>
    </DragDropProvider>
  );
}
