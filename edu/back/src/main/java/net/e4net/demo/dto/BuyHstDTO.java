package net.e4net.demo.dto;

import lombok.Data;
import net.e4net.demo.entity.Member;

@Data
public class BuyHstDTO {

	private Long buyHstSn;
	private Member member;
	private String goodsNo;
	private Long goodsAmt;
	private Long buyQtt;
	private Long buyAmt;

}
