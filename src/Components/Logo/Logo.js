import React from 'react'
import Tilt from 'react-parallax-tilt';
import './Logo.css'
import brain from './brain.png'

const Logo = () => {
	return(
		<Tilt >
			<div className =' br4 shadow2' style={{ height: '300px', }}>
	      		<img style={{paddingTop:'5px'}} src={brain} alt='lgoo'/>
		  	</div>
	    </Tilt>
	)
}




export default Logo;