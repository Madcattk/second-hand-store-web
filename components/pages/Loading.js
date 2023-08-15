import React from 'react'

const Loading = ({ loading, children }) => {
    
    return (
        <React.Fragment>
            {!loading ?
                <React.Fragment>{children}</React.Fragment>
            :
                <div className="absolute right-1/2 bottom-2/3 transform translate-x-1/2 translate-y-1/2 ">
                    <div className="border-t-transparent border-solid animate-spin rounded-full border-black border-8 h-64 w-64"></div>
                </div>
            }
        </React.Fragment>
    )
}

export default Loading