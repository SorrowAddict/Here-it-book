package com.hereitbook.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity // 이 클래스는 DB 테이블과 1:1로 매핑된다는 뜻이에요
@Getter // 롬복이 자동으로 getter 메서드를 만들어줍니다
@NoArgsConstructor // 파라미터가 없는 기본 생성자를 만들어줍니다
public class Book {

    @Id // PK (Primary Key)임을 알려줍니다
    @GeneratedValue(strategy = GenerationType.IDENTITY) // AI (Auto Increment) 설정이에요
    private Long bookId;

    @Column(nullable = false) // NOT NULL 설정
    private String title;

    private String image;

    @Column(nullable = false)
    private String author;

    private String publisher;

    @Column(nullable = false)
    private LocalDate pubdate; // DB의 DATE 타입과 매핑돼요

    private String isbn;

    @Column(columnDefinition = "TEXT") // 긴 글을 위한 TEXT 타입 설정
    private String description;

    @Column(columnDefinition = "int default 0")
    private Integer totalCnt;

    @Column(columnDefinition = "int default 0")
    private Integer borrowedCnt;

    @Column(columnDefinition = "int default 0")
    private Integer availableCnt;
}