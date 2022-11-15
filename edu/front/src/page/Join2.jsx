import React, { useCallback, useEffect, useState } from 'react';
import '../css/Join2.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Form, InputGroup, DropdownButton, Dropdown   } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Join2(props) {
    const navigate = useNavigate();  
    const [val, setVal] = useState("");
    const [Id, setId] = useState("");
    const [Password, setPassword] = useState("");
    const [Email1, setEmail1] = useState("");
    const [Email2, setEmail2] = useState("");
    const [Phone, setPhone] = useState("");
    const [ZipCd, setZipCd] = useState("");
    const [ZipAddr, setZipAddr] = useState("");
    const [DetailAddr, setDetailAddr] = useState("");
    const [Name, setName] = useState("");
    const [ConfirmPassword, setConfirmPassword] = useState(""); 
    const [UserCerNum, setUserCerNum] = useState("");
    const [ResCerNum, setResCerNum] = useState(0);
    const [phoneChkVal, setPhoneChkVal] = useState(false);
    const [idChkVal, setIdChkVal] = useState(false);

    const onUserCerNumHandler = (event) => {
        setUserCerNum(event.currentTarget.value);
    }
    const onIdHandler = (event) => {
        setId(event.currentTarget.value);
    }
    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value);
    }
    const onConfirmPasswordHandler = (event) => {
        setConfirmPassword(event.currentTarget.value);
    }
    // const onEmail1Handler = (event) => {
    //     setEmail1(event.currentTarget.value);
    // }

    /* email */
    const firstEmail = useCallback((e) => {
        e.preventDefault();
        setEmail1(e.target.value);
    }, []);
    const secondEmail = useCallback((e) => {
        setEmail2(e.target.value); // ex) @naver.com
    }, []);
    const emailAddr = Email1 + Email2;
    console.log(emailAddr); //ex) hello@naver.com
    useEffect(() => {
        setVal({
            ...val,
            emailAddr: emailAddr,
        })
    }
    , [emailAddr]);

    const onPhoneHandler = (event) => {
        setPhone(event.currentTarget.value);
    }
    const onZipCdHandler = (event) => {
        setZipCd(event.currentTarget.value);
    }
    const onZipAddrHandler = (event) => {
        setZipAddr(event.currentTarget.value);
    }
    const onDetailAddrHandler = (event) => {
        setDetailAddr(event.currentTarget.value);
    }
    const onNameHandler = (event) => {
        setName(event.currentTarget.value);
    }

    // =============== 회원가입 - 중복확인 버튼 ===============
    const onIdChkHandler = (event) => {
        event.preventDefault();
        console.log('중복확인 버튼 click!');
        // let body = {
        //     membId: Id
        // }
        // const data = JSON.stringify(body);

        axios.get("http://localhost:8888/member/exists/" +  Id,
         {
        // headers: {
        //     "Content-Type": "application/json",
        //     }
        }).then((res) => {
            console.log(res.data);
            if(res.data == false) {
                alert("이미 존재하는 ID 입니다.")                     
            } else{
                alert("사용 가능한 ID 입니다.")
                setIdChkVal(true);
        }})

    }

    
    // =============== 회원가입 버튼 ===============
    const onSubmitHandler = (event) => {
        event.preventDefault();
        console.log('회원가입 버튼 click!');

        let body = {
            membId: Id,
            membPwd: Password,
            membNm: Name,
            mobileNo: Phone,
            // email: Email,
            emailAddr: emailAddr,
            zipCd: ZipCd,
            zipAddr: ZipAddr,
            detailAddr: DetailAddr
        }
        const data = JSON.stringify(body);
        if(idChkVal == false){
            alert("아이디 중복 확인을 해주세요");
            return;
        }
        if (phoneChkVal == false){
            alert("휴대폰 번호 인증 확인을 해주세요");
            return;
        }
        if(idChkVal == true || phoneChkVal == true){
            console.log('idChkVal => ', idChkVal);
            console.log('phoneChkVal => ', phoneChkVal);
            axios.post("http://localhost:8888/auth/signup", data, {
            headers: {
                "Content-Type": "application/json",
                }
            }).then((res) => {
                console.log(res.data);
                if(ConfirmPassword !== Password) {
                    alert("비밀번호와 비밀번호 확인이 일치하지 않습니다")                     
                } else{
                    alert("회원가입 완료")
                    navigate("/charge")
            }})
            
        }
    }

    // =============== coolsms 휴대폰번호 인증번호 "전송" 버튼 ===============
    const onCerNumSendHandler = (event) => {
        event.preventDefault();
        console.log('인증번호 전송 버튼 click!');
        console.log('Phone => '+Phone);
        // let body = {
        //     membId: Id
        // }
        // const data = JSON.stringify(body);

        axios.get("http://localhost:8888/check/sendSMS/" +  Phone,
         {
        // headers: {
        //     "Content-Type": "application/json",
        //     }
        }).then((res) => { // 인증번호 반환값 
            console.log("res => "+res);
            console.log("typeof(res) => "+ typeof(res));
            console.log("res.data '인증번호 반환값' => "+ res.data);
            console.log("typeof(res.data) => "+ typeof(res.data));

            setResCerNum(res.data);
            // if(res.data != null) {
            //     alert("not null")                     
            // } else{
            //     alert("null")
            // }
        })
    }

    // =============== coolsms 휴대폰번호 인증번호 "확인" 버튼 ===============
    const onCerNumChkHandler = (event) => {
        event.preventDefault();
        console.log('인증번호 확!인! 버튼 click!');
        console.log('UserCerNum => '+ UserCerNum);
        console.log('typeof(UserCerNum) => '+ typeof(UserCerNum));
        console.log('ResCerNum => '+ ResCerNum);
        console.log('typeof(ResCerNum) => '+ typeof(ResCerNum));

        if(UserCerNum == ResCerNum){
            setPhoneChkVal(true);
            alert("인증되었습니다.")
        }else{
            alert("인증번호가 일치하지 않습니다.")
        }
        // let body = {
        //     membId: Id
        // }
        // const data = JSON.stringify(body);

        // axios.get("http://localhost:8888/check/sendSMS/" +  Phone,
        //  {
        // headers: {
        //     "Content-Type": "application/json",
        //     }
        // }).then((res) => { // 인증번호 반환값 
        //     console.log(res.data);
        //     if(res.data != null) {
        //         alert("not null")                     
        //     } else{
        //         alert("null")
        //     }
        // })
    }
    
    /*
    var crypto = require("crypto");
    var axios = require("axios");

    var now = new Date().toISOString();
    // 16진수 64자의 랜덤 값 생성
    var genRanHex = size =>
    [...Array(size)]
        .map(() => Math.floor(Math.random() * 16).toString(16))
        .join("");
    var salt = genRanHex(64);
    var message = now + salt;
    var apiKey = "NCSWHPQVP5NAUBVJ";
    var apiSecret = "L8XDZSRGW60ZWXZYAVWBVOMMLMWBQVXW";
    var signature = crypto.createHmac("sha256", apiSecret).update(message).digest("hex");

    // 생성한 시그니처를 사용하여 API 호출
    var uri = `https://api.coolsms.co.kr/messages/v4/list?limit=1`;
    axios
    .get(uri, {
        headers: {
        Authorization: `HMAC-SHA256 apiKey=${apiKey}, date=${now}, salt=${salt}, signature=${signature}`
        }
    })
    .then(res => {
        console.log(res.data);
    })
    .catch(error => {
        console.log(error.response.data);
    });
    */
    

    return (
        <div className='container'
        // style={{ 
        //     display: 'flex', justifyContent: 'center', alignItems: 'center', 
        //     width: '100%', height: '100vh'
        //     }}
        style={{
            margin: '50px ',
        //     display: 'flex',
        //     justifyContent: 'center',
        //     alignItems: 'center',
            width: '100vw',
            height: '100vh',
          }}
            >
                <div style={{backgroundColor:'#dadada', borderRadius:'7px'}}>
                <h1 style={{padding:'8px'}}>&nbsp;회원가입</h1></div>
            <Form className='container'>
                <h4 >▶ 회원정보</h4>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label >아이디 (*)</Form.Label>
                    <div className='inputGroup'>
                        <Form.Control type="text"  value={Id} onChange={onIdHandler} style={{marginRight:'10px'}}/>
                        {/* 중복확인 버튼 옆에 두고 싶은데   style={{float:'left'}}   안 먹음 ㅠ */}
                        <Button variant="primary" type="button" style={{width:'100px'}} onClick={onIdChkHandler} >
                            중복확인
                        </Button>
                    </div>
                        {/* <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                        </Form.Text> */}
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>비밀번호 (*)</Form.Label>
                    <div className='inputGroup'>
                    <Form.Control type="password" value={Password} onChange={onPasswordHandler}/>
                    </div>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>비밀번호 확인 (*)</Form.Label>
                    <Form.Control type="password" value={ConfirmPassword} onChange={onConfirmPasswordHandler}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>성명 (*)</Form.Label>
                    <Form.Control type="text" value={Name} onChange={onNameHandler}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>휴대폰 번호 (*)</Form.Label>
                    <div className='inputGroup'>
                        <Form.Control type="text" value={Phone} onChange={onPhoneHandler}
                            placeholder="- 없이 숫자만 입력하세요." style={{ marginRight:'10px'}}/>
                        <Button variant="primary" type="button" style={{width:'180px'}} onClick={onCerNumSendHandler}>
                            인증번호 전송
                        </Button>
                    </div>
                    <div className='inputGroup'>
                        <Form.Control type="text" value={UserCerNum} onChange={onUserCerNumHandler}
                            placeholder="인증번호 입력" style={{ marginRight:'10px'}}/>
                        <Button variant="primary" type="button" style={{width:'180px'}} onClick={onCerNumChkHandler} >
                            인증번호 확인
                        </Button>
                    </div>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>이메일</Form.Label>
                    <InputGroup className="mb-3" style={{alignItems:'center'}} >
                        <Form.Control aria-label="Text input with dropdown button" value={Email1} onChange={firstEmail}/> @ 
                        <Form.Select aria-label="Default select example" value={Email2} onChange={secondEmail}>
                            <option style={{textAlign:'center'}}>-----  선택  -----</option>
                            <option value="@naver.com">naver.com</option>
                            <option value="@daum.net">daum.net</option>
                            <option value="@gmail.com">gmail.com</option>
                        </Form.Select>
                    </InputGroup>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>우편번호 (*)</Form.Label>
                    <Form.Control type="text" value={ZipCd} onChange={onZipCdHandler}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>주소 (*)</Form.Label>
                    <Form.Control type="text" value={ZipAddr} onChange={onZipAddrHandler}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>상세주소</Form.Label>
                    <Form.Control type="text" value={DetailAddr} onChange={onDetailAddrHandler}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>
                {/* <div class="col-lg-6 col-sm-12 text-lg-end text-center"> */}
                <div className='form-row float-right'>
                <Button variant="primary" type="submit" className='joinBtn' onClick={onSubmitHandler} >
                    회원가입
                </Button>
                </div>
            </Form>
        </div>
    )
}

export default Join2;