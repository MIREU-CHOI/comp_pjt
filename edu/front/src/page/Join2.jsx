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

    const onIdChkHandler = (event) => {
        event.preventDefault();
        console.log('???????????? ?????? click!');
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
                alert("?????? ???????????? ID ?????????.")                     
            } else{
                alert("?????? ????????? ID ?????????.")
        }})

    }

    const onSubmitHandler = (event) => {
        event.preventDefault();
        console.log('???????????? ?????? click!');
        // if(Password !== ConfirmPassword){
        //     return alert('??????????????? ???????????? ????????? ?????? ????????????.')
        // }

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

        ///////////////////////////////////////////////
        axios.post("http://localhost:8888/member/join", data, {
        headers: {
            "Content-Type": "application/json",
            }
        }).then((res) => {
            console.log(res.data);
            if(ConfirmPassword !== Password) {
                alert("??????????????? ???????????? ????????? ???????????? ????????????")                     
            } else{
                alert("???????????? ??????")
                navigate("/charge")
        }})
    }

    // ----------- coolsms ---------------------------------------------------
    const onMobileChkHandler = (event) => {
        event.preventDefault();
        console.log('???????????? ?????? ?????? click!');
        // let body = {
        //     membId: Id
        // }
        // const data = JSON.stringify(body);

        axios.get("http://localhost:8888/check/sendSMS/" +  Phone,
         {
        // headers: {
        //     "Content-Type": "application/json",
        //     }
        }).then((res) => {
            console.log(res.data);
            if(res.data == false) {
                alert("?????? ???????????? ID ?????????.")                     
            } else{
                alert("?????? ????????? ID ?????????.")
        }})
    }
    
    /*
    var crypto = require("crypto");
    var axios = require("axios");

    var now = new Date().toISOString();
    // 16?????? 64?????? ?????? ??? ??????
    var genRanHex = size =>
    [...Array(size)]
        .map(() => Math.floor(Math.random() * 16).toString(16))
        .join("");
    var salt = genRanHex(64);
    var message = now + salt;
    var apiKey = "NCSWHPQVP5NAUBVJ";
    var apiSecret = "L8XDZSRGW60ZWXZYAVWBVOMMLMWBQVXW";
    var signature = crypto.createHmac("sha256", apiSecret).update(message).digest("hex");

    // ????????? ??????????????? ???????????? API ??????
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

    

    // ----------- coolsms ---------------------------------------------------
    




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
                <h1 style={{padding:'8px'}}>&nbsp;????????????</h1></div>
            <Form className='container'>
                <h4 >??? ????????????</h4>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label >????????? (*)</Form.Label>
                    <div className='inputGroup'>
                        <Form.Control type="text"  value={Id} onChange={onIdHandler} style={{marginRight:'10px'}}/>
                        {/* ???????????? ?????? ?????? ?????? ?????????   style={{float:'left'}}   ??? ?????? ??? */}
                        <Button variant="primary" type="button" style={{width:'100px'}} onClick={onIdChkHandler} >
                            ????????????
                        </Button>
                    </div>
                        {/* <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                        </Form.Text> */}
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>???????????? (*)</Form.Label>
                    <div className='inputGroup'>
                    <Form.Control type="password" value={Password} onChange={onPasswordHandler}/>
                    </div>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>???????????? ?????? (*)</Form.Label>
                    <Form.Control type="password" value={ConfirmPassword} onChange={onConfirmPasswordHandler}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>?????? (*)</Form.Label>
                    <Form.Control type="text" value={Name} onChange={onNameHandler}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>????????? ?????? (*)</Form.Label>
                    <div className='inputGroup'>
                        <Form.Control type="text" value={Phone} onChange={onPhoneHandler}
                            placeholder="- ?????? ????????? ???????????????." style={{ marginRight:'10px'}}/>
                        <Button variant="primary" type="button" style={{width:'180px'}} >
                            ???????????? ??????
                        </Button>
                    </div>
                    <div className='inputGroup'>
                        <Form.Control type="text" placeholder="???????????? ??????" style={{ marginRight:'10px'}}/>
                        <Button variant="primary" type="button" style={{width:'180px'}}  >
                            ???????????? ??????
                        </Button>
                    </div>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>?????????</Form.Label>
                    <InputGroup className="mb-3" style={{alignItems:'center'}} >
                        <Form.Control aria-label="Text input with dropdown button" value={Email1} onChange={firstEmail}/> @ 
                        <Form.Select aria-label="Default select example" value={Email2} onChange={secondEmail}>
                            <option style={{textAlign:'center'}}>-----  ??????  -----</option>
                            <option value="@naver.com">naver.com</option>
                            <option value="@daum.net">daum.net</option>
                            <option value="@gmail.com">gmail.com</option>
                        </Form.Select>
                    </InputGroup>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>???????????? (*)</Form.Label>
                    <Form.Control type="text" value={ZipCd} onChange={onZipCdHandler}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>?????? (*)</Form.Label>
                    <Form.Control type="text" value={ZipAddr} onChange={onZipAddrHandler}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>????????????</Form.Label>
                    <Form.Control type="text" value={DetailAddr} onChange={onDetailAddrHandler}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>
                {/* <div class="col-lg-6 col-sm-12 text-lg-end text-center"> */}
                <div className='form-row float-right'>
                <Button variant="primary" type="submit" className='joinBtn' onClick={onSubmitHandler} >
                    ????????????
                </Button>
                </div>
            </Form>
        </div>
    )
}

export default Join2;