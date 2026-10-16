<!--
Phrasebook 작성 규칙: entry 하나 = man page 하나
scripts/build_phrasebook.py 가 이 파일을 읽어서 site/generated/phrasebook.bundle.js 를 만들어.

  # N. “하고 싶은 말” — Function Label     기능 section. N = man section 번호
  ## headword                               entry. anchor = 소문자-하이픈 (form the basis for → form-the-basis-for)
  ### NAME                                  headword — 뜻
                                            이름이 여러 개면 한 줄씩 (첫 줄이 대표, 나머지는 alias로 링크도 됨)
  ### DESCRIPTION                           academic writing에서 왜 유용한지
  ### EXAMPLES                              - 예문 (핵심 표현은 **굵게**)
  ### SEE ALSO                              - **같은 계열 frame** 목록
                                            그 아래 한 줄: represent(1), shape(2), ground
                                            번호는 빼거나 틀려도 빌드가 실제 section 번호로 채워.
                                            아직 없는 entry는 회색 planned로 표시돼.
  ### CAVEATS                               한국어와의 차이, 비슷한 표현끼리 강도 차이, 과장 경고
  그 밖의 ### 소제목                          이름 그대로 man section이 돼

맨 위 ### NAME / ### DESCRIPTION 은 페이지 첫 phrasebook(7) 블록이야.
새 entry 틀: content/templates/phrasebook-entry.md

빌드:   python3 scripts/build_phrasebook.py
확인:   python3 scripts/build_phrasebook.py --check
-->

### NAME
phrasebook — 한국어로 하고 싶은 말에서 출발해서 찾는 academic English 회화집

### DESCRIPTION
논문 읽다가 주운 표현을 하고 싶은 말 기준으로 묶었어. 표현마다 뜻, 예문, 같이 익혀둘 표현, 그리고 한국어 화자가 헷갈리기 쉬운 뉘앙스를 정리했어.

# 1. “이것이 중요한 부분이다” — Contribution / Importance

## constitute

### NAME
constitute — ~을 구성하다 / ~에 해당하다

### DESCRIPTION
`be`보다 academic writing에서 더 좋은 이유는, 단순히 “X is important”라고 평가하는 데서 끝나지 않고 **X가 더 큰 개념이나 구조 안에서 어떤 구성적 위치를 차지하는지** 보여주기 때문이야.

### EXAMPLES
- X **constitutes an important part of** the chapter's stated contribution.
- Peer interaction **constitutes a central component of** collaborative mathematical sensemaking.
- These practices **constitute an important dimension of** students' mathematical reasoning.
- Teacher noticing **constitutes a critical part of** responsive instructional decision-making.
- Multimodal interaction **constitutes one dimension of** students' embodied mathematical activity.

### SEE ALSO
- **constitute a central component of**
- **constitute a key dimension of**
- **constitute an important aspect of**
- **constitute a major contribution to**

represent(1), form-the-basis-for(1), be-central-to(1)

### CAVEATS
`X is important to Y`는 그냥 중요성을 말해.

`X constitutes a central component of Y`는  
**“Y가 성립하는 구조 안에 X가 실제로 들어가 있다”**는 느낌이 더 강해.

한국어로는 둘 다 “X는 Y에 중요하다”라고 번역될 수 있는데, 영어에서는 후자가 훨씬 구조적인 관계를 표현해.

---

## represent

### NAME
represent — ~에 해당하다 / ~을 나타내다 / ~로 볼 수 있다

### DESCRIPTION
academic writing에서 `represent`는 단순히 “대표하다”만 의미하지 않아.  
**어떤 현상이나 결과를 특정 범주, 의미, 기여로 해석할 때** 굉장히 자주 써.

### EXAMPLES
- This finding **represents an important contribution to** the literature on AI-supported collaboration.
- These interactions **represent a distinct form of** collaborative mathematical reasoning.
- The observed pattern **represents a shift from** individual problem solving toward shared sensemaking.
- This tension **represents a broader challenge for** AI-supported learning environments.

