//toda vez que tiver um componente tem que copiar essa parte
import React from 'react';

//children = componente que ta sendo exibido
export default function Header({ title }) {
    return (
        <header>
            <h1>{title}</h1>
        </header>
    );
}