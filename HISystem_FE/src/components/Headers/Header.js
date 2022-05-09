// reactstrap components
import HeaderCard from "components/main/HeaderCard";
import { useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import Clock from 'react-live-clock';
const Header = () => {
  const [todayDuty, setTodayDuty] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8081/admin/today", {
      method: "get",
      headers: {
        'Authorization': localStorage.getItem("Authorization")
      }
    }).then((res) => res.json())
      .then((res) => {
        setTodayDuty(res);
      });
  }, []);

function hanlerPoint(part) {
    let resultPoint
    let today = new Date();   

    let hour = today.getHours();                    // 시
    let minute = today.getMinutes();                // 분    return 'Y'
    console.log(hour)
    console.log(minute)

    if(0 <= hour && hour < 8){                      //00:00 ~ 07:00   NIGHT
      console.log('NIGHT')
      if(part=== 'DAY'){resultPoint = 'N'}
      if(part=== 'EVENING'){resultPoint = 'N'}
      if(part=== 'NIGHT'){resultPoint = 'Y'}
    }

    if(6<hour && hour < 8 && minute < 31){          //07:00 ~ 07:30   NIGHT,DAY 겹치는시간
      console.log('NIGHT')
      console.log('DAY')                        
      if(part=== 'DAY'){resultPoint = 'Y'}
      if(part=== 'EVENING'){resultPoint = 'N'}
      if(part=== 'NIGHT'){resultPoint = 'Y'}
    }
    if( 6 < hour &&  hour < 16  ){                  //07:00 ~ 15:00   DAY
      console.log('DAY')                        
      if(part=== 'DAY'){resultPoint = 'Y'}
      if(part=== 'EVENING'){resultPoint = 'N'}
      if(part=== 'NIGHT'){resultPoint = 'N'}
    }
    if(14 < hour && hour < 16 && minute < 31){      //15:00 ~ 15:30   DAY,EVENING겹치는시간
      console.log('DAY')
      console.log('EVENING')
      if(part=== 'DAY'){resultPoint = 'Y'}
      if(part=== 'EVENING'){resultPoint = 'Y'}
      if(part=== 'NIGHT'){resultPoint = 'N'}
    }
    if(15<hour && hour <24){                        //16:00 ~ 23:00   EVENING
      console.log('EVENING')
      if(part=== 'DAY'){resultPoint = 'N'}
      if(part=== 'EVENING'){resultPoint = 'Y'}
      if(part=== 'NIGHT'){resultPoint = 'N'}
    }               

    if(22< hour && hour < 24 && minute <31 ){       //23:00 ~ 23:30   EVENING, NIGHT 겹치는시간
      console.log('EVENING')
      console.log('NIGHT')
      if(part=== 'DAY'){resultPoint = 'N'}
      if(part=== 'EVENING'){resultPoint = 'Y'}
      if(part=== 'NIGHT'){resultPoint = 'Y'}
    }
    if(22< hour && 29 < minute ){                   //23:30 ~ 24:00   NIGHT
      console.log('NIGHT')
      if(part=== 'DAY'){resultPoint = 'N'}
      if(part=== 'EVENING'){resultPoint = 'N'}
      if(part=== 'NIGHT'){resultPoint = 'Y'}
    }
        
    return resultPoint
  }

  return (
    <>
      <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
        <Container fluid>
          <div className="header-body">
            {/* Card stats */}
            <Row>
              <Col xl='8'>
                <Row>
                  <Col lg="4" xl="4">
                    <HeaderCard point={hanlerPoint('DAY')} title={'DAY'} value={todayDuty[0]?.name} value2={'1'} msg={'AM 7:00 ~ PM 3:30'} color={"icon icon-shape bg-yellow text-white rounded-circle shadow"}></HeaderCard>
                  </Col>
                  <Col lg="4" xl="4">
                    <HeaderCard point={hanlerPoint('EVENING')} title={'EVENING'} value={todayDuty[1]?.name} value2={'2'} msg={'PM 3:00 ~ PM 11:30'} color={"icon icon-shape bg-orange text-white rounded-circle shadow"}></HeaderCard>
                  </Col>
                  <Col lg="4" xl="4">
                    <HeaderCard point={hanlerPoint('NIGHT')} title={'NIGHT'} value={todayDuty[2]?.name} value2={'3'} msg={'PM 11:00 ~ AM 7:30'} color={"icon icon-shape bg-danger text-white rounded-circle shadow"}></HeaderCard>
                  </Col>
                </Row>
              </Col>
              <Col xl='4'>
                <HeaderCard point={'C'} title={'TIME'} value={<Clock format="YYYY년 MM월 DD일 HH:mm:ss" ticking={true} timezone="Asia/Seoul"/>} value2={''} msg={''} color={"icon icon-shape bg-success text-white rounded-circle shadow"}></HeaderCard>
                
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Header;
