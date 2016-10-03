import React from 'react';
import classNames from 'classnames';

export default ({ isVisible, closeBackground }) => {
    const backgroundClasses = classNames({
        "background": true,
        "background-active": isVisible
    })
    return (
        <div
            className={backgroundClasses}
            onClick={() => {closeBackground()}
        }></div>
    )
}
