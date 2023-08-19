import React from 'react'
import { Alert } from 'react-bootstrap'

function Message({variant, children}) {
  return (
    (
        <Alert variant={variant}>
            {children}
        </Alert>
        // <>
        //   {[
        //     'dark',
        //   ].map((variant) => (
        //     <Alert key={variant} variant={variant}>
        //       This is a {variant} alert—check it out!
        //     </Alert>
        //   ))}
        // </>
    )
  )
}

export default Message