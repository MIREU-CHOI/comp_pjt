package net.e4net.demo.entity;

import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@Table(name = "TB_MONEY_TRANSFER_HST")
@SequenceGenerator(
		name = "TRANSFER_HST_SEQ_GENERATOR",
		sequenceName = "TRANSFER_HST_SEQ", 
		initialValue = 1,
		allocationSize = 1)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class MoneyTransferHst extends CommonData{

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "TRANSFER_HST_SEQ_GENERATOR")
	@Column(name = "MONEY_TRANSFER_HST_SN", length = 10)
	private Long moneyTransferHstSn;
	
	@ManyToOne
	@JoinColumn(name = "MEMB_SN", referencedColumnName = "MEMB_SN", updatable = false, insertable = false)
	private Member member;
	
	@Column(name = "TRANSFER_TY_CD", length = 1, nullable = false)
	private String transferTyCd;
	
	@Column(name = "TRANSFER_AMT", length = 15, nullable = false)
	private Long transferAmt;
	
	@Column(name = "PAY_MEAN_CD", length = 2)
	private String payMeanCd;
	
	@Column(name = "PAY_TRANSFER_NO", length = 20)
	private String payTranserNo;

	@Builder
	private MoneyTransferHst(String useYn, Long frstRegistMembSn, Timestamp frstRegistDt, Long lastRegistMembSn,
			Timestamp lastRegistDt, Long moneyTransferHstSn, Member member, String transferTyCd, Long transferAmt,
			String payMeanCd, String payTranserNo) {
		super(useYn, frstRegistMembSn, frstRegistDt, lastRegistMembSn, lastRegistDt);
		this.moneyTransferHstSn = moneyTransferHstSn;
		this.member = member;
		this.transferTyCd = transferTyCd;
		this.transferAmt = transferAmt;
		this.payMeanCd = payMeanCd;
		this.payTranserNo = payTranserNo;
	}
	
	
}
