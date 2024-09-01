
import moment from "moment"
import { Component } from "react"
import styled from "styled-components"

const StyledInput = styled.input`
    &::placeholder{
        color:#FF6347;
        opacity:1
    }
`

export default class Datepicker extends Component{

    state = {
        date:'2018-12-12'
    }

    handleDateChange = (e) =>{
        this.setState({
            date: e.target.value
        })
    }

    handleDateSubmit =(e) =>{
        e.preventDefault()
        this.props.onDateReset(moment(this.state.date))
    }

    render(){

        const {date} = this.state

        return <form onSubmit={this.handleDateSubmit} >
            <div className="field  is-grouped is-grouped-centered" style={{marginBottom:40}}>
                <p className="control">
                    <StyledInput 
                    className="input is-medium is-rounded has-background-grey-lighter has-text-black" 
                    type="text" 
                    value={date}
                    onChange={this.handleDateChange}
                    placeholder="Type a date.." />
                </p>
                <p className="control">
                    <button className="button is-light is-outlined is-medium is-rounded">
                    Reset
                    </button>
                </p>
            </div>
        </form>
    }
}
