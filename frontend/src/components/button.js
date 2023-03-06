import React from 'react';
import './button.css';

export default class Button extends React.Component {
    render() {
        const { text, style, onClick } = this.props;

        return (
            <p className='button' onClick={onClick} style={style}>
                {text}
            </p>)
    }
}