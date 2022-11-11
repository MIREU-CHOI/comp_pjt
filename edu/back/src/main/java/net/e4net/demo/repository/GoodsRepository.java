package net.e4net.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import net.e4net.demo.entity.Goods;

@Repository
public interface GoodsRepository extends JpaRepository<Goods, String> {
	
}
