import React, { useState } from 'react';
// import "../../Charge/css/charge.css";
import "../css/history.css";
import Table from 'react-bootstrap/Table';
import Sidebar from "./Sidebar";
import '../css/sidebar.css';
import DatePicker from "react-datepicker";
import { ko } from 'date-fns/esm/locale';
import { useEffect } from 'react';
import axios from 'axios';


function History(props) {
    console.log("거래내역 페이지입니다.");
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const ExampleCustomInput = ({ value, onClick }) => (
        <button className="example-custom-input" onClick={onClick}>
        {value}
        </button>
    );
    const [moneyTransferHst, setMoneyTransferHst] = useState();

    // useEffect(() => {
    //     axios.get("http://localhost:8888/member/moneyTransferHst/"+membSn, 
    //     {
    //     }).then((res) => {
    //         // console.log('typeof(res) =>', typeof(res))
    //         // console.log('res =>', res)
    //         // console.log('typeof(res.data) =>', typeof(res.data))
    //         // console.log('res.data =>', res.data)
    //         setMercList(res.data);
    //         // setMerchantSn(res.data.merchantSn);
    //         // console.log('typeof mercList =>', typeof(mercList))
    //         // console.log('mercList =>', mercList)
    //     }).catch((error) => {
    //         console.log(error);
    //     })
    // }, []);
    useEffect(() => { 
        let membSn = sessionStorage.getItem("membSn");
        console.log('typeof(membSn) => ', typeof(membSn));
        axios.get("http://localhost:8888/member/moneyTransferHst/"+membSn, 
        {
        }).then((res) => {
            console.log('typeof(res) =>', typeof(res))
            console.log('res =>', res)
            console.log('typeof res.data => ', typeof(res.data));
            console.log('res.data => ', res.data);
            setMoneyTransferHst(res.data);
            // console.log('typeof res.data.moneyBlce => ', typeof(res.data.moneyBlce));
        }).catch((error) => {
            console.log(error);
        })
    }, []); 

        return (
            <div className="history_box">
            <div className="history_sidebar">
            <Sidebar></Sidebar>
            </div>
            <div className="history_container">
            <div className="history_wrap">
            <div>거래기간 </div>
            <div className='datev'><DatePicker 
                selected={startDate}
                onChange={date => setStartDate(date)}
                customInput={<ExampleCustomInput />}
                locale={ko}
                dateFormat="yyyy년 MM월 dd일"
                // selectsStart
                startDate={startDate}
                endDate={endDate}
                minDate={new Date()}
                />
            </div>
            <div>
                <DatePicker className='datev'
                selected={endDate}
                onChange={date => setEndDate(date)}
                customInput={<ExampleCustomInput />}
                locale={ko}
                dateFormat="yyyy년 MM월 dd일"
                selectsEnd
                endDate={endDate}
                startDate={startDate}
                minDate={startDate}
                />
            </div>
                        
            <Table className="history_table">
                {/* <thead>
                <tr>
                    <td>
                    </td>
                    <td>
                        <input type="calendar"/>
                    </td>
                </tr>
                </thead> */}
            </Table>

            <Table striped>
                <thead>
                <tr>
                    <th>일자</th>
                    <th>처리구분</th>
                    <th>결제수단</th>
                    <th>상품명</th>
                    <th>가맹점명</th>
                    <th>처리금액</th>
                    <th>처리상태</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>
                        <div>item.date</div>
                    </td>
                    <td>
                        <div>예시) 결제</div>
                    </td>
                    <td>
                    <div>예시)이체</div>
                </td>
                    <td>
                        <div>예시 ) 디플릭 정품</div>
                    </td>
                    <td>
                        <div>예시)이랜드</div>
                    </td>
                    <td>
                        <div>ex)1000</div>
                    </td>
                    <td>
                        <div>예시)오류</div>
                    </td>

                </tr>


                </tbody>
            </Table>

            </div>
    </div>

</div>

        );

}

export default History;