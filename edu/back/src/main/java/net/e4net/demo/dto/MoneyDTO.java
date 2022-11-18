package net.e4net.demo.dto;

import java.sql.Timestamp;
import java.util.List;

import org.springframework.security.crypto.password.PasswordEncoder;

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
	
	// 기록용 (안 씀) 
	private List<MoneyTransferHstDTO> transMoney;
	private Long membSn;	
	// 나는 member로 쓸거지만 만약 membSn을 선언해서 사용한다면 아래 toEntity 만든것처럼 하면 될듯?
	
	
	public MoneyDTO() {
	}

	@Builder
	public MoneyDTO(Long moneySn, Member member, Long moneyBlce) {
		super();
		this.moneySn = moneySn;
		this.member = member;
		this.moneyBlce = moneyBlce;
	}
	
	/* DTO -> Entity */ // 기록용 (안 씀) 
	public Money toEntity(PasswordEncoder passwordEncoder) {
		Money money = Money.builder()
				.member(member.builder().membSn(membSn).build())
//    			.membSn(membSn)
				.build();
		return money;
	}
	
//	public static MoneyDTO toDto(Money money) {
//		return MoneyDTO.builder()
//						.moneySn()
//					
//	}
	
	
	
	
}
