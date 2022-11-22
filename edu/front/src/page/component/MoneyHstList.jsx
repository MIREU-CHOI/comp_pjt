import axios from "axios";
import React, {useEffect, useState} from "react";

const MoneyHstList = () => {

    const [hstList, setHstList] = useState([]);

    useEffect(() => { 
        let membSn = sessionStorage.getItem("membSn");
        console.log('membSn => ', membSn);
        axios.get("http://localhost:8888/member/moneyTransferHst/"+membSn, 
        {
        }).then((res) => {
            console.log('typeof(res) =>', typeof(res))
            console.log('조인!!! res =>', res)
            console.log('typeof res.data => ', typeof(res.data));
            console.log('조인!!! res.data => ', res.data);
            console.log('transferTyCd 처리구분 => ', res.data.transferTyCd);
            console.log('payMeanCd 결제수단 => ', res.data.payMeanCd);
            setHstList(res.data);
        }).catch((error) => {
            console.log(error);
        })
    }, []); 

    return (
        <>
        {
            hstList.map((hst, idx) => (
                <tr key={idx}>
                <td>{hst.frstRegistDt}</td>
                {
                    hst.transferTyCd == "01" ?
                    <td>충전</td>
                    : hst.transferTyCd == "02" ?
                    <td>결제</td>
                    : <p></p>
                }
                {
                    hst.payMeanCd == "01" ?
                    <td>카드</td>
                    : hst.payMeanCd == "03" ?
                    <td>머니사용</td>
                    : <p></p>
                }
                <td>{hst.goodsNm}</td>
                <td>{hst.merchantNm}</td>
                <td>{hst.transferAmt} 원</td>
                {
                    hst.moneyTransferHstSn != null ?
                    <td>정상</td>
                    : <td>오류</td>
                }
                </tr>
        ))} 
         </>
    );

};

export default MoneyHstList;