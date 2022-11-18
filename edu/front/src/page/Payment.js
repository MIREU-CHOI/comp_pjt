import React, { useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Sidebar from "./Sidebar";
import { Button   } from 'react-bootstrap';
import axios from 'axios';
import { useState } from 'react';

const Payment = (effect, deps) => {

    // const [merchantSn, setMerchantSn] = useState();
    const [goodInfo, setGoodsInfo] = useState();
    const [mercList, setMercList] = useState();
    const [goodList, setGoodList] = useState();
    const [money, setMoney] = useState("");
    
    const onMoneyHandler = (event) => {
        setMoney(event.currentTarget.value);
    }
    // console.log('typeof mercList =>', typeof(mercList))
    // console.log('mercList =>', mercList)
    
    // ================ 결제 페이지로 올 때 "가맹점" 정보 가져오기 ================
    useEffect(() => {
        axios.get("http://localhost:8888/member/merchants", 
        {
        }).then((res) => {
            console.log('typeof(res) =>', typeof(res))
            console.log('res =>', res)
            console.log('typeof(res.data) =>', typeof(res.data))
            console.log('res.data =>', res.data)
            setMercList(res.data);
            // setMerchantSn(res.data.merchantSn);
            console.log('typeof mercList =>', typeof(mercList))
            console.log('mercList =>', mercList)
        }).catch((error) => {
            console.log(error);
        })
    }, []);

    // ================ 가맹점 선택하면 그 가맹점의 "상품" 정보 가져오기 ================
    const onClickMerchant = (e) => {
        console.log('가맹점 클릭 !!!!!');
        let merchantSn = e.target.value;
        console.log('typeof merchantSn =>', typeof(merchantSn));

        axios.get("http://localhost:8888/member/merchants/"+merchantSn, 
        {
        }).then((res) => {
            console.log('typeof(res) =>', typeof(res))
            console.log('res =>', res)
            console.log('typeof(res.data) =>', typeof(res.data))
            console.log('res.data =>', res.data)
            setGoodList(res.data);
            console.log('typeof goodList =>', typeof(goodList))
            console.log('goodList =>', goodList)
        }).catch((error) => {
            console.log(error);
        })
    }
    // onClickGood
    const onClickGood = (e) => {
        console.log('상품 클릭 !!!!!');
        // setGoodsNo(e.target.value);
        let goodsNo = e.target.value;
        console.log('typeof goodsNo =>', typeof(goodsNo));
        axios.get("http://localhost:8888/member/merchants/"+goodsNo, 
        {
        }).then((res) => {
            console.log('typeof(res) =>', typeof(res))
            console.log('res =>', res)
            console.log('typeof(res.data) =>', typeof(res.data))
            console.log('res.data =>', res.data)
            setGoodsInfo(res.data);
            console.log('typeof goodInfo =>', typeof(goodInfo))
            console.log('goodInfo =>', goodInfo)
        }).catch((error) => {
            console.log(error);
        })
    }



    // ================ 아임포트 - 카카오페이 ================
    const { IMP } = window;
    IMP.init('imp08030724'); // 결제 데이터 정의

    // 가맹점 식별하기
    const onClickPayment = (e) => {

        const data = {
            pg: 'kakaopay',           // PG사 (필수항목)
            pay_method: 'card',           // 결제수단 (필수항목)
            merchant_uid: `mid_${new Date().getTime()}`, // 결제금액 (필수항목)
            name: 'E4. 결제 테스트',           // 주문명 (필수항목)
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
        if (success) {
            // axios로 HTTP 요청
            axios({
                url: "http://localhost:8888/member/payment",
                method: "post",
                headers: { "Content-Type": "application/json" },
                data: {
                    // imp_uid: rsp.imp_uid,
                    // merchant_uid: rsp.merchant_uid
                    transferTyCd: '2',     // 거래종류코드 (01:충전, 02:사용, 03:환전)
                    transferAmt: money,     // 충전금액
                    payTranserNo: imp_uid,  // 결제거래번호
                    member : {
                        membSn : sessionStorage.getItem('membSn') // 회원번호
                    }
                }
            }).then((data) => {
                // 서버 결제 API 성공시 로직
                alert('결제 성공하였습니다.');
            }).catch((error) => {
                console.log(error);
            })
        } else {
            alert(`결제 실패하였습니다. : ${error_msg}`);
        }
    }


//////////////////////////////////////////////////////////////////////////////////////////////////
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
                            <select onChange={onClickMerchant}>
                                <option value="">== 선택 ==</option>
                                {/* {mercList != undefined && mercList.map((merc, idx) => ( */}
                                {mercList && mercList.map((merc, idx) => (
                                    <option key={idx} value={merc.merchantSn} > 
                                        {merc.merchantNm}</option>
                                // JavaScript에서 true && expression은 항상 expression으로 실행되고 
                                // false && expression은 항상 false로 실행된다. 
                                // 따라서 조건이 참이면 && 바로 뒤의 요소가 출력에 나타난다. 
                                // 거짓이면 React는 무시하고 건너뛴다. 
                                ))}
                            </select>
                        </td>

                    </tr>
                    <tr>
                        <td>구매물품</td>
                        <td>
                            <select>
                                <option value="">== 선택 ==</option>
                                {goodList && goodList.map((good, idx) => (
                                    <option key={idx} value={good.goodsNo} onClick={onClickGood}> 
                                        {good.goodsNm}</option>
                                ))}
                            </select>
                        </td>

                    </tr>
                    <tr>
                        <td>결제금액</td>
                        <td>
                            <input value={goodInfo} onChange={onMoneyHandler} readOnly
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