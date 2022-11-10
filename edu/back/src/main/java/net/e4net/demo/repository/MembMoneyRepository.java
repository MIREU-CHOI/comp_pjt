package net.e4net.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import net.e4net.demo.entity.MembMoney;
import net.e4net.demo.entity.Member;

@Repository
public interface MembMoneyRepository extends JpaRepository<MembMoney, Long>{

}
