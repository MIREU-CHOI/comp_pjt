import React, { useState } from 'react';
import "../css/charge.css";
import Table from 'react-bootstrap/Table';
import Sidebar from "./Sidebar";
import '../css/sidebar.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { Button   } from 'react-bootstrap';
import axios from 'axios';


function Charge(props) {
    // const onClick =() =>{
    //     alert('충전페이지로 이동합니다.');
    // }

    const [money, setMoney] = useState("");

    const onMoneyHandler = (event) => {
        setMoney(event.currentTarget.value);
    }

    const { IMP } = window;
    IMP.init('imp08030724'); // 결제 데이터 정의

    const [merchantUid, setMerchantUid] = useState("");

    //let a = new Date().getTime();
    // `mid_${new Date().getTime()}`

    let a ;
    // 가맹점 식별하기
    const onClickCharge = (e) => {
        e.preventDefault();
        // setMerchantUid(`mid_${new Date().getTime()}`);
        console.log('money => ' + money);
        // console.log('merchantUid => ' + merchantUid);

        const data = {
            pg: 'kakaopay',           // PG사 (필수항목)
            pay_method: 'card',           // 결제수단 (필수항목)
            merchant_uid: `mid_${new Date().getTime()}`, // 
            name: 'E4. 노트북 결제 테스트',           // 주문명 (필수항목)
            amount: money,               // 금액 (필수항목)
            custom_data: { name: '부가정보', desc: '세부 부가정보' },
            buyer_name: "홍길동",          // 구매자 이름
            buyer_tel: '01012341234',       // 구매자 전화번호 (필수항목)
            buyer_email: 'test@naver.com',// 구매자 이메일
            buyer_addr: '서울',           // 주소
            buyer_postalcode: 12345
        };
        // setMerchantUid(data.merchant_uid);
        // console.log('data.merchant_uid => ' + data.merchant_uid);
        IMP.request_pay(data, callback);
    }

    // 콜백 
    const callback = (rsp) => {
        console.log('callback!!!!!');
        let {success, error_msg, imp_uid, pay_method, paid_amount, status} = rsp;
        console.log('rsp =>', rsp);
        console.log('rsp.success =>', rsp.success);
        console.log('imp_uid =>', imp_uid);
        console.log('membSn => ',sessionStorage.getItem('membSn'));
        let body = {
            transferTyCd: '1',       // 거래종류코드 (01:충전, 02:사용, 03:환전)
            transferAmt: money,         // 충전금액
            payTranserNo: imp_uid,  // 결제거래번호
            member : {
                membSn : sessionStorage.getItem('membSn') // 회원번호
            }
        }
        let data = JSON.stringify(body);
        if (rsp.success) {
            // axios로 HTTP 요청
            axios.post("http://localhost:8888/member/charge", data, {
            headers: {
                "Content-Type": "application/json",
            }
            })
            // axios({
            //     url: "http://localhost:8888/member/charge",
            //     method: "post",
            //     headers: { "Content-Type": "application/json" },
            //     body: JSON.stringify({
            //         transferTyCd: '01',       // 거래종류코드 (01:충전, 02:사용, 03:환전)
            //         transferAmt: money,         // 충전금액
            //         payTranserNo: imp_uid,  // 결제거래번호
            //         member : {
            //             membSn : sessionStorage.getItem('membSn') // 회원번호
            //         }
            //     })
            // })
            .then((res) => {
                // 서버 결제 API 성공시 로직
                alert('결제 성공하였습니다.');
                console.log('typeof(res) => ', typeof(res));
                console.log('data => ', res);
                moneyUpdate();
            })
        } else {
            alert(`결제 실패하였습니다. : ${error_msg}`);
        }
    }

    const moneyUpdate = (event) => {
        event.preventDefault();
        console.log('moneyUpdate 실행!');

        let body = {
            membSn: sessionStorage.getItem('membSn')
            // 금액, 
        }
        const data = JSON.stringify(body);

        axios.get("http://localhost:8888/member/moneyUpdate/" +  data,
        {
        // headers: {
        //     "Content-Type": "application/json",
        //     }
        }).then((res) => {
            console.log(res.data);
            console.log('회원 머니 수정 완료');
            // if(res.data == false) {
            //     alert("이미 존재하는 ID 입니다.")                     
            // } else{
            //     alert("사용 가능한 ID 입니다.")
            // }
        })

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
                        <div>&nbsp; (원)</div>

                    </td>

                </tr>
                <tr>
                    <td>머니충전액</td>
                    <td>
                        <input value={money} onChange={onMoneyHandler}
                        type="Integer" className="charge"/>원
                    </td>

                </tr>
                <tr>
                    <td>충전결과예정액</td>
                    <td>(원)</td>
                </tr>
                </tbody>
            </Table>
            <div className='form-row float-right'>
            <Button onClick={onClickCharge} variant="primary" type="submit" className='' >
                충전하기
            </Button>
            </div>
            </div>
    </div>

</div>

        );

}

export default Charge;