package net.e4net.demo.dto;

import lombok.Data;
import net.e4net.demo.entity.Member;

@Data
public class MerchantDTO {

	private Long merchantSn;	// 가맹점번호
	private Member member;		// 회원번호
	private String merchantNm;	// 가맹점명
	private String merchantDesc;// 가맹점 설명
	private String merchantUrl;	// 홈페이지URL
	private String telNo;		// 전화번호
	private String emailAddr;	// 이메일주소
	private String zipCd;		// 우편번호
	private String zipAddr;		// 우편번호주소
	private String detailAddr;	// 상세주소

}
