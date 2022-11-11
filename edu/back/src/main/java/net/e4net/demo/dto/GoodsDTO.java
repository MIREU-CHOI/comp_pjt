package net.e4net.demo.dto;

import lombok.Data;
import net.e4net.demo.entity.Merchant;

@Data
public class GoodsDTO {

	private String goodsNo;		// 상품번호
	private Merchant merchant;	// 가맹점번호
	private String goodsNm;		// 상품명
	private String goodsModelNo;// 상품모델번호
	private Long goodsAmt;		// 상품 금액
	private Long goodsQtt;		// 상품 수량
	private Long goodsSellQtt;	// 판매 수량
	private String goodsClsDt;	// 판매종료일자
	private String goodsShppCost;// 배송비용
	private String realFileNm;	// 실제파일명
	private String goodsImgPath;// 상품이미지 경로
	private String goodsDesc;	// 상품 설명

}
