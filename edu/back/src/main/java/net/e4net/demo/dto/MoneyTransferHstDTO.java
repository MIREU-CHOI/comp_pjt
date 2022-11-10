package net.e4net.demo.dto;

import lombok.Data;
import net.e4net.demo.entity.Member;

@Data
public class MoneyTransferHstDTO {
	private Long moneyTransferHstSn;
	private Member member;
	private String transferTyCd;
	private Long transferAmt;
	private String payMeanCd;
	private String payTranserNo;

}
