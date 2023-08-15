import React from 'react'

const Loading = ({ loading, children }) => {
    
    return (
        <React.Fragment>
            {!loading ?
                <React.Fragment>{children}</React.Fragment>
            :
                <></>
            }
        </React.Fragment>
    )
}

export default Loading