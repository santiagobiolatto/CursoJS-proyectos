import React from 'react';

const Header = (props) =>{
    return(
        <div className="text-center mt-4">
            <h1>{props.titulo}</h1>
        </div>
    )
}

export default Header;