import React, { useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Sidebar from "./Sidebar";
import { Button   } from 'react-bootstrap';
import axios from 'axios';
import { useState } from 'react';

const Payment = (effect, deps) => {
    // 세팅 - 라이브러리 호출
/*
    useEffect(() => {
        const jquery = document.createElement("script");
        jquery.src = "https://code.jquery.com/jquery-1.12.4.min.js";
        const iamport = document.createElement("script");
        iamport.src = "https://cdn.iamport.kr/js/iamport.payment-1.1.7.js";
        document.head.appendChild(jquery); document.head.appendChild(iamport);
        return () => { 
            document.head.removeChild(jquery);
            document.head.removeChild(iamport);
        }
    }, []);
*/
    
    const [money, setMoney] = useState("");


    const onMoneyHandler = (event) => {
        setMoney(event.currentTarget.value);
    }

    const { IMP } = window;
    IMP.init('imp08030724'); // 결제 데이터 정의


    // 가맹점 식별하기
    const onClickPayment = () => {
  
        const data = {
            pg: 'kakaopay',           // PG사 (필수항목)
            pay_method: 'card',           // 결제수단 (필수항목)
            merchant_uid: `mid_${new Date().getTime()}`, // 결제금액 (필수항목)
            name: 'E4. 노트북 결제 테스트',           // 주문명 (필수항목)
            amount: money,               // 금액 (필수항목)
            custom_data: { name: '부가정보', desc: '세부 부가정보' },
            buyer_name: "홍길동",          // 구매자 이름
            buyer_tel: '01012341234',       // 구매자 전화번호 (필수항목)
            buyer_email: 'test@naver.com',// 구매자 이메일
            buyer_addr: '서울',           // 주소
            buyer_postalcode: 12345
        };
        IMP.request_pay(data, callback);
    }

    // 콜백 
    const callback = (rsp) => {
        const {success, error_msg, imp_uid, merchant_uid, pay_method, paid_amount, status} = rsp;
        if (rsp.success) {
            // axios로 HTTP 요청
            axios({
                url: "http://localhost:8888/member/charge",
                method: "post",
                headers: { "Content-Type": "application/json" },
                data: {
                    imp_uid: rsp.imp_uid,
                    merchant_uid: rsp.merchant_uid
                }
            }).then((data) => {
                // 서버 결제 API 성공시 로직
                alert('결제 성공하였습니다.');
            })
        } else {
            alert(`결제 실패하였습니다. : ${error_msg}`);
        }
    }

    return (
        <>
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
                        <th>내용</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>가맹점</td>
                        <td>
                            <select>
                                <option value="">== 선택 ==</option>
                            </select>
                        </td>

                    </tr>
                    <tr>
                        <td>구매물품</td>
                        <td>
                            <select>
                                <option value="">== 선택 ==</option>
                            </select>
                        </td>

                    </tr>
                    <tr>
                        <td>결제금액</td>
                        <td>
                            <input value={money} onChange={onMoneyHandler}
                            type="Integer" className="charge" style={{border:"none"}}/> 원
                        </td>
                    </tr>
                    <tr>
                        <td>결제수단</td>
                        <td>
                            <select>
                                <option value="03">선불머니</option>
                                <option value="01">카드</option>
                                <option value="02">계좌이체</option>
                            </select>
                        </td>
                    </tr>
                    </tbody>
                </Table>
                <div className='form-row float-right'>
                    {/* <Button variant="primary" type="submit" className='payBtn' >
                        결제하기
                    </Button> */}
                    {/* 미르 테스트 - 결제하기 버튼 */}
                    <Button  onClick={onClickPayment} variant="primary" type="submit" className='payBtn' >
                        결제하기
                    </Button>
                </div>
                </div>
            </div>
        </div>
        </>
);
}

export default Payment;