import React from 'react'
import { Card } from 'react-bootstrap'

import { getTimeDifference } from '../../utils/getTime'

const CardCompontent = ({ product: { size, price, face, date } }) => (
	<Card
		className='text-center'
		style={{ marginTop: '15px', marginBottom: '15px' }}
	>
		<Card.Header>
			<Card.Text style={{ fontSize: size }}>{face}</Card.Text>
		</Card.Header>
		<Card.Body>
			<Card.Text>${price}</Card.Text>
		</Card.Body>
		<Card.Footer>
			<Card.Text>{getTimeDifference(date)}</Card.Text>
		</Card.Footer>
	</Card>
)

export default CardCompontent
