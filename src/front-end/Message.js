import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './Message.css';

export default class Message extends PureComponent {
    static propTypes = {
        id: PropTypes.string.isRequired,
        message: PropTypes.string.isRequired,
        updated: PropTypes.bool.isRequired,
        onClick: PropTypes.func.isRequired,
    };

    onClickHandler = () => {
        this.props.onClick(this.props.id)
    };

    render() {
        return <li key={this.props.id}>
            <span className={classNames('Message', {
                'Message-updated': (this.props.updated)
            })}>{this.props.message}</span>
            <button onClick={this.onClickHandler}>Update</button>
        </li>;
    }
}
