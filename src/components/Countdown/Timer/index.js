

import TimerItem from "./TimerItem"


const Timer = ({duration}) =>
    <nav className="level">
        <TimerItem label="Days" count={Math.round(duration.asDays())}/>
        <TimerItem label="Hours" count={duration.hours().toString().padStart(2,'0')}/>
        <TimerItem label="Minutes" count={duration.minutes().toString().padStart(2,'0')}/>
        <TimerItem label="Seconds" count={duration.seconds().toString().padStart(2,'0')}/>
    </nav>

export default Timer
