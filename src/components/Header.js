import React, {Component} from 'react'
import PropTypes from 'prop-types';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        const location = 'Santorini';

        return (this.props.show ? (
            <div id="header">
                <h1>Conference</h1>
                <p>in {location}</p>
                <button className="content-btn" onClick={this.props.handleBtn}>Register</button>
            </div>
        ) : (
            <div id="header">
                <h1>Conference</h1>
                <p>in {location}</p>
            </div>
        ));
    }
}

Header.propTypes = {
    show: PropTypes.bool,
    handleBtn: PropTypes.func
};

export default Header
