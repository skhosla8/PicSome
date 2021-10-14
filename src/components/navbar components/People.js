import React, { useContext, useEffect } from 'react';
import { Context } from '../../contexts/Context';

function People() {
    const { setAllPhotos, photoElements } = useContext(Context);

    useEffect(() => {
        fetch('peopleData.json')
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

export default People;