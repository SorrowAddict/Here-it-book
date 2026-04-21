# API Spec — Here-it-book

## 1. 도서 검색 API

### Endpoint

`GET /api/v1/book/search?start={start}&query={query}&display={display}`

### Query Parameters

- `query`: `string`
  - 검색어
- `display`: `integer`
  - 한 번에 표시할 검색 결과 개수
  - 기본값: `10`
  - 최댓값: `100`
- `start`: `integer`
  - 검색 시작 위치
  - 기본값: `1`
  - 최댓값: `1000`
- `sort`: `string`
  - 검색 결과 정렬 방법
  - `sim`: 정확도순 내림차순 정렬 (기본값)
  - `date`: 출간일순 내림차순 정렬

### Success Response Shape

```json
{
  "lastBuildDate": "Fri, 13 Mar 2026 09:53:45 +0900",
  "total": 577,
  "start": 1,
  "display": 10,
  "items": [
    {
      "title": "해리 포터와 마법사의 돌 1",
      "image": "https://shopping-phinf.pstatic.net/main_5118281/51182815714.20241105090357.jpg",
      "author": "조앤 K. 롤링",
      "publisher": "문학수첩",
      "pubdate": "20241120",
      "isbn": "9791193790403",
      "description": "해리 포터 세대의, 해리 포터 세대를 위한, 해리 포터 세대에 의한 새 번역!\n‘21세기 대표 아이콘’에 걸맞은 완성도 높은 작품으로 재탄생하다!",
      "total_cnt": 3,
      "borrowed_cnt": 1,
      "available": 2
    }
  ]
}
```

### Response Fields

- lastBuildDate
- total
- start
- display
- items

### Item Fields

- title
- image
- author
- publisher
- pubdate
- isbn
- description
- total_cnt
- borrowed_cnt
- available

### Notes

- 검색 결과는 목록용 요약 데이터입니다.
- available는 의미상 total_cnt - borrowed_cnt와 일관되어야 합니다.
- pubdate는 YYYYMMDD 문자열입니다.

## 2. 도서 상세 조회 API

### Endpoint

`GET /api/v1/book/search_adv?d_isbn={d_isbn}`

### Query Parameters

- `query`: `string`
  - 검색어
- `display`: `integer`
  - 한 번에 표시할 검색 결과 개수
  - 기본값: `10`
  - 최댓값: `100`
- `start`: `integer`
  - 검색 시작 위치
  - 기본값: `1`
  - 최댓값: `1000`
- `sort`: `string`
  - 검색 결과 정렬 방법
  - `sim`: 정확도순 내림차순 정렬 (기본값)
  - `date`: 출간일순 내림차순 정렬

- `d_isbn`: `string`
  - 조회할 도서의 ISBN

### Success Response Shape

```json
{
  "title": "해리 포터와 마법사의 돌 1",
  "image": "https://shopping-phinf.pstatic.net/main_5118281/51182815714.20241105090357.jpg",
  "author": "조앤 K. 롤링",
  "publisher": "문학수첩",
  "pubdate": "20241120",
  "isbn": "9791193790403",
  "description": "해리 포터 세대의, 해리 포터 세대를 위한, 해리 포터 세대에 의한 새 번역!\n‘21세기 대표 아이콘’에 걸맞은 완성도 높은 작품으로 재탄생하다!",
  "total_cnt": 3,
  "borrowed_cnt": 1,
  "available": 2,
  "section": "P2",
  "floor": 3,
  "direction": "left",
  "map_url": "{link}",
  "created_at": "{DATE}",
  "updated_at": "{DATE}"
}
```

### Response Fields

- title
- image
- author
- publisher
- pubdate
- isbn
- description
- total_cnt
- borrowed_cnt
- available
- section
- floor
- direction
- map_url
- created_at
- updated_at

### Notes

- 상세 조회는 검색 결과보다 많은 정보를 포함합니다.
- 위치 표시는 UI에서 section-floor-direction 형식으로 조합합니다.
- section, floor, direction은 서버에서 개별 필드로 내려옵니다.

## 3. 도서 LED 제어 API

### Endpoint

`POST /api/v1/book/{isbn}/led`

### Path Parameters

- `isbn`: `string`
  - LED를 제어할 도서 ISBN

### Request Body

```json
{
  "state": "ON"
}
```

### Body Fields

- `state`: `"ON"` | `"OFF"`

### Success Response Shape

```json
{
  "isbn": "9832973219",
  "state": "ON",
  "color": "Red",
  "updatedAt": "2026-03-13T10:20:30Z"
}
```

### Response Fields

- isbn
- state
- color
- updatedAt

### Notes

- state가 OFF이면 color는 None
- state가 ON이면 color는 RGB 3원색 중 하나
- 이 API는 명령형 제어 API입니다.
- 자동 소등 감지용 별도 API는 현재 명세에 포함되어 있지 않습니다.

## 4. 구현 시 주의사항

- 검색 API와 상세 API의 응답 구조를 혼동하지 않습니다.
- 존재하지 않는 필드를 추측으로 추가하지 않습니다.
- 자동 소등을 위해 별도 API 엔드포인트를 임의로 만들지 않습니다.
- MSW mock도 이 문서의 응답 구조를 기준으로 작성합니다.
