import React from 'react';
import "../css/charge.css";
import Table from 'react-bootstrap/Table';
import Sidebar from "./Sidebar";
import '../css/sidebar.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { Button   } from 'react-bootstrap';


function Charge(props) {
    const onClick =() =>{
        alert('충전페이지로 이동합니다.');
    }

        return (
            <div className="charge_box">
            <div className="charge_sidebar">
            <Sidebar></Sidebar>
            </div>
            <div className="charge_container">
            <div className="charge_wrap">
            <Table striped>
                <thead>
                <tr>
                    <th></th>
                    <th>금액</th>

                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>머니잔액</td>
                    <td>
                        <div>(원)</div>

                    </td>

                </tr>
                <tr>
                    <td>머니충전액</td>
                    <td>
                        <input type="Integer" className="charge"/>원
                    </td>

                </tr>
                <tr>
                    <td>충전결과예정액</td>
                    <td>(원)</td>
                </tr>
                </tbody>
            </Table>
            <div className='form-row float-right'>
            <Button variant="primary" type="submit" className='' onClick={onClick}>
                충전하기
            </Button>
            </div>
            </div>
    </div>

</div>

        );

}

export default Charge;