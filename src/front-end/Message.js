import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './Message.css';

export default class Message extends PureComponent {
    static basicPropTypes = {
        id: PropTypes.string.isRequired,
        message: PropTypes.string.isRequired,
        updated: PropTypes.bool.isRequired,
    };

    static propTypes = {
        ...Message.basicPropTypes,
        onClick: PropTypes.func.isRequired,
    };

    onClickHandler = () => {
        this.props.onClick(this.props.id)
    };

    render() {
        return <div className="Message" key={this.props.id}>
            <span className={classNames('Message-text', {
                'Message-text-updated': (this.props.updated)
            })}>{this.props.message}</span>
            <button onClick={this.onClickHandler}>Update</button>
        </div>;
    }
}
