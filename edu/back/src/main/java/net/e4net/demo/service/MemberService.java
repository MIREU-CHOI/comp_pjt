package net.e4net.demo.service;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;

import org.json.simple.JSONObject;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.e4net.demo.dto.MemberDTO;
import net.e4net.demo.entity.MembMoney;
import net.e4net.demo.entity.Member;
import net.e4net.demo.repository.MemberRepository;
import net.nurigo.java_sdk.api.Message;
import net.nurigo.java_sdk.exceptions.CoolsmsException;

@Service
@Slf4j
@Transactional
@RequiredArgsConstructor
public class MemberService {
	
	private final MemberRepository memberRepository;
	
	private final ModelMapper modelMapper;
	
	// 회원가입
	public Long join(MemberDTO dto) {
		log.info("MemberService Layer :: Call join Method!");
		Member member = modelMapper.map(dto, Member.class);
		boolean res = validateDuplicateMember(member); // 중복 회원 검증
		if (res) {
			memberRepository.save(member);			
		} 
		return member.getMembSn();
	}
	
	// 전체 회원 조회
	public List<Member> findMembers() {
		return memberRepository.findAll();
	}
	
//	public Member fineOne(Long membId) {
//		return memberRepository.findOne(membId);
//	}
	
	// 회원가입 시 아이디 중복 체크 - 리액트에서 버튼 눌렀을 때 요청되는 메서드 V
	public boolean checkMembIdDuplicate(String membId) {
		log.info("Auth Service's Service Layer :: Call checkMembIdDuplicate Method!");
		boolean res = memberRepository.existsByMembId(membId);
		return res;
	}
	
	
	
	
	// ---------------------------------
	// 회원가입 시 아이디 중복확인 - 미르 리팩토링 : 스프링 내에서만 중복확인 한 것 
	// --- 위 중복확인 메서드를 사용함
	private boolean validateDuplicateMember(Member member) {
		Optional<Member> findMembers =
				memberRepository.findByMembId(member.getMembId());
		if (findMembers.isEmpty()) {
			return true; 
		} else {
//			throw new IllegalStateException("이미 존재하는 회원입니다.");
			return false;
		}
	} 
	
//	private void validateDuplicateMember(Member member) {
//		Optional<Member> findMembers =
//				memberRepository.findByMembId(member.getMembId());
//		if (!findMembers.isEmpty()) {
//			throw new IllegalStateException("이미 존재하는 회원입니다.");
//		}
//	} 
	
	
	
	
	
	
	
	
	
	
	
	// ================= 221108 ===============================
//	public boolean login(Member member) {
//		Member findUser = memberRepository.findByMembId(member.getMembId());
//        if(findUser == null){
//            return false;
//        }
//        if(!findUser.getMembPwd().equals(member.getMembPwd())){
//            return false;
//        }
//        return true;
//    }
	
//	public String login(String membId, String password) {
//		Optional<Member> member = memberRepository.findByMembId(membId);
//		log.info("db password = {}, input password = {}", member.get().getMembPwd(), password);
//		if(member.get().getMembPwd().equals(password)) {
//			return "Success";
//		}
//		return "Failed";
//	}
//	
//	public String signup(Member request){
//		memberRepository.save(Member.builder()
//                .membId(request.get())
//                .password(request.getPassword())
//                .userName(request.getUserName())
//                .build());
//        return "Success";
//    }
	// ======================================================
	
	
	
//	public MemberDTO insertMember(MemberDTO member) {
//		return memberRepository.insertMember(member);
//	}
//	
//	public List<MemberDTO> getAllMembers(){
//		return memberRepository.getAllMembers();
//	}
//	
//	public MemberDTO getMemberByMemId(String membId) {
//		return memberRepository.getMemberByMemId(membId);
//	}
//	
//	public void updateMembPwd(String membId, MemberDTO member) {
//		memberRepository.updateMembPwd(membId, member);
//	}
//	
//	public void deleteMember(String membId) {
//		memberRepository.deleteMember(membId);
//	}
	
	
	/////////////// 교육 실습 //////////////////////
//	@Transactional
//	public void join(Member member) {
//		MembMoney.createMembMoney(memberRepository.save(Member.createMember("Role_admin")));
//	}
	
//	@Transactional
//	public Member join(Member member) {
//		validatedup
//	}
//	
//	private void validateDuplicateMember(Member member) {
//		List<Member> findMembers = memberRepository.findBy
//	}

}
