import React, { Component, PropTypes } from 'react';
import moment from 'moment'
import Tooltip from '../Tooltip'

export default class TimeAgo extends Component {
    constructor(props) {
        super(props)
        this._interval = setInterval(this.forceUpdate, props.refreshRate)
    }

    componentWillUnmount() {
        clearInterval(this._interval)    
    }

    render() {
        const time = moment(this.props.time);
        return (
            <Tooltip 
                content={time.format(this.props.format)}
                className="timeago"
                position="top"
            >
                {time.fromNow()}
            </Tooltip>
        )
    }
}

TimeAgo.defaultProps = {
    refreshRate: 60000,
    format: 'dddd [at] hh:mm:ss A'
}

TimeAgo.propTypes = {
    time: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.array,
        PropTypes.number
    ]),
    refreshRate: PropTypes.number,
    format: PropTypes.string
}