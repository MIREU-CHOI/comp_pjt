package net.e4net.demo.entity;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum MembCls {
	
	USER("ROLE_USER"),
    ADMIN("ROLE_ADMIN"),
    SELLER("ROLE_SELLER")
    ;

    private final String value;

}
