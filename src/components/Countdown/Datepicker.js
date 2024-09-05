
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
        date:'',
        valid:true,
        dirty:false
    }

    handleDateChange = ({target:{value}}) =>{
        const date = moment(value),
            valid = date.isValid() && date.isAfter(moment())
        this.setState({
            date: value,
            valid,
            dirty:true
        })

        valid && this.props.onDateReset(date)
    }

    // handleDateSubmit =(e) =>{
    //     e.preventDefault()
    //     const date = moment(this.state.date);
    //     date.isValid() && date.isAfter(moment()) && this.props.onDateReset(date)
    // }

    render(){

        let {date,valid,dirty} = this.state,
            classes = 'input is-medium is-rounded has-background-grey-lighter has-text-black';

        valid && dirty && (classes += ' is-success') 
        !valid && dirty && (classes += ' is-danger') 

        return <form onSubmit={this.handleDateSubmit} >
            <div className="field  is-grouped is-grouped-centered" style={{marginBottom:40}}>
                <p className="control">
                    <StyledInput 
                    className={classes} 
                    type="text" 
                    value={date}
                    onChange={this.handleDateChange}
                    placeholder="Type a date.." />
                    {!valid && <i className="help is-danger">Please enter valid (and future) date</i>}
                </p>
                {/* <p className="control">
                    <button className="button is-light is-outlined is-medium is-rounded">
                    Reset
                    </button>
                </p> */}
            </div>
        </form>
    }
}
