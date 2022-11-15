package net.e4net.demo.controller;

import java.util.List;
import java.util.Random;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.e4net.demo.dto.ChangePasswordRequestDTO;
import net.e4net.demo.dto.MemberDTO;
import net.e4net.demo.dto.MemberRequestDTO;
import net.e4net.demo.dto.MoneyTransferHstDTO;
import net.e4net.demo.dto.MemberDTO;
import net.e4net.demo.entity.Member;
import net.e4net.demo.entity.MoneyTransferHst;
import net.e4net.demo.service.CertificationService;
import net.e4net.demo.service.MemberService;

@RestController
@RequiredArgsConstructor
@CrossOrigin
@Slf4j
public class MemberController {

	private final MemberService memberService;
	private final CertificationService certificationService;

	// 휴대폰번호 인증 coolSMS 221110
	@GetMapping("/check/sendSMS/{mobileNo}")
	public ResponseEntity<String> sendSMS(@PathVariable("mobileNo") String mobileNo) {
		System.out.println("수신자 번호 : " + mobileNo);
//        String cerNum = certificationService.certifiedPhoneNumber(mobileNo);
		String cerNum = "1004";
		System.out.println("인증번호 : " + cerNum);
		return ResponseEntity.status(HttpStatus.OK).body(cerNum);
	}
	
	// 머니 충전 221115
	@PostMapping("/member/charge")
	public ResponseEntity<MoneyTransferHstDTO> chargeMoney(MoneyTransferHstDTO dto) {
		log.info("MemberController Layer :: Call chargeMoney Method!");
		memberService.chargeMoney(dto);
		return ResponseEntity.status(HttpStatus.OK).body(dto);
	}
	
	
	

	// ====================== 아래는 사용 안함 ==================================
	// 회원가입 시 아이디 중복 체크
	@GetMapping("/member/exists/{membId}")
	public ResponseEntity<Boolean> checkMembIdDuplicate(@PathVariable("membId") String membId) {
		System.out.println("membId => " + membId);
		log.info("MemberController Layer :: Call checkMembIdDuplicate Method!");
		if (memberService.checkMembIdDuplicate(membId)) {
			return ResponseEntity.status(HttpStatus.OK).body(false);
		}
		return ResponseEntity.status(HttpStatus.OK).body(true);
//		return ResponseEntity.ok(memberService.checkMembIdDuplicate(membId));
	}

	
	// -------------- 221111 security login & join --------------
	// 우편번호
	@GetMapping("/member/me")
	public ResponseEntity<MemberDTO> getMyMemberInfo() {
		MemberDTO myInfoBySecurity = memberService.getMyInfoBySecurity();
		System.out.println(myInfoBySecurity.getZipCd());
		return ResponseEntity.ok((myInfoBySecurity));
		// return ResponseEntity.ok(memberService.getMyInfoBySecurity());
	}

	@PostMapping("/member/nickname")
	public ResponseEntity<MemberDTO> setMembZipCd(@RequestBody MemberDTO request) {
		return ResponseEntity.ok(memberService.changeMemberZipCd(request.getMembId(), request.getMembPwd()));
	}

	@PostMapping("/member/password")
	public ResponseEntity<MemberDTO> setMembPwd(@RequestBody ChangePasswordRequestDTO request) {
		return ResponseEntity
				.ok(memberService.changeMembPwd(request.getMembId(), request.getExMembPwd(), request.getNewMembPwd()));
	}


	// AuthController 의 signup 과 join 메소드로 처리함
	// -------------- 221109 --------------
	@PostMapping("/member/join")
	public ResponseEntity<MemberDTO> join(@RequestBody MemberDTO dto) {
		log.info("MemberController Layer :: Call join Method!");
		System.out.println("MembId => " + dto.getMembId());
		Long membSn = memberService.join(dto);
		System.out.println("가입완료 membSn => " + membSn);
		return new ResponseEntity<MemberDTO>(dto, HttpStatus.OK);
	}


	// -------------- 221108 --------------
//	@RequestMapping("/member/insert")
//	public MemberDTO insertMember(@RequestParam String member) {
	// return memberService.insertMember(member);
//		log.info("\n{}(아/야), 안녕!", member);
//		System.out.println("!!!!!!!!!!!!!!!!!!!!!");
//		return null;
//	}
//	@PostMapping("/login")
//	public ResponseEntity login(@RequestBody Member request) {
//		log.info("userId = {}, password = {}", request.getMembId(), request.getMembPwd());
//		if(memberService.login(request.getMembId(), request.getMembPwd()).equals("Success")) {
//			return new ResponseEntity(HttpStatus.OK);
//		}
//		return new ResponseEntity(HttpStatus.BAD_REQUEST);
//	}
//	@GetMapping("/member/login")
//    public String login() {
//        return "login";
//    }
//
//    @PostMapping("/member/login")
//    public String loginId(@ModelAttribute Member member) {
//        if(memberService.login(member)){
//            return "redirect:/";
//        }
//        return "login";
//    }
	// ======================================================

//	
//	public List<MemberDTO> getAllMembers(){
//		return memberService.getAllMembers();
//	}
//	
//	public MemberDTO getMemberByMembId(String membId) {
//		return memberService.getMemberByMemId(membId);
//	}
//	
//	public void updateMembPwd(String membId, MemberDTO member) {
//		memberService.updateMembPwd(membId, member);
//	}
//	
//	public void deleteMember(String membId) {
//		memberService.deleteMember(membId);
//	}

	///////////////// 교육 실습 ///////////////
//	@PostMapping("/member/new")
//	public void add(@RequestBody Member member) {
//		memberService.join(member);
//	}

}
