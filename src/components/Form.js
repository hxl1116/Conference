import React, {Component} from 'react';
import PropTypes from 'prop-types';

const states = [
    "AL", "AK", "AS", "AZ", "AR", "CA", "CO", "CT", "DE", "DC", "FM", "FL", "GA", "GU", "HI", "ID", "IL", "IN", "IA",
    "KS", "KY", "LA", "ME", "MH", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC",
    "ND", "MP", "OH", "OK", "OR", "PW", "PA", "PR", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VI", "VA", "WA", "WV",
    "WI", "WY"
];

const payments = ['Credit', 'Visa', 'PayPal'];

class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            validated: false
        };

        this.data = {
            firstName: {
                id: 'first-name',
                value: '',
                pattern: /^[A-Za-z]+$/
            }
            ,
            lastName: {
                id: 'last-name',
                value: '',
                pattern: /^[A-Za-z]+$/
            },
            email: {
                id: 'email',
                value: '',
                pattern: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
            },
            lineOne: {
                id: 'line-one',
                value: '',
                pattern: /^[A-Za-z0-9\s]+$/
            },
            lineTwo: {
                id: 'line-two',
                value: '',
                pattern: /^[A-Za-z0-9]+$/
            },
            city: {
                id: 'city',
                value: '',
                pattern: /^[A-Za-z]+$/
            },
            state: {
                id: 'state',
                value: '',
                pattern: /^[A-Z]{2}$/
            },
            zipCode: {
                id: 'zip-code',
                value: '',
                pattern: /^[0-9]{5}$/
            },
            organization: {
                id: 'organization',
                value: '',
                pattern: /^[A-Za-z0-9\s]+$/
            },
            status: {
                id: 'status',
                value: '',
                pattern: /^[A-Za-z]+$/
            },
            date: {
                id: 'date',
                value: `${new Date().getMonth() + 1}/${new Date().getDate()}/${new Date().getFullYear()}`,
                pattern: /^([0-9]{1,2})\/([0-9]{1,2})\/([0-9]{4})$/
            },
            payment: {
                id: 'payment',
                value: '',
                pattern: /^[A-Za-z]+$/
            }
        };

        this.validate = this.validate.bind(this);
        // this.validateAll = this.validateAll.bind(this);
        this.pass = this.pass.bind(this);
    }

    viewForm = () => {
        this.setState({view: 'form'});
    };

    viewReview = () => {
        this.setState({view: 'review'})
    };

    viewRegistered = () => {
        this.setState({view: 'registered'})
    };

    submitData = () => {
        this.props.toggleForm();
    };

    validate(event) {
        let target = event.target;
        this.data[target.name].value = target.value;
        if (this.data[target.name].pattern.test(target.value) || target.value === '') target.className = '';
        else {
            target.className = 'error';
            this.setState({validated: false}, () => console.log('validated -> false'));
        }

        let valid = true;
        let element;

        for (const slice of Object.values(this.data)) {
            element = document.getElementById(slice.id);
            if (slice.value === '' || element.className === 'error') valid = false
        }

        if (valid) this.setState({validated: true}, () => console.log('validated -> true'));
    }

    pass(event) {
        event.preventDefault();
        this.viewReview();
    }

    render() {
        let content;

        let form = (
            <form id="registration-form" noValidate={true} className={this.props.show ? '' : 'hide'}>
                <input id="first-name" name="firstName" type="text" placeholder="First Name" defaultValue={this.data.firstName.value} required={true} onInput={this.validate}/>
                <input id="last-name" name="lastName" type="text" placeholder="Last Name" defaultValue={this.data.lastName.value} required={true} onInput={this.validate}/>
                <input id="email" name="email" type="email" placeholder="Email" defaultValue={this.data.email.value} required={true} onInput={this.validate}/>
                <input id="line-one" name="lineOne" type="text" placeholder="Address Line 1" defaultValue={this.data.lineOne.value} required={true} onInput={this.validate}/>
                <input id="line-two" name="lineTwo" type="text" placeholder="Address Line 2" defaultValue={this.data.lineTwo.value} required={true} onInput={this.validate}/>
                <input id="city" name="city" type="text" placeholder="City" defaultValue={this.data.city.value} required={true} onInput={this.validate}/>
                <input id="state" name="state" list="states" placeholder="State" defaultValue={this.data.state.value} required={true} onInput={this.validate}/>
                <datalist id="states">
                    {states.map((state, index) => <option key={index} value={state}/>)}
                </datalist>
                <input id="zip-code" name="zipCode" type="text" placeholder="Zip Code" defaultValue={this.data.zipCode.value} required={true} onInput={this.validate}/>
                <input id="organization" name="organization" type="text" placeholder="School/Company" defaultValue={this.data.organization.value} required={true} onInput={this.validate}/>
                <input id="status" name="status" type="text" placeholder="Status" defaultValue={this.data.status.value} required={true} onInput={this.validate}/>
                <input id="date" name="date" type="text" placeholder={this.data.date.value} defaultValue={this.data.date.value} required={true} onInput={this.validate}/>
                <input id="payment" name="payment" list="payments" placeholder="Payment" defaultValue={this.data.payment.value} required={true} onInput={this.validate}/>
                <datalist id="payments">
                    {payments.map((payment, index) => <option key={index} value={payment}/>)}
                </datalist>
                <button id="submit-btn" className={this.state.validated ? '' : 'hide'} onClick={this.pass}>Next</button>
            </form>
        );

        let review = (
            <div className="container">
                <h2>Is this information correct?</h2>
                <h3>Info</h3>
                <p>
                    {`${this.data.firstName.value}, ${this.data.lastName.value}`}<br/>
                    {`${this.data.email.value}`}
                </p>
                <h3>Address</h3>
                <p>
                    {`${this.data.lineOne.value}, ${this.data.lineTwo.value}`}<br/>
                    {`${this.data.city.value}, ${this.data.state.value}, ${this.data.zipCode.value}`}
                </p>
                <h3>Other</h3>
                <p>
                    {`${this.data.organization.value}, ${this.data.status.value}`}<br/>
                    {`${this.data.date.value}`}
                </p>
                <h3>Payment</h3>
                <p>{`${this.data.payment.value}`}</p>
                <div id="btn-group">
                    <button id="prev-btn" className="content-btn" onClick={this.viewForm}>Back</button>
                    <button id="confirm-btn" className="content-btn" onClick={this.viewRegistered}>Register</button>
                </div>
            </div>
        );

        let registered = (
            <div className="container">
                <h2>Registration Complete!</h2>
                <p style={{textAlign: "center"}}>Thank you for registering {this.data.firstName.value}</p>
            </div>
        );

        switch (this.state.view) {
            case "form":
                content = form;
                break;
            case 'review':
                content = review;
                break;
            case 'registered':
                content = registered;
                break;
            default:
                content = form;
                break;
        }

        return (
            <div id="registration-container">
                {content}
            </div>
        )
    }
}

Form.propTypes = {
    show: PropTypes.bool,
    toggleForm: PropTypes.func
};

export default Form
