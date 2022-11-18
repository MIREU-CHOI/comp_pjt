package net.e4net.demo.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import net.e4net.demo.entity.Goods;
import net.e4net.demo.entity.Merchant;

@Repository
public interface GoodsRepository extends JpaRepository<Goods, String> {
	List<Goods> findByMerchantMerchantSn(String merchantSn);
	//	List <Goods> findByMerchantSn(Long merchantSn); // id로 Member 찾는 로직
	
}
