import { useEffect, useState } from 'react';

const timeFormat = { hour: '2-digit', minute: '2-digit', second: '2-digit', hourCycle: 'h23' };
const dateFormat = { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' };

// Current time and date in the given time zone, ticking every second.
export default function LiveClock({ timeZone, label }) {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="contact__clock text-muted">
      <p>
        <time style={{ fontVariantNumeric: 'tabular-nums' }}>
          {now.toLocaleTimeString('en-US', { ...timeFormat, timeZone })}
        </time>
        <span className="visually-hidden"> in {label}</span>
      </p>
      <p>{now.toLocaleDateString('en-US', { ...dateFormat, timeZone })}</p>
    </div>
  );
}
