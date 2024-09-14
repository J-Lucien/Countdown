const HolidaysModal = ({active,onHolidaysToggle}) =>
<div className={'modal'+ (active ? ' is-active': '')}>
    <div className="modal-background"  onClick={onHolidaysToggle}></div>
    <div className="modal-card">
    <header className="modal-card-head">
        <p className="modal-card-title">Modal title</p>
        <button onClick={onHolidaysToggle} className="delete" aria-label="close"></button>
    </header>
    <section className="modal-card-body">
        some content
    </section>
    <footer className="modal-card-foot">
        <div className="buttons">
        <button className="button is-success">Save changes</button>
        <button onClick={onHolidaysToggle} className="button">Cancel</button>
        </div>
    </footer>
    </div>
</div>

export default HolidaysModal