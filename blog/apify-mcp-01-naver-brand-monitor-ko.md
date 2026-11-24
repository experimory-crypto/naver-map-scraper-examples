# 네이버 검색창을 두 번 열던 일, Claude에 한 문장으로 부탁하기

브랜드 이름을 블로그에서 검색하고, 카페에서 또 검색하고, 팀에 공유할 링크를 표에 붙입니다. 이 정도 일에 매번 코드를 짜고 싶진 않죠. Apify MCP를 쓰면 Claude에 검색 도구를 붙여서, 보고 싶은 키워드와 결과 형식을 채팅으로 정할 수 있습니다. 이번 글은 제가 만든 [Naver Blog, Cafe & News Search Scraper (네이버 블로그·카페)](https://apify.com/magenta_courser/naver-blog-cafe-search-scraper)를 예로 설명합니다.

## 연결하기 전에 결과부터 보기

아래 두 줄은 Apify에 공개된 과거 결과입니다. 서로 다른 날짜와 검색어에서 나왔고, 이 글을 위해 Claude에서 새로 수집한 결과는 아닙니다. 아래 실습은 Apify 연결 없이 할 수 있습니다. 이미 연결했다면 이 대화에서 **‘+’ → Connectors → Apify 끄기**를 선택하고 아래 블록을 붙여 보세요. [Claude 커넥터 안내](https://support.claude.com/en/articles/11175166-get-started-with-custom-connectors-using-remote-mcp)

```text
새 검색이나 Actor 실행은 하지 말고 아래 두 줄만 써줘.
게시일(한국시간), 출처, 검색어, 제목, 원문 링크를 표로 정리해줘.
수집 요약은 없으니 표 아래에 ‘수집 상태 확인 못 함’이라고 적어줘.

2026-10-01 | 블로그 | 제주 카페 | So what? We hot We young | https://blog.naver.com/mjmj4990/224428709437
2026-09-01 | 카페 | 올리브영 선크림 | 임산부 선크림 뭐 쓰세요? | https://cafe.naver.com/imsanbu/79951279
```

예상 결과는 고객사 주간 보고서에 복사할 수 있는 이런 표입니다. 아래는 입력을 옮겨 적은 예시이며, Claude 출력 캡처가 아닙니다.

| 게시일(한국시간) | 출처 | 검색어 | 제목·원문 |
| --- | --- | --- | --- |
| 2026-10-01 | 블로그 | 제주 카페 | [So what? We hot We young](https://blog.naver.com/mjmj4990/224428709437) |
| 2026-09-01 | 카페 | 올리브영 선크림 | [임산부 선크림 뭐 쓰세요?](https://cafe.naver.com/imsanbu/79951279) |

**수집 상태 확인 못 함.** 서로 다른 과거 검색에서 가져온 두 줄이므로, 이 표만으로 브랜드의 주간 언급 건수를 계산할 수 없습니다.

## 내 키워드로 바꾸기

[Claude의 사용자 지정 커넥터](https://support.claude.com/en/articles/11176164-use-connectors-to-extend-claude-s-capabilities)에 아래 주소를 추가하고 본인 Apify 계정으로 연결합니다. 주소에 토큰을 넣거나 채팅에 붙일 필요는 없습니다. 이 주소는 목록에 표시할 액터를 고르는 용도이며, 계정 권한 자체를 그 액터 하나로 제한한다는 뜻은 아닙니다. [Apify MCP 안내](https://docs.apify.com/mcp)

```text
https://mcp.apify.com?tools=magenta_courser/naver-blog-cafe-search-scraper
```

첫 요청은 작게 시작하는 게 좋습니다.

> 아직 실행하지 말고 설정만 보여줘. 오늘을 빼고 한국시간 기준 직전 7일의 시작일과 종료일을 먼저 적어줘. 그 기간에 네이버 블로그와 카페에서 ‘올리브영 선크림’을 검색하되, 최신순으로 출처마다 최대 5건만 보고 싶어. 본문은 열지 말고, 실행하면 게시일·출처·제목·링크를 표로 정리해줘. 게시일은 한국시간 기준으로 적되, `publishedAtPrecision`이 `week`나 `month`면 ‘대략’으로 표시해줘. 해당 주에 올라왔는지 불확실한 글은 별도로 모으고, 주간 확인 건수에는 넣지 마. 결과와 수집 요약을 따로 확인하고, 일부만 수집됐거나 상태를 모르면 표 아래 적어줘.

Claude가 돌려준 설정을 아래 형식과 비교해 보세요. 예를 들어 한국시간 11월 23일에 준비한다면 11월 16~22일입니다. 날짜는 예시이며 오늘 기준으로 바꿔야 합니다. 아래는 입력만 보여주는 것으로, 실행 결과가 아닙니다.

```json
{
  "keywords": [
    "올리브영 선크림"
  ],
  "sources": [
    "blog",
    "cafe"
  ],
  "sort": "recent",
  "dateFrom": "2026-11-16",
  "dateTo": "2026-11-22",
  "maxResultsPerKeyword": 5,
  "includeFullContent": false,
  "onlyNewSinceLastRun": false
}
```

출처별 5건은 내가 먼저 읽어볼 링크의 수입니다. 일주일 전체 언급 건수도, 비용 상한도 아닙니다. Claude Free에는 사용자 지정 커넥터 한 자리가 있고, [Apify Free](https://apify.com/pricing)는 카드 없이 월 $5 사용 크레딧을 제공합니다. 액터를 실행하면 사용량이 차감되므로, 먼저 남은 크레딧을 확인하세요. 실행 전에는 [액터 요금](https://apify.com/magenta_courser/naver-blog-cafe-search-scraper/pricing)과 적용되는 실행 한도를 확인하세요.

제가 써먹고 싶은 건 이런 겁니다. 회의 전에 열어볼 링크를 한 번에 모으고, 카페를 못 읽었으면 ‘언급 없음’ 대신 ‘카페 확인 못 함’으로 남기기. 우선 한 키워드로 링크 표를 만들어보고, 일주일 뒤에도 같은 표가 필요한 업무인지부터 살펴보면 됩니다.


### 도구를 실행했다면, 표 아래 한 줄까지 확인하기

결과 표에 블로그만 있다고 해서 카페 언급이 없었다고 결론 내리진 않습니다. 같은 실행의 `RUN_SUMMARY`에서 검색어와 출처별 `status`, `stopReason`, `returnedCount`를 따로 확인합니다. 정상 종료에 0건이면 ‘이번 조건에서 반환된 글 0건’, 일부만 수집했거나 비용 한도에서 멈췄다면 ‘일부만 확인’, 요약이 없거나 실패했다면 ‘확인 못 함’으로 적습니다. 5건을 받았다고 그 기간에 전체 5건뿐이라는 뜻도 아닙니다. [수집 요약 필드](https://apify.com/magenta_courser/naver-blog-cafe-search-scraper#what-you-get)

보고서에 붙일 문장도 어렵지 않습니다. 아래는 실제 수집이 아닌 표현 예시입니다. 카페 검색이 정상 종료됐는데 반환된 글이 0건이면 **‘카페: 이번 검색에서 반환 0건’**, 카페 수집이 실패했으면 **‘카페: 수집 실패로 확인 못 함’**, 일부만 받았다면 **‘카페: 일부만 확인’**입니다. 세 경우를 전부 ‘카페 언급 없음’으로 쓰지 않는 게 핵심입니다.
