import React, { useContext, useEffect } from 'react';
import { Context } from '../../contexts/Context';

function Featured() {
    const { setAllPhotos, photoElements } = useContext(Context);

    useEffect(() => {
        fetch('featuredData.json')
            .then(response => response.json())
            .then(data => setAllPhotos(data))
            .catch(error => console.log(error));
    }, [setAllPhotos]);

    return (
        <div data-test="component-featured" className="photos">
            {photoElements}
        </div>
    )
}

export default Featured;