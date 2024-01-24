import React from 'react'

interface Props {}

function Footer() {
  return (
    <div
      style={{
        backgroundColor: 'black',
        bottom: '0px',
        position: 'absolute',
        width: '100%',
        color: '#fff',
        padding: '10px',
        textAlign: 'center',
        fontWeight: '400',
        fontSize: '18px',
      }}
    >
      <div>© Vyga Inc. 2023</div>
    </div>
  )
}

export default Footer
