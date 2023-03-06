import React from 'react';
import Button from './button';
import { map, split } from 'lodash';
import './movie.css';

/**
 * Data reçu :
 *  movie, // Titre
    yearOfRelease,
    duration // en minutes,
    actors,
    poster, // lien vers une image d'affiche,
    boxOffice, // en USD$,
    rottenTomatoesScore
 */

export default class Movie extends React.Component {
    renderInfo(label, info) {
        return (<div className='infoLine'>
            <div className='infoLabel'>{label}</div>
            <div className='info'>{info}</div>
        </div>);
    }

    renderInfos(label, infos) {
        return (<div className='infoLine'>
            <div className='infoLabel'>{label}</div>
            <div>{map(infos, info => <div className='info' key ={`infoList-${info}`}>{info}</div>)}</div>
        </div>);
    }

    render() {
        const { infos, deleteMovie } = this.props;
        const { id, movie, yearOfRelease, duration, actors, poster, boxOffice, rottenTomatoesScore } = infos;
        const actorsList = split(actors, ',')

        return (
            <div className='movie'>
                <img src={poster} alt={`${movie}-poster`}/>
                <div className='infos'>
                    {this.renderInfo('Title', movie)}
                    {this.renderInfo('Date of release', yearOfRelease)}
                    {this.renderInfo('Duration', duration)}
                    {this.renderInfos('Actors', actorsList)}
                    {this.renderInfo('Box office', boxOffice)}
                    {this.renderInfo('Score', rottenTomatoesScore)}
                </div>
                <Button text={'Delete movie'} onClick={() => deleteMovie(id)} />
            </div>)
    }
}