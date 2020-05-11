import React from 'react';
import ExtendedCard from './extended-card';

export default function CardList(props) {
    return (
        <div>
            {props.items.map((item) => <ExtendedCard simple={props.simple} title={item.title || item.username} datePublished={item.dateTimeRegistered} imageUrl={item.imageURL}
            briefDescription={item.briefDescription} fullDescription={item.fullDescription} onDelete={() => props.onDelete(item)} onEdit={() => props.onEdit(item)}/>)}
        </div>
    );
}