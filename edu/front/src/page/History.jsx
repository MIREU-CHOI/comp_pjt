import React, { useState, forwardRef, useEffect } from 'react';
// import "../../Charge/css/charge.css";
import "../css/history.css";
import '../css/sidebar.css';
import Table from 'react-bootstrap/Table';
import Sidebar from "./Sidebar";
import DatePicker from "react-datepicker";
import { ko } from 'date-fns/esm/locale';
import axios from 'axios';
import MoneyHstList from './component/MoneyHstList';


function History(props) {
    console.log("거래내역 페이지입니다.");
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const ExampleCustomInput = forwardRef(
        ({ value, onClick }, ref) => (
        <button className="example-custom-input" onClick={onClick}>
        {value}
        </button>
    ));


    return (
    <div className="history_box">
        <div className="history_sidebar">
            <Sidebar></Sidebar>
        </div>
    <div className="history_container">
        <div className="history_wrap">
        <Table className="table table-borderless table-sm">
            <tbody>
            <tr>
                <td>거래기간</td>
                <td><DatePicker 
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
                </td> ~
                <td><DatePicker 
                    selected={endDate}
                    onChange={date => setEndDate(date)}
                    customInput={<ExampleCustomInput />}
                    locale={ko}
                    dateFormat="yyyy년 MM월 dd일"
                    // selectsEnd
                    endDate={endDate}
                    startDate={startDate}
                    minDate={startDate}
                    />
                </td>
                <td >결제수단</td>
                <td>
                    <select>
                        <option value="03" selected>자체머니결제</option>
                        <option value="01">카드</option>
                        <option value="02">계좌이체</option>
                    </select>
                </td>
                <td><button className='btn btn-secondary'>조회</button></td>
            </tr>
            </tbody>
        </Table>

        <div className='table-responsive'>
            <table className='table table-striped'>
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
                    <MoneyHstList></MoneyHstList>
                </tbody>
            </table>
        </div>
        </div>
    </div>
    </div>

    );

}

export default History;