### SEE ALSO
- **represent an important contribution to**
- **represent a distinct form of**
- **represent a shift toward**
- **represent a challenge for**
- **represent an example of**

constitute(1), illustrate, reflect

### CAVEATS
`represent`는 `constitute`보다 **해석적인 느낌**이 조금 더 있어.

- `X constitutes a component of Y`
    - 구조적으로 Y의 일부라는 느낌
- `X represents a form of Y`
    - X를 Y라는 관점에서 **해석하거나 분류**하는 느낌

---

## form the basis for

### NAME
form the basis for — ~의 기반을 이루다

### DESCRIPTION
이 표현은 “important”보다 훨씬 구체적이야.  
**어떤 개념, 데이터, 이론, 분석이 다음 단계의 토대가 된다**는 논리적 관계를 보여줘.

### EXAMPLES
- These observations **form the basis for** the subsequent analysis.
- The theoretical framework **forms the basis for** our interpretation of collaborative interactions.
- Students' interaction traces **form the basis for** the teacher-facing analytics.
- This distinction **forms the basis for** our argument about productive AI support.

### SEE ALSO
- **serve as the basis for**
- **provide the basis for**
- **lay the foundation for**
- **serve as a foundation for**

provide-a-basis-for, ground, build-on

### CAVEATS
한국어에서는 “기반이 된다”라고 쉽게 쓰는데, 영어에서는 무엇이 무엇의 기반인지 **논리적 순서가 분명할 때** 쓰는 게 좋아.

예를 들어:

> Peer interaction forms the basis for learning.

이렇게 쓰면 너무 광범위할 수 있음.

하지만:

> The coded interaction patterns form the basis for the ENA comparison.

이건 관계가 명확해서 자연스러워.

---

## be central to

### NAME
be central to — ~에 핵심적이다

### DESCRIPTION
`important`보다 강하지만, `constitute`처럼 구조를 설명하지는 않아.  
**핵심성 자체를 강조하고 싶을 때** 가장 간단하게 쓸 수 있어.

### EXAMPLES
- Peer discourse **is central to** collaborative mathematical sensemaking.
- Student agency **is central to** the design of the learning environment.
- Interpretation of representations **is central to** students' algebraic reasoning.
- Social interaction **is central to** sociocultural accounts of learning.

### SEE ALSO
- **be critical to**
- **be integral to**
- **play a central role in**
- **be fundamental to**

constitute(1), play-a-central-role-in

### CAVEATS
`central to`는 한국어의 “중요하다”보다 **중심축이다**에 가까워.

그래서 아무 데나 쓰면 과장처럼 들릴 수 있어.

- `important to` = 중요함
- `central to` = 핵심 축
- `fundamental to` = 근본적 기반
- `integral to` = 빠질 수 없는 구성 요소

# 2. “이 선택이 해석에 영향을 준다” — Consequence / Relevance

## consequential for

### NAME
consequential for — ~에 중요한 결과를 갖는 / ~에 영향을 미치는

### DESCRIPTION
일상 영어에서 `consequential`은 조금 무겁게 들릴 수 있지만, academic writing에서는 **어떤 선택이나 차이가 이후 해석, 설계, 결과에 중요하게 작용한다**는 뜻으로 유용해.

### EXAMPLES
- Dyad composition is **consequential for** how the findings are interpreted.
- This distinction is **consequential for** both the study design and the subsequent comparison.
- The choice of unit of analysis is **consequential for** the interpretation of the network patterns.
- How prior mathematics experience is defined is **consequential for** the comparison across dyads.

### SEE ALSO
- **have important implications for**
- **shape how X is interpreted**
- **affect the interpretation of**
- **bear on**
- **matter for**

have-implications-for(2), shape(2), affect

### CAVEATS
한국어의 “영향을 준다”를 무조건 `affect`로 번역하면 좀 단조로워져.

- `affect` = 실제로 영향을 미침
- `shape` = 방향이나 형태를 형성함
- `have implications for` = 어떤 함의를 가짐
- `be consequential for` = 결과적으로 중요함

