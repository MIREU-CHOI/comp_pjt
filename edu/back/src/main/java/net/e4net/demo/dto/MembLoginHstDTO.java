package net.e4net.demo.dto;

import lombok.Data;
import net.e4net.demo.entity.Member;

@Data
public class MembLoginHstDTO {

	private Long loginSn;
	private Member member;
	private String connectIp;

}
