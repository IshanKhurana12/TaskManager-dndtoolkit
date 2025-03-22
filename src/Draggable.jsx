import {useDraggable} from '@dnd-kit/react';

export  function Draggable({id,task}) {
  const {ref} = useDraggable({
    id:task.id
  });

  return (

    <button ref={ref} id={task.id}>
     {task.text}
    </button>
  );
}