`consequential`은 특히 **methodological choice → interpretation** 관계에서 좋음.

---

## have implications for

### NAME
have implications for — ~에 함의를 갖다 / ~에 중요한 의미가 있다

### DESCRIPTION
academic writing의 대표 표현 중 하나야.  
무언가가 단순히 영향을 주는 게 아니라, **다른 문제를 어떻게 이해하거나 설계해야 하는지에 의미를 가진다**는 뜻.

### EXAMPLES
- These findings **have implications for** the design of AI-supported learning environments.
- This distinction **has implications for** how collaboration is conceptualized.
- The sampling strategy **has implications for** the interpretation of the findings.
- These patterns **have important implications for** future research on AI-mediated collaboration.

### SEE ALSO
- **carry implications for**
- **have methodological implications for**
- **have theoretical implications for**
- **have practical implications for**

consequential-for(2), inform, suggest-directions-for

### CAVEATS
한국어에서 “implication”을 너무 쉽게 “시사점”이라고 번역하는데, 실제 영어에서는 더 넓어.

`have implications for X`는 꼭 Discussion의 “Implications” section에서만 쓰는 게 아니고,

> 이 선택 때문에 X를 이렇게 봐야 한다

라는 논리 관계도 표현할 수 있어.

---

## shape

### NAME
shape — ~을 형성하다 / ~의 방향을 만들어내다

### DESCRIPTION
academic writing에서 굉장히 좋은 동사야.  
단순한 causation보다 약하고, **과정이나 맥락이 어떤 현상의 형태를 만들어가는 것**을 표현할 때 적합해.

### EXAMPLES
- Prior mathematical experience may **shape** how students interact with genAI.
- Classroom norms **shape** students' participation in collaborative problem solving.
- These design choices **shape** how learners engage with the system.
- Social positioning may **shape** who takes responsibility for mathematical reasoning.

### SEE ALSO
- **shape how X**
- **shape the development of X**
- **shape patterns of X**
- **shape the ways in which X**

mediate, influence, structure

### CAVEATS
`cause`보다 훨씬 안전해.

- `cause` = 직접적인 원인
- `influence` = 영향을 줌
- `shape` = 여러 요인 중 하나로서 형태나 방향을 만들어감

Learning Sciences에서는 특히 `shape`가 잘 맞아.

# 3. “상호작용 속에서 역할이나 권한이 만들어진다” — Negotiation / Interaction

## negotiate

### NAME
negotiate — 협상하다 / 조정하다 / 상호작용을 통해 구성하다

### DESCRIPTION
academic writing에서 `negotiate`는 한국어의 “협상”보다 훨씬 넓어.  
특히 sociocultural, discourse, identity 연구에서는 **roles, authority, meaning, responsibility가 상호작용 속에서 정해지고 조정되는 과정**을 말해.

### EXAMPLES
- Students **negotiate responsibility for** mathematical reasoning.
- Epistemic authority **is negotiated through** peer interaction.
- Students **negotiate their roles as** mathematical contributors.
- Meaning **is jointly negotiated through** collaborative discourse.
- Participants **negotiate who is responsible for** explaining and justifying solutions.

### SEE ALSO
- **negotiate meaning**
- **negotiate roles**
- **negotiate responsibility**
- **negotiate authority**
- **negotiate participation**
- **jointly negotiate**

construct, coordinate, position

### CAVEATS
한국어 화자가 `negotiate`를 보면 자꾸 “서로 의견을 주고받으며 타협한다”로 읽기 쉬운데, academic context에서는 꼭 그런 게 아니야.

예를 들어:

> epistemic authority is negotiated

는 “누가 더 지식이 있는지 서로 협상한다”가 아니라,

**상호작용 속에서 누가 설명할 권한을 갖는지, 누구의 주장이 받아들여지는지가 계속 구성된다**는 뜻에 가까워.

---

## epistemic authority

### NAME
epistemic authority — 지식에 대한 권한 / 누가 '아는 사람'으로 인정되는가
intellectual authority — 지적 권위

