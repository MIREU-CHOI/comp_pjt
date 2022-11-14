package net.e4net.demo.service;

import javax.transaction.Transactional;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.e4net.demo.dto.MembMoneyDTO;
import net.e4net.demo.dto.MemberDTO;
import net.e4net.demo.dto.MemberDTO;
import net.e4net.demo.dto.TokenDTO;
import net.e4net.demo.entity.MembMoney;
import net.e4net.demo.entity.Member;
import net.e4net.demo.jwt.TokenProvider;
import net.e4net.demo.repository.MemberRepository;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class AuthService {
	private final AuthenticationManagerBuilder managerBuilder;
    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final TokenProvider tokenProvider;

    public MemberDTO signup(MemberDTO requestDto) {
    	log.info("AuthService Layer :: Call signup Method!");
        if (memberRepository.existsByMembId(requestDto.getMembId())) {
            throw new RuntimeException("이미 가입되어 있는 유저입니다");
        }
        System.out.println("가입하자!");
        Member member = requestDto.toEntity(passwordEncoder);
        MemberDTO dto = MemberDTO.toDto(memberRepository.save(member));
        MembMoney.createMembMoney(member);
        
        return dto;
    }

    public TokenDTO login(MemberDTO requestDto) {
    	log.info("AuthService Layer :: Call login Method!");
        UsernamePasswordAuthenticationToken authenticationToken = requestDto.toAuthentication();

        Authentication authentication = managerBuilder.getObject().authenticate(authenticationToken);

        return tokenProvider.generateTokenDto(authentication);
    }

}
