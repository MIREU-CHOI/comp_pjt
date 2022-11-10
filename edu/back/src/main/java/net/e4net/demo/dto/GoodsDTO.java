package net.e4net.demo.dto;

import lombok.Data;
import net.e4net.demo.entity.Merchant;

@Data
public class GoodsDTO {

	private String goodsNo;
	private Merchant merchant;
	private String goodsNm;
	private String goodsModelNo;
	private Long goodsAmt;
	private Long goodsQtt;
	private Long goodsSellQtt;
	private String goodsClsDt;
	private String goodsShppCost;
	private String realFileNm;
	private String goodsImgPath;
	private String goodsDesc;

}
