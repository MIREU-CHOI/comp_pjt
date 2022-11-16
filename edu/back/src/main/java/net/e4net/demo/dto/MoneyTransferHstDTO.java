package net.e4net.demo.dto;

import lombok.Builder;
import lombok.Data;
import net.e4net.demo.entity.Member;

@Data
public class MoneyTransferHstDTO {
	private Long moneyTransferHstSn;// 머니거래이력일련번호
	private Member member;			// 회원번호
	private String transferTyCd;	// 거래종류코드 (01:충전, 02:사용, 03:환전)
	private Long transferAmt;		// 거래금액
	private String payMeanCd;		// 결제수단코드 - 충전 : 01:카드, 02:계좌이체, 03: 머니사용
	private String payTranserNo;	// 결제거래번호
	
	
	@Builder
	public MoneyTransferHstDTO(Long moneyTransferHstSn, Member member, String transferTyCd, Long transferAmt,
			String payMeanCd, String payTranserNo) {
		super();
		this.moneyTransferHstSn = moneyTransferHstSn;
		this.member = member;
		this.transferTyCd = transferTyCd;
		this.transferAmt = transferAmt;
		this.payMeanCd = payMeanCd;
		this.payTranserNo = payTranserNo;
	}

	
	public MoneyTransferHstDTO() {
		
	}
	
}
