import { coordinates, positions } from '@/types/positions';
import * as style from './style.css';

type TooltipBoxProps = {
  message: string;
  position: positions;
  coords: coordinates;
};

const TooltipBox = ({
  message,
  coords,
  position = 'bottom-end',
}: TooltipBoxProps) => {
  console.log(coords);
  return (
    <div
      style={{ left: coords.left, top: coords.top }}
      className={style.tooltip({ position })}
    >
      {message}
    </div>
  );
};

export default TooltipBox;
