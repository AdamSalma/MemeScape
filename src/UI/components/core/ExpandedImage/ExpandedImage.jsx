import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import { Image } from '~/components';
import './ExpandedImage.styles';


const ExpandedImage = ({ className, srcThumbnail, srcExpanded, ...restProps }) => {

    const thumbnailStyles = {
        backgroundImage: `url(${srcThumbnail})`
    }

    // Else is loading fullsize image
    return (
        <div className={cx('ExpandedImage', className)} {...restProps}>
            <div className="ExpandedImage__blurred-thumbnail" style={thumbnailStyles}/>
            <Image className="ExpandedImage__expanded" src={srcExpanded}/>
        </div>
    );
};

ExpandedImage.displayName = 'ExpandedImage';

ExpandedImage.propTypes = {
    className: PropTypes.string,
};

export default ExpandedImage;