### DESCRIPTION
둘 다 비슷하지만, LS나 discourse 연구에서는 `epistemic authority`가 더 구체적인 경우가 많아.

### EXAMPLES
- Students may differ in the degree of **epistemic authority** they are granted during collaboration.
- The AI system may unintentionally take on **epistemic authority** in the interaction.
- Students' **intellectual authority** may be shaped by prior achievement or peer perceptions.
- Collaborative activity involves ongoing negotiation of **epistemic authority**.

### SEE ALSO
- **claim epistemic authority**
- **grant epistemic authority**
- **exercise epistemic authority**
- **share epistemic authority**
- **distribute epistemic authority**

position, agency, participation

### CAVEATS
`authority`라고 해서 꼭 교수-학생처럼 공식적인 권력관계를 의미하는 건 아니야.

`epistemic authority`는 더 미시적으로:

> 누구의 설명이 맞는 것으로 받아들여지는가  
> 누가 질문을 결정하는가  
> 누가 해답을 정당화하는가

를 말할 수 있어.

# 4. “어디까지 해석할 수 있는가” — Boundaries / Limits

## interpretive boundaries

### NAME
interpretive boundaries — 해석의 범위 / 해석이 허용되는 경계

### DESCRIPTION
이 표현은 qualitative research나 case-based study에서 특히 좋음.  
단순히 “limitation”이라고 말하는 것보다 **findings를 어디까지 읽을 수 있는지**를 강조해.

### EXAMPLES
- The authors appropriately acknowledge the **interpretive boundaries of the findings**.
- The small number of cases places clear **interpretive boundaries** on the conclusions.
- These methodological choices shape the **interpretive boundaries** of the analysis.
- The findings should be understood within the **interpretive boundaries** of the selected cases.

### SEE ALSO
- **the scope of the findings**
- **the limits of the analysis**
- **the range of claims supported by the data**
- **the limits of what can be inferred from**
- **the extent to which X can be generalized**

scope(4), bound, constrain

### CAVEATS
`limitation`은 종종 약점처럼 들려.

반면 `interpretive boundary`는:

> 이 연구가 나쁘다

가 아니라

> 이 연구가 말할 수 있는 범위가 여기까지다

라는 훨씬 중립적인 표현이야.

---

## scope

### NAME
scope — 범위

### DESCRIPTION
논문에서 정말 자주 쓰이는 단어지만, 한국어의 “범위”보다 더 논리적 기능이 강해.

### EXAMPLES
- The **scope of the claims** should remain consistent with the study design.
- These findings fall within the **scope of the current analysis**.
- The authors may wish to narrow the **scope of the conclusion**.
- This question lies beyond the **scope of the present study**.

### SEE ALSO
- **within the scope of**
- **beyond the scope of**
- **narrow the scope of**
- **broaden the scope of**
- **the scope of the claim**
- **the scope of inference**

interpretive-boundaries(4), claim, inference

### CAVEATS
한국어에서 “scope”를 그냥 study topic의 범위 정도로 생각하기 쉬운데, academic writing에서는:

- 연구 질문의 범위
- claim의 범위
- inference의 범위
- generalization의 범위

처럼 훨씬 추상적으로도 많이 써.

# 5. “논리적으로 서로 맞아야 한다” — Alignment

## align X with Y

### NAME
align X with Y — X를 Y와 일치시키다 / 정렬시키다

### DESCRIPTION
academic writing에서 아주 유용한 construction이야.  
특히 **RQ–method, theory–analysis, claim–evidence, construct–measure** 관계를 말할 때 좋음.

### EXAMPLES
- The authors should better **align the scope of the claims with the study design**.
- The analysis should be **aligned with** the stated research questions.
- The operationalization should be **aligned with** the conceptual definition.
- The conclusions need to be more closely **aligned with** the evidence presented.

### SEE ALSO
- **better align X with Y**
- **more closely align X with Y**
- **ensure alignment between X and Y**
- **maintain alignment between X and Y**
- **bring X into alignment with Y**

