package net.e4net.demo.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.e4net.demo.dto.MemberDTO;
import net.e4net.demo.dto.MemberDTO;
import net.e4net.demo.dto.TokenDTO;
import net.e4net.demo.service.AuthService;

@RestController
//@RequestMapping("/auth")
@RequiredArgsConstructor
@Slf4j
public class AuthController {

	private final AuthService authService;

    @PostMapping("/auth/signup")
    public ResponseEntity<MemberDTO> signup(@RequestBody MemberDTO requestDto) {
		log.info("AuthController Layer :: Call signup Method!");
        return ResponseEntity.ok(authService.signup(requestDto));
    }

    @PostMapping("/auth/login")
    public ResponseEntity<TokenDTO> login(@RequestBody MemberDTO requestDto) {
    	log.info("AuthController Layer :: Call login Method!");
        return ResponseEntity.ok(authService.login(requestDto));
    }
}





