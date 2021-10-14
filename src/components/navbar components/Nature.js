import React, { useContext, useEffect } from 'react';
import { Context } from '../../contexts/Context';

function Nature() {
    const { setAllPhotos, photoElements } = useContext(Context);

    useEffect(() => {
        fetch('natureData.json')
            .then(response => response.json())
            .then(data => setAllPhotos(data))
            .catch(error => console.log(error));
    }, [setAllPhotos]);

    return (
        <div className="photos">
            {photoElements}
        </div>
    )
}

export default Nature;