package net.e4net.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import net.e4net.demo.entity.MembMoney;
import net.e4net.demo.entity.Member;
import net.e4net.demo.entity.UserRole;

//@Getter @Setter
@AllArgsConstructor
@Data
public class MemberDTO {
	
	private Long membSn;		// 회원번호	
	private UserRole userRole;  // 회원구분 - ROLE_ADMIN:어드민, ROLE_SELLER:판매자, ROLE_USER: 사용자
	private String membStatusCd;// 회원상태코드 - 10:가입, 20:휴면, 99:탈퇴
	private String membId;		// 회원 ID
	private String membPwd;		// 회원 PWD
	private String membNm;		// 회원성명
	private String mobileNo;	// 휴대폰번호
	private String emailAddr;	// 이메일주소
	private String zipCd;		// 우편번호
	private String zipAddr;		// 우편번호주소
	private String detailAddr;	// 상세주소
	private String lastLoginDtm;// 최종 로그인 일시
	private MembMoney membMoney;// 회원 머니 entity
	
	
	public MemberDTO () {
		 
	}
	
	/* DTO -> Entity */
    public Member toEntity() {
    	Member member = Member.builder()
    			.membSn(membSn)
                .userRole(userRole)
                .membStatusCd(membStatusCd)
                .membId(membId)
                .membPwd(membPwd)
                .membNm(membNm)
                .mobileNo(mobileNo)
                .emailAddr(emailAddr)
                .zipCd(zipCd)
                .zipAddr(zipAddr)
                .detailAddr(detailAddr)
                .lastLoginDtm(lastLoginDtm)
//                .membMoney(membMoney.)
                .build();
        return member;
    }
    
//    public MembMoney toEntity() {
//        return MembMoney.builder()       
//       .member(member)  // 'id',
//       .moneySn(moneySn) //'pw',
//       .fs(frstRegistMembSn) //'유저카드이름',
//       .ls(lastRegistMembSn)  //'유저카드코드',
//       .fd(frstRegistDt)  //'유저카드코드',
//       .ld(lastRegistDt)  //'유저카드코드',
//       .uyn(useYn)  //'유저카드코드',
//       .build();
//    }

}
