package net.e4net.demo.dto;

import java.sql.Timestamp;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import net.e4net.demo.entity.MembCls;
import net.e4net.demo.entity.Member;
import net.e4net.demo.entity.Money;

@Data
@AllArgsConstructor
public class MoneyDTO {

	private Long moneySn;	// 회원머니 번호
	private Member member;	// 회원번호
	private Long moneyBlce;	// 머니잔고 
	private List<MoneyTransferHstDTO> transMoney;
	
	
	
	public MoneyDTO() {
	}



	@Builder
	public MoneyDTO(Long moneySn, Member member, Long moneyBlce) {
		super();
		this.moneySn = moneySn;
		this.member = member;
		this.moneyBlce = moneyBlce;
	}
	
//	public static MoneyDTO toDto(Money money) {
//		return MoneyDTO.builder()
//						.moneySn()
//					
//	}
	
	
	
	
}
