import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Input, Row, Modal } from 'reactstrap';
import { useTheme } from 'styled-components';

import DaumPostcode from "react-daum-postcode";
import addrApiModal from "assets/css/addrApiModal.css";


const Qrpage = () => {
	const [userDoctorList, setUserDoctorList] = useState([]);
	const [user, setUser] = useState({
		name: "",
		ssn1: "",
		ssn2: "",
		phone1: "",
		phone2: "",
		phone3: "",
		addr: "",
		gender: "",
		insurance_yn: "Y",
		doctor_no: "",
		remark: ""
	});

  useEffect(() => {
    (() => {
			fetch(`http://localhost:8081/receipt/findDoctor`, {
				method: "get",
			}).then((res) => res.json())
				.then((res) => {
					setUserDoctorList(res);
				});
		})();
  }, []);

	const add = () => {
		let data = {
			name: user.name,
			ssn: user.ssn1 + '-' + user.ssn2,
			phone: user.phone1 + '-' + user.phone2 + '-' + user.phone3,
			addr: user.addr,
			gender: user.gender,
			insurance_yn: user.insurance_yn,
			doctor_no: user.doctor_no,
			remark: user.remark
		}
		debugger;
		fetch("http://localhost:8081/untact", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        'Content-Type': "application/json; charset=utf-8",
      }
    }).then(res => res.text())
		.then(res => {
			alert(res);
    });
	}


 /**
     * 주소 api
     */
  const [isAddress, setIsAddress] = useState("");
  const [isZoneCode, setIsZoneCode] = useState();
  const [isDetailAddress, setIsDetailAddress] = useState("");
  const [isPostOpen, setIsPostOpen] = useState();
  const [postModal, setPostModal] = useState({ isOpen: false });


  const handleComplete = (data) => {
	  setPostModal({isOpen: false});

	  console.log(data)
	  let fullAddress = data.address;
	  let extraAddress = "";

	  if (data.addressType === "R") {
		  if (data.bname !== "") {
			  extraAddress += data.bname;
		  }
		  if (data.buildingName !== "") {
			  extraAddress +=
				  extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
		  }
		  fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
	  }
	  setIsZoneCode(data.zonecode);
	  setIsAddress(fullAddress);
	  setIsPostOpen(false);
	  


	  
  };

  const postCodeStyle = {
	  display: "block",
	  position: "absolute",
	  // top: "",
	  width: "400px",
	  height: "500px",
	  padding: "7px",
  };
