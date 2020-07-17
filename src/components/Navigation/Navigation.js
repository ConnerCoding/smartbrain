import React from 'react';

// If user is signed in set route to signed in and display sign out, otherwise display sign in/register
const Navigation = ({onChangeRoute, isSignedIn}) => {
    if (isSignedIn) {
    return (
        <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
            <p onClick={() => onChangeRoute('signin')} className='f3 link dim black underline pa3 pointer'>Sign Out</p>
        </nav>
    );
    } else {
        return (
            <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
                <p onClick={() => onChangeRoute('signin')} className='f3 link dim black underline pa3 pointer'>Sign In</p>
                <p onClick={() => onChangeRoute('register')} className='f3 link dim black underline pa3 pointer'>Register</p>
            </nav>
        );
    }
}

export default Navigation;