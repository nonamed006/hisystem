import React from 'react';

const AcceptanceTable = () => {
  return (
    <>
      <Container className="mt--7" fluid>
        <Row>
          <div className="col">
            <Card className="shadow">
              {/* ######### Table Header Strat ########## */}
              {/* ######### Table Header Strat ########## */}
              <CardHeader className="border-0">
                <Row>
                  {/* ##### ##### Table 상단 좌측(6) ##### ##### */}
                  {/* ##### ##### Table 상단 좌측(6) ##### ##### */}
                  <Col xl='5'>
                    <Row> {/* 테이블 좌측 상단 접수상태 탭 */}
                      <Col xl='7'>
                        <Badge color="info" href="#pablo" onClick={e => {
                          e.preventDefault(); setLeftTableSatus("진료대기");
                          getPatientList(nowPage, search, '진료대기'); setTableIndex(1);
                          // setDiagnosis([]); setPatient([]);
                        }}>
                          접수 현황
                        </Badge> &nbsp;
                        <Badge color="info" href="#pablo" onClick={e => {
                          e.preventDefault(); setLeftTableSatus("진료중");
                          getPatientList(nowPage, search, '진료중'); setTableIndex(1);
                          //setDiagnosis([]); setPatient([]);
                        }}>
                          진료중
                        </Badge> &nbsp;
                        <Badge color="info" href="#pablo" onClick={e => {
                          e.preventDefault(); setLeftTableSatus("진료완료");
                          getPatientList(nowPage, search, '진료완료'); setTableIndex(1);
                          //setDiagnosis([]); setPatient([]);
                        }}>
                          진료 완료
                        </Badge>
                      </Col> {/* 테이블 좌측 상단 검색창 */}
                      <InputBox
                        placeholder="Search"
                        type="text"
                        value={search}
                        onChange={inputSearch}
                        onKeyUp={(e) => enterkey(e)}
                      />
                    </Row>
                  </Col>
                  {/* ##### ##### Table 상단 우측(6) ##### ##### */}
                  {/* ##### ##### Table 상단 우측(6) ##### ##### */}
                  <Col xl='7'>
                    <Row> {/* 테이블 좌측 상단 접수상태 탭 */}
                      <Col xl='11'>
                        <Badge color="info" href="#pablo" onClick={e => { e.preventDefault(); setRightTableSatus("진료"); }}>
                          진료
                        </Badge> &nbsp;
                        <Badge color="info" href="#pablo" onClick={e => { e.preventDefault(); setRightTableSatus("진료기록"); }}>
                          진료기록
                        </Badge>
                      </Col>
                      <Col xl='1'>
                        <Button 
                          onClick={insertDiagnosis}
                          color="primary" size="sm" type="button">
                            등록
                        </Button>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </CardHeader>


              {/* ######### Table Start ########## */}
              {/* ######### Table Start ########## */}
              <Row>
                {/* ######### Table 좌측 Body ########## */}
                {/* ######### Table 좌측 Body ########## */}
                <Col xl='5'>
                  <Table className="align-items-center table-flush" responsive>
                    <thead className="thead-light">
                      <tr> {/* 젤 위에 정의된 테이블 헤더로 tr 생성 */}
                        {tableTitle.map(tableName => <th scope="col">{tableName}</th>)}
                        <th scope="col" />
                      </tr>
                    </thead>
                    <tbody> {/* 테이블 body */}
                      {patients.map(function (res) {
                        return <TrStyle isSelected={res.row_no == tableIndex} onClick={() => {
                          getBeforeDiagnosisList(res.patient_no);
                          getPatient(res.patient_no);
                          setTableIndex(res.row_no);
                        }}>
                          <td>{res.row_no}</td> {/* no */}
                          <th scope="row"> <span className="mb-0 text-sm"> {res.name} </span>  </th> {/* 환자이름 */}
                          <td>{ssnToAge(res.ssn)}</td> {/* 나이 */}
                          <td>{res.gender}</td> {/* 성별 */}
                          <td>{res.remark}</td> {/* 증상 */}
                          <td>
                            {
                              leftTableSatus == '진료대기' ?
                                <Badge color="" className="badge-dot mr-4">
                                  {res.rev_yn == 'Y' ? <i className="bg-yellow" /> : <i className="bg-info" />}
                                  {res.rev_yn == 'Y' ? '예약-방문대기중' : '대기중'}
                                </Badge>
                                :
                                leftTableSatus == '진료중' ?
                                  <Badge color="" className="badge-dot mr-4">
                                    <i className="bg-success" /> 진료중
                                  </Badge>
                                  :
                                  <Badge color="" className="badge-dot mr-4">
                                    <i className="bg-danger" /> 진료완료
                                  </Badge>
                            }
                          </td> {/* 상태 */}
                          <td />
                        </TrStyle>
                      })}
                    </tbody>
                  </Table>
                </Col>
                {/* ######### Table 우측 Body ########## */}
                {/* ######### Table 우측 Body ########## */}
                <Col xl='7'>
                  {
                    rightTableSatus == '진료' ?
                      <DivStyle>
                        <Row>
                          <Col xl='11'>
                            <Input
                              id="exampleFormControlTextarea1"
                              placeholder="Please enter your doctor's opinion ..."
                              rows="3"
                              type="textarea"
                              value={doctorRemark}
                              onChange={(e) => onChangeDoctorRemark(e)}
                            />
                          </Col>
                          <Col xl='1'></Col>
                        </Row>
                        <br />
                        <Row>
                          <Col md="3">
                            {!diseases.enter ?
                              <FormGroup>
                                <InputGroup className="mb-4">
                                  <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                      <i className="ni ni-zoom-split-in" />
                                    </InputGroupText>
                                  </InputGroupAddon>
                                  <Input
                                    placeholder="질병을 입력하세요"
                                    type="text"
                                    value={diseases.value}
                                    onChange={inputDiseases}
                                    onKeyUp={(e) => enterDiseases(e)}
                                  />
                                </InputGroup>
                              </FormGroup>
                              : diseases.success ?
                                <FormGroup className="has-success">
                                  <Input
                                    className="is-valid"
                                    //placeholder="Success"
                                    type="text"
                                    value={diseases.value}
                                    onChange={inputDiseases}
                                    onKeyUp={(e) => enterDiseases(e)}
                                  />
                                </FormGroup>
                                :
                                <FormGroup className="has-danger">
                                  <Input
                                    className="is-invalid"
                                    //placeholder="Not Exist"
                                    type="email"
                                    value={diseases.value}
                                    onChange={inputDiseases}
                                    onKeyUp={(e) => enterDiseases(e)}
                                  />
                                </FormGroup>
                            }
                          </Col>
                          {/* <Col md="8"></Col> */}
                          <Col md="3">
                            {!medicine.enter ?
                              <FormGroup>
                                <InputGroup className="mb-4">
                                  <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                      <i className="ni ni-zoom-split-in" />
                                    </InputGroupText>
                                  </InputGroupAddon>
                                  <Input
                                    placeholder="약을 입력하세요"
                                    type="text"
                                    value={medicine.value}
                                    onChange={inputMedicine}
                                    onKeyUp={(e) => enterMedicine(e)}
                                  />
                                </InputGroup>
                              </FormGroup>
                              : medicine.success ?
                                <FormGroup className="has-success">
                                  <Input
                                    className="is-valid"
                                    //placeholder="Success"
                                    type="text"
                                    value={medicine.value}
                                    onChange={inputMedicine}
                                    onKeyUp={(e) => enterMedicine(e)}
                                  />
                                </FormGroup>
                                :
                                <FormGroup className="has-danger">
                                  <Input
                                    className="is-invalid"
                                    //placeholder="Not Exist"
                                    type="email"
                                    value={medicine.value}
                                    onChange={inputMedicine}
                                    onKeyUp={(e) => enterMedicine(e)}
                                  />
                                </FormGroup>
                            }
                          </Col>
                          {/* <Col md="8"></Col> */}
                          <Col md="5">
                            {!prescription.enter ?
                              <FormGroup>
                                <InputGroup className="mb-4">
                                  <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                      <i className="ni ni-zoom-split-in" />
                                    </InputGroupText>
                                  </InputGroupAddon>
                                  <Input
                                    placeholder="처방을 입력하세요"
                                    type="text"
                                    value={prescription.value}
                                    onChange={inputPrescription}
                                    onKeyUp={(e) => enterPrescription(e)}
                                  />
                                </InputGroup>
                              </FormGroup>
                              : prescription.success ?
                                <FormGroup className="has-success">
                                  <Input
                                    className="is-valid"
                                    //placeholder="Success"
                                    type="text"
                                    value={prescription.value}
                                    onChange={inputPrescription}
                                    onKeyUp={(e) => enterPrescription(e)}
                                  />
                                </FormGroup>
                                :
                                <FormGroup className="has-danger">
                                  <Input
                                    className="is-invalid"
                                    //placeholder="Not Exist"
                                    type="email"
                                    value={prescription.value}
                                    onChange={inputPrescription}
                                    onKeyUp={(e) => enterPrescription(e)}
                                  />
                                </FormGroup>
                            }
                          </Col>
                          <Col md="1"></Col>
                          {/* <Col md="8"></Col> */}
                        </Row>
                        <Row>
                          <Col xl='11'>
                            <Table className="align-items-center table-flush" responsive>
                              <thead className="thead-light">
                                <tr> {/* 젤 위에 정의된 테이블 헤더로 tr 생성 */}
                                  {tableTitle4.map(tableName => <th scope="col">{tableName}</th>)}
                                  <th scope="col" />
                                </tr>
                              </thead>
                              <tbody> {/* 테이블 body */}
                                <tr>
                                  <td>{patient.ssn}</td> {/* 주민번호 */}
                                  <td>{patient.addr}</td> {/* 주소 */}
                                </tr>
                              </tbody>
                            </Table>
                          </Col>
                          <Col xl='1'></Col>
                        </Row>

                      </DivStyle>
                      :
                      <DivStyle> {/* 환자 진료기록 div */}
                        <Table className="align-items-center table-flush" responsive>
                          <thead className="thead-light">
                            <tr> {/* 젤 위에 정의된 테이블 헤더로 tr 생성 */}
                              {tableTitle3.map(tableName => <th scope="col">{tableName}</th>)}
                              <th scope="col" />
                            </tr>
                          </thead>
                          <tbody> {/* 테이블 body */}
                            <tr>
                              <td>{patient.ssn}</td> {/* 주민번호 */}
                              <td>{patient.addr}</td> {/* 주소 */}
                              <td>{patient.phone}</td> {/* 폰 */}
                              <td> {/* 보험여부 */}
                                <Badge color="" className="badge-dot mr-4">
                                  {patient.insurance_yn == '가입' ? <i className="bg-success" /> : <i className="bg-danger" />}
                                  {patient.insurance_yn}
                                </Badge>
                              </td>
                              <td>{patient.memo}</td> {/* 메모 */}
                            </tr>
                            <tr><td /><td /><td /><td /><td /><td /></tr>
                          </tbody>
                        </Table>
                        <Table className="align-items-center table-flush" responsive>
                          <thead className="thead-light">
                            <tr> {/* 젤 위에 정의된 테이블 헤더로 tr 생성 */}
                              {tableTitle2.map(tableName => <th scope="col">{tableName}</th>)}
                              <th scope="col" />
                            </tr>
                          </thead>
                          <tbody> {/* 테이블 body */}
                            {diagnosis.map(function (res) {
                              return <tr>
                                <td>{res.dia_date.substring(0, 16)}</td> {/* '방문일' */}
                                <td>{res.dia_remark}</td> {/* '소견' */}
                                <td>{res.dis_name}</td> {/* '증상' */}
                                <td>{res.med_name}</td> {/* '처방약' */}
                                <td>{res.pre_desc}</td> {/* '처치' */}
                                <td>{res.pre_detail}</td> {/* '처지상세' */}
                              </tr>
                            })}
                          </tbody>
                        </Table>
                      </DivStyle>
                  }
                </Col>
              </Row>
              {/* ######### Table End ########## */}
              {/* ######### Table End ########## */}
              {/* ######### 페이징 ########## */}
              <CardFooter className="py-4">
                <Col xl='5'>
                  <nav aria-label="...">
                    <Pagination
                      className="pagination justify-content-end mb-0"
                      listClassName="justify-content-end mb-0"
                    >
                      <PaginationItem>
                        <PaginationLink
                          onClick={(e) => {
                            e.preventDefault();
                            if (pageInfo[1]) {
                              setNowPage(page[0] - 5);
                              getPatientList(page[0] - 5, search, leftTableSatus);
                            }
                          }}
                        >
                          <i className="fas fa-angle-left" />
                          <span className="sr-only">Previous</span>
                        </PaginationLink>
                      </PaginationItem>
                      {page.map((num) => {
                        return <PaginationItem className={nowPage == num ? "active" : ""}>
                          <PaginationLink
                            href="#pablo"
                            onClick={(e) => {
                              e.preventDefault();
                              if (num <= pageInfo[0]) {
                                setNowPage(num);
                                getPatientList(num, search, leftTableSatus);
                              }
                            }}>
                            {num}
                          </PaginationLink>
                        </PaginationItem>
                      })}
                      <PaginationItem>
                        <PaginationLink
                          href="#pablo"
                          onClick={(e) => {
                            e.preventDefault();
                            if (pageInfo[2]) {
                              setNowPage(page[4] + 1);
                              getPatientList(page[4] + 1, search, leftTableSatus);
                            }
                          }}
                        >
                          <i className="fas fa-angle-right" />
                          <span className="sr-only">Next</span>
                        </PaginationLink>
                      </PaginationItem>
                    </Pagination>
                  </nav>
                </Col>
              </CardFooter>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default AcceptanceTable;