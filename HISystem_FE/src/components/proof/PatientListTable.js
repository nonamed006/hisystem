import React from 'react';
import DeleteWarning from 'components/modal/public/DeleteWarning';
import 'assets/css/listSelectColor.css';

import {
    Table
} from "reactstrap";

  
  // 주민번호 -> 만나이 변환
  var ssnToAge = (ssn) => new Date().getFullYear() - (ssn.substring(7, 8) < 3 ? 19 + ssn.substring(0, 2) : 20 + ssn.substring(0, 2));
  

const PatientListTable = ({patients,setPatient,onClickTd,reload,setReload,user}) => {
    const tableTitle = ['No', '이름', '나이', '성별', '전화번호','주민번호']; // 빈 건 우측 드롭다운


    return (
        <Table className="align-items-center table-flush" responsive>
        <thead className="thead-light">
          {/* 테이블 헤더 이름 */}
          <tr>
            {tableTitle.map(tableName => <th scope="col">{tableName}</th>)}
            <th scope="col" />
          </tr>
        </thead>
        <tbody >
          {patients.list && patients.list.map((patient) => {
   
            return (
              <tr >
                {/* 행번호 */}
                <td onClick={(e) => { onClickTd(patient,e) }}>{patient.row_no}</td>
                {/* 제목 */}
                <th onClick={(e) => { onClickTd(patient,e) }}>
                  <span className="mb-0 text-sm">{patient.name}  </span>
                </th>
                {/* 작성자 */}
                <td onClick={(e) => { onClickTd(patient,e) }}>{ssnToAge(patient.ssn)}</td>
                {/* 조회수 */}
                <td onClick={(e) => { onClickTd(patient,e) }}>{patient.gender}</td>
                {/* 작성일 */}
                <td onClick={(e) => { onClickTd(patient,e) }}>{patient.phone}</td>
                
                <td onClick={(e) => { onClickTd(patient,e) }}>{patient.ssn}</td>
                
                <td></td>

              </tr>
            )
          })}

        </tbody>

      </Table>
    );
};

export default PatientListTable;