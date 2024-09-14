import { Component } from "react"
import moment from "moment"
import Timer from "./Timer"
import Controls from "./Controls"
import Datepicker from "./Datepicker"
import Footer from "../footer/Footer"
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
        timezone:Intl.DateTimeFormat().resolvedOptions().timeZone,
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

        return {
            paused
        }
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
        console.log(userDate);
        this.setState({
            nextDate:userDate
        })
    }

    handleHolidaysModal = () =>{
        this.setState(
            {showHolidaysModal: !this.state.showHolidaysModal}
        )
    }

    fetchHolidays =(countryCode)=>{
        const hd = new Holidays(countryCode);
        const holidays = hd.getHolidays(this.state.currentDate.year())
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
        const {paused,showHolidaysModal,timezone,holidays} = this.state
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

                <section className="section">
                    <h1>{timezone}</h1>
                </section>

                <Datepicker onDateReset={this.handleDateReset} />

                <Controls paused={paused} onPausedToggle={this.handlePausedToggle} />

                <HolidaysModal holidays={holidays} active={showHolidaysModal} onHolidaysToggle={this.handleHolidaysModal} />

                </div>
            </div>
            <Footer />
        </section>
    }

}