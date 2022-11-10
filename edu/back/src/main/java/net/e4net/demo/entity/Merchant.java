package net.e4net.demo.entity;

import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@Table(name = "TB_MERCHANT")
@SequenceGenerator(
		name = "MERCHANT_SEQ_GENERATOR",
		sequenceName = "MERCHANT_SEQ",
		initialValue = 1,
		allocationSize = 1)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Merchant extends CommonData{
	
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "MERCHANT_SEQ_GENERATOR")
	@Column(name = "MERCHANT_SN", length = 10)
	private Long merchantSn;

	@OneToOne   // join 할 때 서로를 참조해야 하니까
//	@JoinColumn  :  외래키를 정의하는 어노테이션 
	@JoinColumn(name = "MEMB_SN", referencedColumnName = "MEMB_SN", updatable = false, insertable = false)
	private Member member;
	
	@Column(name = "MERCHANT_NM", length = 100, nullable = false)
	private String merchantNm;
	
	@Column(name = "MERCHANT_DESC", length = 4000)
	private String merchantDesc;
	
	@Column(name = "MERCHANT_URL", length = 100)
	private String merchantUrl;
	
	@Column(name = "TEL_NO", length = 20)
	private String telNo;
	
	@Column(name = "EMAIL_ADDR", length = 100)
	private String emailAddr;
	
	@Column(name = "ZIP_CD", length = 6)
	private String zipCd;
	
	@Column(name = "ZIP_ADDR", length = 150)
	private String zipAddr;
	
	@Column(name = "DETAIL_ADDR", length = 150)
	private String detailAddr;

	@Builder
	private Merchant(String useYn, Long frstRegistMembSn, Timestamp frstRegistDt, Long lastRegistMembSn,
			Timestamp lastRegistDt, Long merchantSn, Member member, String merchantNm, String merchantDesc,
			String merchantUrl, String telNo, String emailAddr, String zipCd, String zipAddr, String detailAddr) {
		super(useYn, frstRegistMembSn, frstRegistDt, lastRegistMembSn, lastRegistDt);
		this.merchantSn = merchantSn;
		this.member = member;
		this.merchantNm = merchantNm;
		this.merchantDesc = merchantDesc;
		this.merchantUrl = merchantUrl;
		this.telNo = telNo;
		this.emailAddr = emailAddr;
		this.zipCd = zipCd;
		this.zipAddr = zipAddr;
		this.detailAddr = detailAddr;
	}
	
	
	
	
	

}
