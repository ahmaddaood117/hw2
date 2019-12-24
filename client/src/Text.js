import React, { Component } from 'react';
  
export default class Text extends React.Component{

    constructor(props){

        super(props);
        this.state = {currentId : props.data.id}

        this.onValueChanged = this.onValueChanged.bind(this);
    }

    onValueChanged(event){
        this.props.onValueChanged(this.props.data.name, event.target.value)
    }
    
    render() {

        var isRequired = false;
        var hasOptions =false;
        var options = [];

        if(typeof this.props.data.required != 'undefined' && this.props.data.required === true){
            isRequired = true;
        }

        if((typeof this.props.data.options) != "undefined"){
            hasOptions = true;
            options = this.props.data.options;
        }

        return (
            <div>
                {isRequired === true &&  
                    <input type="text" list="options" onChange={this.onValueChanged} placeholder={this.props.data.title} required/>
                } 
                {isRequired === false &&
                    <input type="text" list="options" onChange={this.onValueChanged} placeholder={this.props.data.title}/>
                }   
                
                {hasOptions  && 
                    <datalist id="options">
                        {options.map((element) => (
                            <option value={element.value} />
                        ))}
                    </datalist>
                }
            </div>
        );
    }
}