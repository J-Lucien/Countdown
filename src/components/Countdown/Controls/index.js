import Control from "./Control"
    
    const Controls = ({paused,onPausedToggle}) =>
        <div className="field is-grouped is-grouped-centered">
            <Control disabled={paused} color="danger" onClick={onPausedToggle} >Pause</Control>
            <Control disabled={!paused} color="success" onClick={onPausedToggle} >Resume</Control>
        </div>
    
    export default Controls