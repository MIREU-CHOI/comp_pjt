package net.e4net.demo.repository;

import java.util.List;

import net.e4net.demo.entity.Member;
import net.e4net.demo.entity.MoneyTransferHst;

public interface QuerydslRepositoryCustom {

	List<MoneyTransferHst> findByMoneyTransferHst(Long membSn);
}
