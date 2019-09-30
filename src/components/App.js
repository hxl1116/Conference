import React, {Component} from 'react';
import Header from "./Header";
import Form from "./Form";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showRegisterBtn: true,
            showForm: false
        };

        this.handleRegisterBtn = this.handleRegisterBtn.bind(this);
        this.toggleShowForm = this.toggleShowForm.bind(this);
    }

    handleRegisterBtn() {
        this.toggleShowRegisterBtn();
        this.toggleShowForm()
    }

    toggleShowRegisterBtn() {
        this.setState({
            showRegisterBtn: !this.state.showRegisterBtn
        })
    }

    toggleShowForm() {
        this.setState({
            showForm: !this.state.showForm
        })
    }

    render() {
        return (
            <div id="content">
                <Header show={this.state.showRegisterBtn} handleBtn={this.handleRegisterBtn}/>
                <Form show={this.state.showForm} handleRegister={this.toggleShowForm}/>
            </div>
        )
    }
}

export default App
