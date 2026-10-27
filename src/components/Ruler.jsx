import { Fragment } from 'react';
import './Ruler.css';

// Decorative ruler (0–800) hanging from the footer rule, echoing the 800px content grid.
const majors = Array.from({ length: 9 }, (_, i) => i * 100);
const MINORS_PER_SEGMENT = 6;

export default function Ruler() {
  return (
    <div className="ruler" aria-hidden="true">
      {majors.map((value, i) => (
        <Fragment key={value}>
          <div className={`ruler__major${i % 2 ? ' ruler__major--odd' : ''}`}>
            <span className="ruler__tick ruler__tick--tall" />
            <span className="ruler__label">{value}</span>
          </div>
          {i < majors.length - 1 && (
            <div className="ruler__segment">
              {Array.from({ length: MINORS_PER_SEGMENT }, (_, j) => (
                <span key={j} className="ruler__tick" />
              ))}
            </div>
          )}
        </Fragment>
      ))}
    </div>
  );
}
