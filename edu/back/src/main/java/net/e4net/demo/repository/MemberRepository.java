package net.e4net.demo.repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import net.e4net.demo.dto.MemberDTO;
import net.e4net.demo.entity.Member;

// https://velog.io/@juno0713/Spring-Security-JWT-React-w3wpg5yi
// public interface MemberRepository extends JpaRepository<Member, Long>{
@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {

	Optional<Member> findByMembId(String membId);
//	Member findByMembId(String membId);
	
	@Query(value = "select * from tb_memb where email_addr like '%' || :email || '%'", nativeQuery = true)
    List<Member> findByEmail(@Param("email") String email);
	
	@Query(value = "select * from tb_memb where memb_nm like '%' || :name || '%'" , nativeQuery = true)
	List<Member> findByName(@Param("name") String name);

	boolean existsByMembId(String membId);
	
	boolean existsByMobileNo(String mobileNo);

//	Member findOne(Long membId); // 이게 맞나..?

	// db 연동하는 코드 ... JPA 나중에 =======================
//	static public ArrayList<MemberDTO> members;
//	
//	static {
//		members = new ArrayList<>();
//		members.add(new MemberDTO());
//	}
//	
//	public MemberDTO insertMember(MemberDTO member) {
//		members.add(member);
//		return member;
//	}
//	
//	public List<MemberDTO> getAllMembers(){
//		return members;
//	}
//	
//	public MemberDTO getMemberByMemId(String membId) {
//		return members.stream()
//				.filter(memberDTO -> memberDTO.getMembId().equals(membId))
//				.findAny()
//				.orElse(new MemberDTO());
//	}
//	public void updateMembPwd(String membId, MemberDTO member) {
//		members.stream()
//		.filter(memberDTO -> memberDTO.getMembId().equals(membId))
//		.findAny()
//		.orElse(new MemberDTO())
//		.setMembPwd(member.getMembPwd());
//	}
//	
//	public void deleteMember(String membId) {
//		members.removeIf(memberDTO -> memberDTO.getMembId().equals(membId));
//	}

}
