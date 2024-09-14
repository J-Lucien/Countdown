import { Component } from "react"
import moment from "moment"
import Timer from "./Timer"
import Controls from "./Controls"
import Datepicker from "./Datepicker"
import Footer from "../footer/Footer"
import HolidaysModal from "./HolidaysModal"

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
        showHolidaysModal:false
    }

    componentDidMount(){
        this.resume()
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

    render(){
        const {paused,showHolidaysModal} = this.state
        const duration = this.getRemainingTime()
        return <section className="hero is-dark is-bold is-fullheight has-text-centered">
        <div className="hero-body">
            <div className="container">
                <p className="title">New Year is coming up!
                    <button onClick={this.handleHolidaysModal} class="button is-rounded is-light is-small" style={{margin:'5px'}}>Holidays</button>
                </p>
                
                <section className="section">
                    <Timer duration={duration} />
                </section>

                <Datepicker onDateReset={this.handleDateReset} />

                <Controls paused={paused} onPausedToggle={this.handlePausedToggle} />

                <HolidaysModal active={showHolidaysModal} onHolidaysToggle={this.handleHolidaysModal} />

                </div>
            </div>
            <Footer />
        </section>
    }

}