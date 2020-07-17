import React from 'react';

// Using the name and entries from the users state, display name and entry count
const Rank = ({ name, entries }) => {
    return (
        <div>
            <div className='white f3'>
                {`${name}, your current entry count is ...`}
            </div>
            <div className='white f1'>
                {entries}
            </div>
        </div>
    );
}

export default Rank;