import DutyCal from 'components/employee/DutyCal';
import MainHeader from 'components/Headers/MainHeader';
import React from 'react';
import { Col, Row } from 'reactstrap';

const Duty = () => {
	return (
		<div>
			<MainHeader />
			<Row>
				<Col xs='1' />
				<Col xs='10'>
					<DutyCal />
				</Col>
				<Col xs='1' />
			</Row>

		</div>
	);
};

export default Duty;