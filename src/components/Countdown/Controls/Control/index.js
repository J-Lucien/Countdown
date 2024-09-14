const Control = ({disabled, color,onClick,children}) => 
    <p className="control">
            <button 
            className={'button is-outlined is-rounded is-medium is-'+color}    
            disabled={disabled} 
            onClick={onClick}
            style={{backgroundColor:'transparent'}}
            >{children}</button>
    </p>

export default Control