be-consistent-with(5), correspond-to, map-onto(5)

### CAVEATS
한국어로는 “일치하다”라고 번역되지만, `align`은 단순히 똑같다는 의미는 아냐.

예를 들어:

> methods align with research questions

는 methods와 RQ가 같은 내용이라는 게 아니라,

**methods가 RQ를 제대로 답할 수 있도록 설계되어 있다**는 뜻.

---

## be consistent with

### NAME
be consistent with — ~와 일관되다 / 모순되지 않다

### DESCRIPTION
`align with`보다 약해.

### EXAMPLES
- This interpretation **is consistent with** a sociocultural account of learning.
- The findings **are consistent with** prior research on collaborative reasoning.
- This claim is not fully **consistent with** the study design.
- The terminology should remain **consistent with** the operational definition.

### SEE ALSO
- **remain consistent with**
- **be theoretically consistent with**
- **be methodologically consistent with**

align-x-with-y(5), compatible-with

### CAVEATS
`consistent with`는 **supports**보다 약함.

> The findings are consistent with theory X.

는

> theory X가 맞다는 증거다

가 아니라,

> 적어도 theory X와 모순되지는 않고, 그 관점으로 설명 가능하다

정도야.

---

## map onto

### NAME
map onto — ~와 구조적으로 대응하다

### DESCRIPTION
이건 conceptual/theoretical writing에서 정말 유용해.

### EXAMPLES
- The three categories **map onto** the dimensions identified in the theoretical framework.
- These interaction patterns do not neatly **map onto** the original coding categories.
- The empirical findings **map onto** two broader forms of collaboration.
- These practices **map onto** different stages of the problem-solving process.

### SEE ALSO
- **map directly onto**
- **map closely onto**
- **do not neatly map onto**
- **partially map onto**

correspond-to, align-x-with-y(5), operationalize

### CAVEATS
`map onto`는 `same as`가 아니야.

A와 B가 **구조적으로 대응한다**는 뜻이지, 완전히 동일하다는 뜻은 아님.

그래서 theoretical constructs와 empirical categories 연결할 때 특히 좋아.

# 6. “분석의 중심이 되는 사례” — Cases / Sampling

## focal

### NAME
focal — 분석의 중심이 되는 / 집중적으로 보는

### DESCRIPTION
`selected`와 비슷하지만, 단순히 뽑혔다는 의미보다 **분석의 초점이 되는 대상**이라는 느낌이 강함.

### EXAMPLES
- The analysis focused on four **focal dyads**.
- We examined three **focal episodes** in greater depth.
- The **focal participants** were selected based on variation in prior mathematics experience.
- Across the **focal cases**, different interaction patterns emerged.

### SEE ALSO
- **focal cases**
- **focal participants**
- **focal dyads**
- **focal episodes**
- **focal interactions**
- **focal groups**

contrasting-cases(6), selected-cases, purposive-sampling

### CAVEATS
`selected cases`는 그냥 “선택된 사례”.

`focal cases`는  
**“이 논문에서 집중해서 분석하는 사례”**라는 분석적 의미가 더 강해.

---

## contrasting cases

### NAME
contrasting cases — 서로 대비되는 사례

### DESCRIPTION
qualitative comparative work에서 자주 쓰는 표현.

### EXAMPLES
- We selected **contrasting cases** to examine differences in collaborative interaction.
- The analysis compares two **contrasting dyads**.
- These **contrasting cases** illustrate different patterns of genAI use.
- Comparing **contrasting cases** helped identify variation in participation structures.

### SEE ALSO
- **contrasting dyads**
- **contrasting groups**
- **contrasting trajectories**
- **contrasting interaction patterns**
- **cases selected for contrast**

focal(6), comparative-analysis, purposive-sampling

### CAVEATS
`different cases`보다 훨씬 의도적이야.

`contrasting cases`는 연구자가 **차이를 보기 위해 비교하는 사례**라는 느낌이 있음.
