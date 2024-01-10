import { useEffect, useState } from 'react';

const calculatePosition = (screenPoint, setTop, setLeft) => {
  const width = window.innerWidth;
  const x = screenPoint.x;
  const y = screenPoint.y;
  if (y < 100) {
    setTop(y + 100);
  } else {
    setTop(y - 50);
  }
  if (x > width / 2) {
    setLeft(x - 100);
  } else {
    setLeft(x + 30);
  }
};

const ToolTip = ({ screenPoint, content }) => {
  console.log(screenPoint);
  console.log(content);
  const [top, setTop] = useState(40);
  const [left, setLeft] = useState(40);
  const style = {
    zIndex: 1000,
    position: 'absolute',
    display: 'block',
    padding: '0.5rem .8rem',
    top: top,
    left: left,
    background: '#82a0bc',
    textAlign: 'center',
    maxWidth: '30%',
    color: 'white',
    borderRadius: '10px',
  };
  const separatorStyle = {
    borderTop: '1px solid white',
    margin: '2px 0',
  };
  useEffect(() => {
    if (screenPoint) {
      calculatePosition(screenPoint, setTop, setLeft);
    }
  }, [screenPoint]);
  return (
    <div style={style}>
      <div>{content.location}</div>
      <hr style={separatorStyle} />
      <div>{content.name}</div>
    </div>
  );
};
export default ToolTip;
