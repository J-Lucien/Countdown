import { Component } from "react"
import moment from "moment"
import Timer from "./Timer"
import Controls from "./Controls"
import Datepicker from "./Datepicker"

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
        paused:false
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

    render(){
        const paused = this.state.paused
        const duration = this.getRemainingTime()
        return <section className="hero is-dark is-bold is-fullheight has-text-centered">
        <div className="hero-body">
            <div className="container">
                <p className="title">New Year is coming up!</p>

                <section className="section">
                    <Timer duration={duration} />
                </section>

                <Datepicker onDateReset={this.handleDateReset} />

                <Controls paused={paused} onPausedToggle={this.handlePausedToggle} />
                
                </div>
            </div>
        </section>
    }

}