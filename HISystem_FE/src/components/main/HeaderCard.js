import React from 'react';
import { Card, CardBody, CardTitle, Col, Row } from 'reactstrap';
import styled from 'styled-components';

const HeaderCard = (props) => {
	const { title, value, value2, msg, color, point } = props;
	const D = styled.div`
		background-color: #fff9db;
		border-radius: 5px;
	`;

	return (
		<Card className="card-stats mb-4 mb-xl-0">
			{point == 'Y' ?
				<D>
					<CardBody>
						<Row>
							<div className="col">
								<CardTitle
									tag="h5"
									className="text-uppercase text-muted mb-0"
								>
									{title}
								</CardTitle>
								<span className="h2 font-weight-bold mb-0">
									{value}
								</span>
							</div>
							<Col className="col-auto">
								<div className={color}>
									<i className={"ni ni-check-bold"} />
								</div>
							</Col>
						</Row>
						<p className="mt-3 mb-0 text-muted text-sm">
							<span className="text-success mr-2">
								{value2}
							</span>{" "}
							<span className="text-nowrap">{msg}</span>
						</p>
					</CardBody>
				</D>
				: point == 'C' ?
					<CardBody>
						<Row>
							<div className="col">
								<CardTitle
									tag="h5"
									className="text-uppercase text-muted mb-0"
								>
									{title}
								</CardTitle>
								<span className="h2 font-weight-bold mb-0">
									{value}
								</span>
							</div>
							<Col className="col-auto">
								<div className={color}>
									<i className={"ni ni-time-alarm"} />
								</div>
							</Col>
						</Row>
						<p className="mt-3 mb-0 text-muted text-sm">
							<span className="text-success mr-2">
								{value2}
							</span>{" "}
							<span className="text-nowrap">{msg}</span>
						</p>
					</CardBody>
					:
					<CardBody>
						<Row>
							<div className="col">
								<CardTitle
									tag="h5"
									className="text-uppercase text-muted mb-0"
								>
									{title}
								</CardTitle>
								<span className="h2 font-weight-bold mb-0">
									{value}
								</span>
							</div>
							<Col className="col-auto">
								<div className={color}>
								</div>
							</Col>
						</Row>
						<p className="mt-3 mb-0 text-muted text-sm">
							<span className="text-success mr-2">
								{value2}
							</span>{" "}
							<span className="text-nowrap">{msg}</span>
						</p>
					</CardBody>
			}
		</Card>
	);
};

export default HeaderCard;