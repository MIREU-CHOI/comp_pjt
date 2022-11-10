package net.e4net.demo.entity;

import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@Table(name = "TB_BUY_HST")
@SequenceGenerator(
		name = "BUY_HST_SEQ_GENERATOR",
		sequenceName = "BUY_HST_SEQ",
		initialValue = 1,
		allocationSize = 1)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class BuyHst extends CommonData{
	
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "BUY_HST_SEQ_GENERATOR")
	@Column(name = "BUY_HST_SN", length = 10)
	private Long buyHstSn;

	@ManyToOne
	@JoinColumn(name = "MEMB_SN", referencedColumnName = "MEMB_SN", updatable = false, insertable = false)
	private Member member;
	
	// tb_goods 테이블 컬럼 조인해야 됨!!
	@Column(name = "GOODS_NO", length = 15, nullable = false)
	private String goodsNo;
	
	@Column(name = "GOODS_AMT", length = 15)
	private Long goodsAmt;
	
	@Column(name = "BUY_QTT", length = 8)
	private Long buyQtt;
	
	@Column(name = "BUY_AMT", length = 15)
	private Long buyAmt;

	@Builder
	private BuyHst(String useYn, Long frstRegistMembSn, Timestamp frstRegistDt, Long lastRegistMembSn,
			Timestamp lastRegistDt, Long buyHstSn, Member member, String goodsNo, Long goodsAmt, Long buyQtt,
			Long buyAmt) {
		super(useYn, frstRegistMembSn, frstRegistDt, lastRegistMembSn, lastRegistDt);
		this.buyHstSn = buyHstSn;
		this.member = member;
		this.goodsNo = goodsNo;
		this.goodsAmt = goodsAmt;
		this.buyQtt = buyQtt;
		this.buyAmt = buyAmt;
	}
	
	
	
	
	
	
}
