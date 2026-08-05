package com.hereitbook.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "shelf")
@Getter
@NoArgsConstructor
public class Shelf {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long shelfId;

    @Column(length = 20)
    private String name;

    @Column(length = 10)
    private String floor;

    @Column(length = 10)
    private String section;

    private String mapUrl;
}