import React from 'react';

import { Loader as SUILoader } from 'semantic-ui-react';

function Loader(props) {
    return (
        <SUILoader active inline='centered' >{props.text}</SUILoader>
    )
}

export default Loader;