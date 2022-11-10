package net.e4net.demo.dto;

import lombok.Data;
import net.e4net.demo.entity.Member;

@Data
public class MerchantDTO {

	private Long merchantSn;
	private Member member;
	private String merchantNm;
	private String merchantDesc;
	private String merchantUrl;
	private String telNo;
	private String emailAddr;
	private String zipCd;
	private String zipAddr;
	private String detailAddr;

}
