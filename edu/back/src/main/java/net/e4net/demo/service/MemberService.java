package net.e4net.demo.service;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;

import org.json.simple.JSONObject;
import org.modelmapper.ModelMapper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.e4net.demo.config.SecurityUtil;
import net.e4net.demo.dto.MoneyDTO;
import net.e4net.demo.dto.MemberDTO;
import net.e4net.demo.dto.MemberResponseDTO;
import net.e4net.demo.dto.MoneyTransferHstDTO;
import net.e4net.demo.entity.Money;
import net.e4net.demo.entity.MoneyTransferHst;
import net.e4net.demo.entity.Member;
import net.e4net.demo.repository.MemberRepository;
import net.e4net.demo.repository.MoneyRepository;
import net.e4net.demo.repository.MoneyTransferRepository;
import net.nurigo.java_sdk.api.Message;
import net.nurigo.java_sdk.exceptions.CoolsmsException;

@Service
@Slf4j
@Transactional
@RequiredArgsConstructor
public class MemberService {
	
	private final MoneyRepository moneyRepository;
	private final MoneyTransferRepository moneyTransferRepository;
	private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
	
	private final ModelMapper modelMapper;
	
	// 전체 회원 조회
	public List<Member> findMembers() {
		log.info("MemberService Layer :: Call findMembers Method!");
		return memberRepository.findAll();
	}
	
	// 머니 충전
	public MoneyTransferHst insertMoneyTrans(MoneyTransferHstDTO dto) {
		log.info("MemberService Layer :: Call insertMoneyTrans Method!");
		Long membSn = dto.getMember().getMembSn();
		Member member = Member.builder()
							  .membSn(membSn)
							  .build();
		System.out.println(membSn);
		dto.setMember(member);
	
		MoneyTransferHst entity = modelMapper.map(dto, MoneyTransferHst.class);
		
		return moneyTransferRepository.save(entity);
	}
	// 머니 충전 시 회원머니 테이블 업데이트 
	@Transactional
	public Money updateMoney(Long membSn, Long amount){
		log.info("MemberService Layer :: Call updateMoney Method!");
		Long moneySn = membSn; 
//		Money money = moneyRepository.findMoneyByMoneySn(moneySn);
//		Long membSn = transDto.getMember().getMembSn();
//		transDto.getMember().get
//		Optional<Money> money = moneyRepository.findById(moneySn);
		Money money = moneyRepository.findByMoneySn(moneySn);
		Long balance = money.getMoneyBlce();
		System.out.println("balance => "+balance);
		Member member = Member.builder()
							  .membSn(membSn)
							  .build();
		MoneyDTO moneyDto = MoneyDTO.builder()
									.moneyBlce(balance+amount)
									.moneySn(membSn)
									.member(member).build();
		Money money2 = modelMapper.map(moneyDto, Money.class);
		return moneyRepository.save(money2);
	}
	
	
	
	
//	public Member fineOne(Long membId) {
//		return memberRepository.findOne(membId);
//	}
	// ====================== 아래는 사용 안함 ==================================
	// (사용x) AuthService 로 회원가입 & 로그인 구현함!!! 
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
	// (사용x) 회원가입 시 아이디 중복확인 - 미르 리팩토링 : 스프링 내에서만 중복확인 한 것 
	private boolean validateDuplicateMember(Member member) {
		Optional<Member> findMembers =
				memberRepository.findByMembId(member.getMembId());
		if (findMembers.isEmpty()) {
			return true; 
		} else {
//				throw new IllegalStateException("이미 존재하는 회원입니다.");
			return false;
		}
	} 
	
	// (사용x) 회원가입 시 아이디 중복 체크 - 리액트에서 버튼 눌렀을 때 요청되는 메서드 V
	public boolean checkMembIdDuplicate(String membId) {
		log.info("MemberService Layer :: Call checkMembIdDuplicate Method!");
		boolean res = memberRepository.existsByMembId(membId);
		return res;
	}
	
	// (사용x) ------- 221111 security login & join -----------------------
    // 헤더에 있는 token값을 토대로 Member의 data를 건내주는 메소드
	public MemberDTO getMyInfoBySecurity() {
        return memberRepository.findById(SecurityUtil.getCurrentMemberId())
                .map(MemberDTO::toDto)
                .orElseThrow(() -> new RuntimeException("로그인 유저 정보가 없습니다"));
    }

	// 우편번호 변경 
    @Transactional
    public MemberDTO changeMemberZipCd(String membId, String zipCd) {
        Member member = memberRepository.findByMembId(membId).orElseThrow(() -> new RuntimeException("로그인 유저 정보가 없습니다"));
        member.setZipCd(zipCd);
        return MemberDTO.toDto(memberRepository.save(member));
    }

    // 패스워드 변경 - token값을 토대로 찾아낸 member를 찾아낸 다음 제시된 예전 패스워드와 DB를 비교
    @Transactional
    public MemberDTO changeMembPwd(String membId, String exPassword, String newPassword) {
        Member member = memberRepository.findById(
        		SecurityUtil.getCurrentMemberId())
        		.orElseThrow(() -> new RuntimeException("로그인 유저 정보가 없습니다"));
        if (!passwordEncoder.matches(exPassword, member.getMembPwd())) {
            throw new RuntimeException("비밀번호가 맞지 않습니다");
        }
        member.setMembPwd(passwordEncoder.encode((newPassword))); // 맞으면 새 패스워드로 교체
        return MemberDTO.toDto(memberRepository.save(member));
    }
	// --------------------------------------------------------------------


    
    
    
	
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
