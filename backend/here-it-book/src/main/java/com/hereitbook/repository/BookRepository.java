package com.hereitbook.repository;

import com.hereitbook.domain.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository // 이 인터페이스가 DB와 소통하는 통로임을 알려줍니다
public interface BookRepository extends JpaRepository<Book, Long> {
    // 텅 비어있어도 됩니다!
    // JpaRepository를 상속(extends)받는 것만으로도
    // 기본적으로 '저장, 수정, 삭제, 전체 조회' 기능을 공짜로 얻게 돼요.
}