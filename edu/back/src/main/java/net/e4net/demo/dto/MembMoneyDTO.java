package net.e4net.demo.dto;

import lombok.Data;
import net.e4net.demo.entity.Member;

@Data
public class MembMoneyDTO {

	private Long moneySn;
	private Member member;
	private Long moneyBlce;
	
}
