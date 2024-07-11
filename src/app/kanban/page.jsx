'use client';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import dynamic from 'next/dynamic'
const KanbanBoard = dynamic(() => import('./components/KanbanBoard'), { ssr: false })
const kanbanbd = () => {

  return (
    <div>
      <DndProvider backend={HTML5Backend}>
        <KanbanBoard suppressHydrationWarning={true} />
      </DndProvider>   
    </div>
  )
}

export default kanbanbd
