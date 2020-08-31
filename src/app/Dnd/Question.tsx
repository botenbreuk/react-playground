import React, { CSSProperties } from 'react';
import { useDrag } from 'react-dnd';
import { QuestionTypes } from './QuestionTypes';

const style: CSSProperties = {
  border: '1px dashed gray',
  backgroundColor: 'white',
  padding: '0.5rem 1rem',
  marginRight: '1.5rem',
  marginBottom: '1.5rem',
  cursor: 'move',
  float: 'left'
};

interface Props {
  name: string;
}

export default function Question(props: Props) {
  const { name } = props;
  const [{ isDragging }, drag] = useDrag({
    item: { name, type: QuestionTypes.NEW_QUESTION },
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  });
  const opacity = isDragging ? 0.4 : 1;

  return (
    <div ref={drag} style={{ ...style, opacity }}>
      {name}
    </div>
  );
}