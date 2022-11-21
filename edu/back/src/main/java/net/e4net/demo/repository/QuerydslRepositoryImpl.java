package net.e4net.demo.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.stereotype.Repository;

import com.querydsl.jpa.impl.JPAQueryFactory;

import lombok.RequiredArgsConstructor;
import net.e4net.demo.entity.Member;
import net.e4net.demo.entity.MoneyTransferHst;
import net.e4net.demo.entity.QBuyHst;
import net.e4net.demo.entity.QGoods;
import net.e4net.demo.entity.QMember;
import net.e4net.demo.entity.QMerchant;
import net.e4net.demo.entity.QMoneyTransferHst;

@Repository
@RequiredArgsConstructor
public class QuerydslRepositoryImpl implements QuerydslRepositoryCustom{

	private final JPAQueryFactory queryFactory;
	private final QMoneyTransferHst mth = QMoneyTransferHst.moneyTransferHst;
	private final QBuyHst buyHst = QBuyHst.buyHst;
	private final QGoods goods = QGoods.goods;
	private final QMerchant merchant = QMerchant.merchant;
	
	private final QMember memb = QMember.member;
	
	@Override
	public List<MoneyTransferHst> findByMoneyTransferHst(Long membSn) {
		return queryFactory.selectFrom(mth)
				.leftJoin(buyHst.buyHst, buyHst)
				.fetchJoin()
				.leftJoin(goods.goods, goods)
				.fetchJoin()
				.leftJoin(merchant.merchant, merchant)
				.fetchJoin()
				.where(
						mth.member.membSn
						.eq(membSn))
				.fetch();
	}

}
