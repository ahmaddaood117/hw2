import React, { Component } from 'react';
import MapView from './MapView'
import Text from './Text'
import Number from './Number';
import Date from './Date';


export default class FormView extends React.Component {

    constructor(props){
        super(props);
        this.state = {submitted : [], formDescriptor : props.data, formId : props.data.id }

        this.submitForm = this.submitForm.bind(this);
        this.elementValueChanged = this.elementValueChanged.bind(this);
    }

    submitForm(event){

        event.preventDefault()

        fetch('http://localhost:5555/api/submit', 
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id: this.state.formId,
                    data: this.state.submitted
                    }
                )
            }
        );
    }

    elementValueChanged(name, valuee){
       
        var index = this.state.submitted.findIndex(function(c) { 
            return c.name == name; 
        });

        if(index !== -1){
            this.state.submitted.splice(index, 1);
        }
    
        var object = {
            name : name,
            value : valuee
        }
        var joined = this.state.submitted.concat(object);
        this.setState({ submitted: joined}) 
             
    }
    
    toggle() {
        this.setState({
          open: !this.state.open
        });
      }

    render() {
        
        return (
            
            <form  onSubmit={this.submitForm}>
                <p>{this.state.formDescriptor.title}</p>
                {this.state.formDescriptor.fields.map((element) => (
                    <div>
                        {element.type === "Text" && 
                            <Text data={element} onValueChanged={this.elementValueChanged}/>
                        }
                        {element.type === "Number" && 
                            <div>
                                <Number data={element} onValueChanged={this.elementValueChanged}/>                                         
                            </div>
                        }
                        {element.type === "Location" && 
                            <div height="auto" width="auto">
                                <MapView/>
                            </div>
                        }

                        {element.type === "Date" && 
                            <div>
                                <Date data={element} onValueChanged={this.elementValueChanged}/>   
                            </div>
                        }
                    </div>
                ))}
            
                <input type="submit" value="Submit"/>
                <p>helllooo</p>
            </form>            
        );
      }

}
