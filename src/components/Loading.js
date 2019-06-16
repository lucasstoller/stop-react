import React from 'react' 
 
import Spinner from 'react-spinkit' 

const overlayContent = {
  display: 'flex',
  width: '100%',
  left: '0',
  top: '0',
  alignItems: 'center',
  height: '100%',
  justifyContent: 'center',
  position: 'fixed',
  zIndex: '999999',
  flexDirection: 'column'
}

const overlayContentWrapper = {
  display: 'inherit',
  width: '100%',
  height: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column'
}

const overlayContentWrapperMessage = {
  marginTop: '20px',
  color: 'white',
  fontWeight: 'bold',
  textShadow: '0 2px 5px black'
}

const skSpinner = {
  color: 'white',
  zIndex: '-1'
}

const Loading = ({ message, background }) => { 
    const style = { background, ...overlayContent }
    return ( 
        <div style={style}> 
            <div style={overlayContentWrapper}> 
                <Spinner style={skSpinner}
                    name="line-scale" 
                    fadeIn='none' 
                    color='orange' 
                /> 
                <span style={overlayContentWrapperMessage}> 
                    {message} 
                </span> 
            </div> 
        </div> 
    ) 
} 
 
export default Loading