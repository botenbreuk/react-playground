import React, { CSSProperties, useRef } from 'react';
import { BoxType } from './QuestionList';
import { QuestionTypes } from './QuestionTypes';
import { DropTargetMonitor, useDrop, XYCoord, useDrag } from 'react-dnd';

interface Props {
  id: any;
  value: BoxType;
  index: number;
  moveCard: (dragIndex: number, hoverIndex: number) => void;
  remove: (index: number) => void;
}

export default function QuestionBox(props: Props) {
  const { id, value, index, moveCard, remove } = props;
  const ref = useRef<HTMLDivElement>(null);
  const [, drop] = useDrop({
    accept: QuestionTypes.UPDATE_QUESTION,
    hover(item: BoxType, monitor: DropTargetMonitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      // Determine mouse position
      const clientOffset = monitor.getClientOffset();

      // Get pixels to the top
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      // Time to actually perform the action
      moveCard(dragIndex, hoverIndex);

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    }
  });

  const [{ opacity }, drag] = useDrag({
    item: { type: QuestionTypes.UPDATE_QUESTION, id, index },
    collect: (monitor: any) => ({
      opacity: monitor.isDragging() ? 0.4 : 1
    })
  });
  drag(drop(ref));

  let backgroundColor = 'black';
  switch (value.name) {
    case 'Glass':
      backgroundColor = 'grey';
      break;
    case 'Banana':
      backgroundColor = 'yellow';
      break;
    case 'Paper':
      backgroundColor = 'white';
      break;
  }

  const style: CSSProperties = {
    border: '1px dashed gray',
    padding: '0.5rem 1rem',
    marginBottom: '.5rem',
    backgroundColor,
    cursor: 'move',
    color: 'black',
    opacity
  };

  return (
    <div ref={ref} style={{ ...style }}>
      {index} - {value.name}
      <input style={{ width: '100%' }} />
      <button onClick={() => remove(index)}>verwijder</button>
    </div>
  );
}
