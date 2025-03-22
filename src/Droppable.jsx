import { useDroppable } from '@dnd-kit/react';
import { useEffect } from 'react';

export function Droppable({ id, children }) {
  const { isDropTarget, ref } = useDroppable({
    id,
  });

  // Define the background color based on the 'id' value
  const getBackgroundColor = () => {
    switch(id) {
      case 'delete':
        return '#ff0000'; // Red
      case 'complete':
        return '#28a745'; // Green
      case 'pending':
        return '#007bff'; // Blue
      default:
        return isDropTarget ? '#1eb99d25' : '#ffffff'; // Default color
    }
  };

  return (
    <div 
      ref={ref} 
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '35%',
        height: 200,
        backgroundColor: getBackgroundColor(),
        border: '3px solid',
        borderColor: isDropTarget ? '#1eb99d' : '#00000020',
        borderRadius: 10,
        flexDirection: 'column',
        flexWrap: 'wrap',
        gap: 10
      }}
    >
    
      {children}
    </div>
  );
}
