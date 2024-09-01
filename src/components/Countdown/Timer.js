
const Timer = ({duration}) =>
    <nav className="level">
        <div className="level-item has-text-centered">
            <div>
            <p className="title">{Math.round(duration.asDays())}</p>
            <p className="heading">Days</p>
            </div>
        </div>
        <div className="level-item has-text-centered">
            <div>
            <p className="title">{duration.hours().toString().padStart(2,'0')}</p>
            <p className="heading">Hours</p>
            </div>
        </div>
        <div className="level-item has-text-centered">
            <div>
            <p className="title">{duration.minutes().toString().padStart(2,'0')}</p>
            <p className="heading">Minutes</p>
            </div>
        </div>
        <div className="level-item has-text-centered">
            <div>
            <p className="title">{duration.seconds().toString().padStart(2,'0')}</p>
            <p className="heading">Seconds</p>
            </div>
        </div>
    </nav>

export default Timer
