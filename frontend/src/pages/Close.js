import React from "react"
import background from "../images/index.jpg"

function Close() {
    return (
        <div style={{ 
            backgroundImage: `url(${background})`,
            height:'100vh',
            fontSize:'50px',
            backgroundSize: 'fill',
            backgroundRepeat: 'no-repeat',
            objectFit: 'fill',
            }}>            
            </div>
            )
    }
export default Close