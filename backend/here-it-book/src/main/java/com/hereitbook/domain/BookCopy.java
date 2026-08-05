package com.hereitbook.domain;

import com.hereitbook.domain.enums.CopyStatus;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "book_copy")
@Getter
@NoArgsConstructor
public class BookCopy {

    @Id
    private Long rfidId;

    @Column(nullable = false)
    private String rfid;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private CopyStatus status;

    private Long bookId;

    private Long shelfId;
}