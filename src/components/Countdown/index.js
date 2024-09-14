import { Component } from "react"
import moment from "moment"
import Timer from "./Timer"
import Controls from "./Controls"
import Datepicker from "./Datepicker"
import HolidaysModal from "./HolidaysModal"
import Holidays from 'date-holidays';
import axios from "axios"

export default class Countdown extends Component{
    // constructor(props){
    //     super(props)

    //     this.state={
    //         duration : this.getRemainingTime(),
    //         paused:false
    //     }

    //     // this.handlePausedToggle = this.handlePausedToggle.bind(this)
    // }

    state={
        currentDate: moment(),
        nextDate:moment({year: moment().year() +1}),
        paused:false,
        showHolidaysModal:false,
        holidays:[],
        countryCode:null
    }

    componentDidMount(){
        this.resume()
        this.fetchCountryCode()
    }

    componentWillUnmount(){
        clearInterval(this.interval)
    }

    getRemainingTime(){
        const {currentDate,nextDate} = this.state
        const diff = nextDate.diff(currentDate)
        return moment.duration(diff);
    }

    handlePausedToggle = () =>{
       this.setState((prevState,props)=>{
        const paused = !prevState.paused

        clearInterval(this.interval);

        if(!paused){
            this.resume()
        }
        const nextState = {paused}
        !paused && (nextState.currentDate = moment())

        return nextState
       })
    }

    resume(){
        this.interval = setInterval(() => {
            this.setState({
                currentDate: moment()
            })
        },1000)
    }

    handleDateReset =(userDate)=> {
        this.setState({
            nextDate:userDate
        })
        this.fetchCountryCode()
    }

    handleHolidaysModal = () =>{
        this.setState(
            {showHolidaysModal: !this.state.showHolidaysModal}
        )
    }

    fetchHolidays =(countryCode)=>{
        const hd = new Holidays(countryCode);
        const holidays = hd.getHolidays(this.state.nextDate.year())
        this.setState({
            holidays
        })
    }

    fetchCountryCode = async ()=>{
        try {
            const response = await axios.get('https://ipwhois.app/json/')
            const countryCode= response.data.country_code
            this.setState({
                countryCode
            })
            this.fetchHolidays(countryCode)
        } catch (error) {
            console.log('Error fetching country code:', error);
        }
       
    }

    render(){
        const {paused,showHolidaysModal,holidays,nextDate} = this.state
        const duration = this.getRemainingTime()
        return <section className="hero is-dark is-bold is-fullheight has-text-centered">
        <div className="hero-body">
            <div className="container">
                <p className="title">New Year is coming up!
                    <button onClick={this.handleHolidaysModal} className="button is-rounded is-light is-small" style={{margin:'5px'}}>Holidays</button>
                </p>
                
                <section className="section">
                    <Timer duration={duration} />
                </section>

                <Datepicker onDateReset={this.handleDateReset} />

                <Controls paused={paused} onPausedToggle={this.handlePausedToggle} />

                <section className="section">
                    <i>{nextDate.format('LLLL (UTCZ)')}</i>
                </section>

                {
                    showHolidaysModal && (
                        <HolidaysModal holidays={holidays} active={showHolidaysModal} onHolidaysToggle={this.handleHolidaysModal} />
                    )
                }
                

                </div>
            </div>
        </section>
    }

}