/**
 * 주소 입력 및 합치기
 */
 const onChangeInputAddr = (e) =>{
    setIsDetailAddress(e.target.value)
    setUser( Object.assign({}, user, { addr: isZoneCode + " " + isAddress + e.target.value}))
    
}

	return (
		<Container>
			<Row>
				<Col xl='12' xm='12' xs='12'>비대면 접수<br /><br /><br /></Col>

				<Col xl='6' xm='6' xs='6'>
					<Input
						placeholder="이름"
						type="name"
						value={user.name}
						onChange={(e) => {
							setUser({
								...user, name: e.target.value
							})
						}}
					/>
				</Col>
				<Col xl='6' xm='6' xs='6'></Col>
				<Col xl='12' xm='12' xs='12'><br /></Col>
				<Col xl='6' xm='6' xs='6'>
					<Input
						placeholder="주민번호"
						type="text"
						value={user.ssn1}
						maxLength={6}
						onChange={(e) => {
							setUser({
								...user, ssn1: e.target.value
							})
						}}
					/>
				</Col>
				<Col xl='6' xm='6' xs='6'>
					<Input
						placeholder="주민번호"
						type="text"
						value={user.ssn2}
						maxLength={7}
						onChange={(e) => {
							setUser({
								...user, ssn2: e.target.value
							})
						}}
					/>
				</Col>
				<Col xl='12' xm='12' xs='12'><br /></Col>

				<Col xl='4' xm='4' xs='4'>
					<Input
						placeholder="전화번호"
						type="text"
						value={user.phone1}
						maxLength={3}
						onChange={(e) => {
							setUser({
								...user, phone1: e.target.value
							})
						}}
					/>
				</Col>
				<Col xl='4' xm='4' xs='4'>
					<Input
						placeholder="전화번호"
						type="text"
						value={user.phone2}
						maxLength={4}
						onChange={(e) => {
							setUser({
								...user, phone2: e.target.value
							})
						}}
					/>
				</Col>
				<Col xl='4' xm='4' xs='4'>
					<Input
						placeholder="전화번호"
						type="text"
						value={user.phone3}
						maxLength={4}
						onChange={(e) => {
							setUser({
								...user, phone3: e.target.value
							})
						}}
					/>
				</Col>
				<Col xl='12' xm='12' xs='12'><br /></Col>

				<Col xl='6' xm='6' xs='6'>
					<select className="custom-select d-block w-100" id="root"
						select key={user.gender}
						default value={user.gender}
						onChange={(e) => {
							setUser({
								...user, gender: e.target.value
							})
						}}					>
						<option value='0'>성별을 선택해주세요</option>
						<option value='M'>남자</option>
						<option value='F'>여자</option>
					</select>
				</Col>

				<Col xl='6' xm='6' xs='6'>
					<select className="custom-select d-block w-100" id="root"
						select key={user.insurance_yn}
						default value={user.insurance_yn}
						onChange={(e) => {
							setUser({
								...user, insurance_yn: e.target.value
							})
						}}					>
						<option value='Y'>보험가입</option>
						<option value='N'>보험미가입</option>
					</select>
				</Col>

				<Col xl='12' xm='12' xs='12'><br /></Col>
				<Col xl='3' xm='6' xs='6'>
					<Input
						placeholder="우편번호"
						type="text"
						value={isZoneCode}
					/>
				</Col>
				<Col xl='3' xm='6' xs='6'>
					<Button
						color="success"
						type="button"
						onClick={() => setPostModal({ isOpen: true })}					
						>
						우편번호
					</Button>
				</Col>
				<Col xl='12' xm='12' xs='12'><br /></Col>

				<Col xl='12' xm='12' xs='12'>
					<Input
						placeholder="주소"
						type="text"
						value={isAddress}
						onClick={() => setPostModal({ isOpen: true })}
					/>
				</Col>
				<Col xl='12' xm='12' xs='12'><br /></Col>

				<Col xl='12' xm='12' xs='12'>
					<Input
						placeholder="상세주소"
						type="text"
						value={isDetailAddress}
						onChange={onChangeInputAddr}
						// value={user.addr}
						// onChange={(e) => {
						// 	setUser({
						// 		...user, addr: e.target.value
						// 	})
						// }}

					/>
				</Col>
				<Col xl='12' xm='12' xs='12'><br /></Col>

				<Col xl='6' xm='6' xs='6'>
					<select className="custom-select d-block w-100"
						onChange={(e) => {
							setUser({
								...user, doctor_no: e.target.value
							})
						}}
					>
						<option value='0'>의사를 선택하세요</option>
						{userDoctorList.map(function (res) {
							return <option value={res.no}>{res.name}</option>
						})}
					</select>
				</Col>
				<Col xl='6' xm='6' xs='6'></Col>
				<Col xl='12' xm='12' xs='12'><br /></Col>

				<Col xl='12' xm='12' xs='12'>					
				<Input
					id="exampleFormControlTextarea1"
					placeholder="증상을 입력하세요"
					rows="3"
					type="textarea"
					value={user.remark}
					onChange={(e) => {
						setUser({
							...user, remark: e.target.value
						})
					}}
				/>
				</Col>		
				<Col xl='12' xm='12' xs='12'><br /></Col>

				<Col>
					<Button
						color="success"
						type="button"
						onClick={add}
					>
						등록
					</Button>
				</Col>
			</Row>

			<Modal
          className="modal-dialog-centered"
          size="m"
          isOpen={postModal.isOpen}
          
          toggle={() => setPostModal({isOpen : false})}
        >

          <div className="addr-api-modal-header">
          <DaumPostcode style={postCodeStyle} onComplete={handleComplete}   />

            <h5 className="modal-title" id="exampleModalLabel">
            <br/><br/>
            </h5>
            <button
              aria-label="Close" 
              className="close"
              data-dismiss="modal"
              type="button"
              style = {addrApiModal}
              onClick={() => setPostModal({isOpen : false})}
            >
              <span aria-hidden={true}>×</span>
            </button>
            <br/>
          </div>
        </Modal>


		</Container>
	);
};

export default Qrpage;