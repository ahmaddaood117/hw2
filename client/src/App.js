import React, { Component } from 'react';
import './App.css';
import FormView from './FormView'

export default class App extends Component {
  
    constructor(props) {
        super(props);
        this.state = { forms: [], formDescriptors : []};

        this.getForms = this.getForms.bind(this);
        this.getformDescriptor = this.getformDescriptor.bind(this);
    }

    componentDidMount() {
        this.getForms();

    }

    getForms() {
        fetch("http://localhost:5555/api/forms")
            .then(res => res.json())
            .then(res => {

                this.setState({ forms: res})

                this.state.forms.forEach(element => {
                    this.getformDescriptor(element.id)
                })
            });
    }

    getformDescriptor(formId){

        fetch("http://localhost:5555/api/forms/" + formId)
            .then(res => res.json())
            .then((json) => {
                var joined = this.state.formDescriptors.concat(json);
                this.setState({ formDescriptors: joined })
            });
    }

    render(){  
        return (
            <div id="root" className="App">                
                {this.state.formDescriptors.map((formDescriptor) => (
                    <div className="card">
                        <div className="card-body">
                            <FormView data={formDescriptor}/>
                        </div>
                    </div>
                ))}
            </div>
        );
    }
}
