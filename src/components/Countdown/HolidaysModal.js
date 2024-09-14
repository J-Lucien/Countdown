import moment from "moment/moment"

const formatDate = (nextDate) =>{
    const parsedDate = moment(nextDate, moment.ISO_8601, true); // Strict mode for ISO 8601
    
    if(parsedDate.isValid()){
        return parsedDate.format('MM/DD/YYYY')
    }
    return moment(nextDate, "YYYY-MM-DD HH:mm:ss Z").format("MM/DD/YYYY");
}

const HolidaysModal = ({active,onHolidaysToggle,holidays}) =>
<div className={'modal'+ (active ? ' is-active': '')}>
    <div className="modal-background"  onClick={onHolidaysToggle}></div>
    <div className="modal-card">
    <header className="modal-card-head">
        <p className="modal-card-title">Holidays</p>
        <button onClick={onHolidaysToggle} className="delete" aria-label="close"></button>
    </header>
    <section className="modal-card-body">
        <table className="table is-fullwidth is-hoverable is-striped is-bordered" >
            <thead>
               <tr>
                <th className="has-text-centered">Date</th>
                <th className="has-text-centered">Holidays</th>
               </tr>
            </thead>
            <tbody>
                {holidays.map((holiday,index) => 
                    <tr key={index}>
                        <td>{formatDate(holiday.date) }</td>
                        <td>{holiday.name}</td>
                    </tr>
                )}
            </tbody>
        </table>
    </section>
    </div>
</div>

export default HolidaysModal