package net.e4net.demo.dto;

import java.util.List;

import lombok.Builder;
import lombok.Data;
import net.e4net.demo.entity.Member;

@Data
public class MoneyDTO {

	private Long moneySn;	// 회원머니 번호
	private Member member;	// 회원번호
	private Long moneyBlce;	// 머니잔고 
	private List<MoneyTransferHstDTO> transMoney;
	
	
	@Builder
	public MoneyDTO(Long moneySn, Member member, Long moneyBlce) {
		super();
		this.moneySn = moneySn;
		this.member = member;
		this.moneyBlce = moneyBlce;
	}
	
	
	
	
}
