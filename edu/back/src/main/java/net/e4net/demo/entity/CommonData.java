package net.e4net.demo.entity;

import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.EntityListeners;
import javax.persistence.MappedSuperclass;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
@NoArgsConstructor
public abstract class CommonData {
	
	@Column(name = "USE_YN")
	private String useYn;

	@Column(name = "FRST_REGIST_MEMB_SN", length = 10)
	private Long frstRegistMembSn;
	
	@CreatedDate
	@Column(name = "FRST_REGIST_DT", updatable = false, nullable = false)
	private Timestamp frstRegistDt;
	
	@Column(name = "LAST_REGIST_MEMB_SN", length = 10)
	private Long lastRegistMembSn; 		// updatable = true, nullable = true 얘네는 true 기본이라 안써도 됨
	
	@LastModifiedDate
	@Column(name = "LAST_CHANGE_DT", updatable = true, nullable = true)
	private Timestamp lastRegistDt; 
	
//	protected CommonData(Long frstRegistMembSn, Long lastRegistMembSn) {
//		this.frstRegistMembSn = frstRegistMembSn;
//		this.lastRegistMembSn = lastRegistMembSn;
//	}

	protected CommonData(String useYn, Long frstRegistMembSn, Timestamp frstRegistDt, Long lastRegistMembSn,
			Timestamp lastRegistDt) {
		this.useYn = useYn;
		this.frstRegistMembSn = frstRegistMembSn;
		this.frstRegistDt = frstRegistDt;
		this.lastRegistMembSn = lastRegistMembSn;
		this.lastRegistDt = lastRegistDt;
	}
	
	
}
