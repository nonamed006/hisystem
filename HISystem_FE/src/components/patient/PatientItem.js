/*eslint-disable*/

import React from 'react';

const PatientItem = ({row_no, no, name, del}) => {
    return (
            <tr>
                      {/* no */}
                      <td>{row_no}////pk:{no}</td>

                      {/* 이름 */}
                      <th scope="row">
                        <span className="mb-0 text-sm">
                          {name}
                        </span>
                      </th>

                      {/* 나이 */}
                      <td>10</td>

                      {/* 성별 */}
                      <td>남</td>

                      {/* 전화번호 */}
                      <td>010</td>

                      {/* 주민번호 */}
                      <td>90</td>

                      {/* 보험여부 */}
                      <td>ok</td>

                      {/* 최근방문일자 */}
                      <td>1</td>

                      {/* 삭제버튼 */}
                      {/* <td><DeleteWarning id={res.no} getPatientList={()=>getPatientList(nowPage)}></DeleteWarning></td> */}
                      <td><button onClick={()=>{ del(no); }}></button></td>

                    </tr>
    );
};

export default PatientItem;