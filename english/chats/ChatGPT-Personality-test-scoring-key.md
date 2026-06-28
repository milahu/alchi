# Personality test scoring key

**User:** Anonymous  
**Created:** 2026/6/28 13:56:16  
**Updated:** 2026/6/28 14:21:25  
**Exported:** 2026/6/28 14:21:39  
**Link:** [<https://chatgpt.com/c/6a410b48-eec4-83ed-8850-47840aa66dee>](https://chatgpt.com/c/6a410b48-eec4-83ed-8850-47840aa66dee)

## Prompt:

6/28/2026, 1:56:16 PM

many personality tests are closed-source, they give the user a list of questions, but they do not reveal their interpretations of the answers... (for my taste, such tests are unprofessional, because they are playing a "hide and seek" game of words, a game of synonyms and antonyms)... question: how do we call this hidden "translation layer" between the test answers and the test results? is this a hidden "test key"? or is this a hidden "meaning of answers"?

## Response:

6/28/2026, 1:56:16 PM

The standard term in psychometrics is **scoring key** (or simply **key**). Depending on what exactly is hidden, there are several related terms:

1.  **Scoring key** (most common)

    - The mapping from each possible answer to a numerical score.
    - Example:
      - "Strongly agree" → +2
      - "Agree" → +1
      - "Disagree" → -1
    - If the test contains reverse-worded items, the scoring key also specifies which items are reverse-scored.

2.  **Answer key** (less precise)

    - Usually used for exams with correct/incorrect answers.
    - Not the preferred term for personality tests, since there are no "correct" answers.

3.  **Scoring algorithm**

    - Used when the process is more complex than a simple lookup.
    - May include weighting, normalization, missing-data rules, combining subscales, or nonlinear calculations.

4.  **Scoring rubric**

    - More common in essays and performance assessments than in personality questionnaires.
    - Can sometimes describe how responses are interpreted.

5.  **Interpretation key** or **interpretive key**

    - Refers to the next stage: translating numerical scores into psychological descriptions.
    - Example:
      - Extraversion score = 34 → "High extraversion."

6.  **Scoring model** or **measurement model**

    - In modern psychometrics, especially with methods like Item Response Theory, the "hidden layer" is a statistical model rather than a simple key.

### Your phrase: "translation layer"

"Translation layer" is actually a good intuitive description. In psychometric terms, it is often split into two distinct layers:

    answers
       ↓
    scoring key / scoring algorithm
       ↓
    raw scores
       ↓
    norms & interpretation rules
       ↓
    test report

So there are really **two hidden translations**:

- **answers → scores** = **scoring key** (or scoring algorithm)
- **scores → personality descriptions** = **interpretation rules**, **interpretive key**, or **normative interpretation**

### Regarding your criticism

Your observation touches on a genuine distinction in psychometrics. Commercial publishers often keep the scoring key and interpretation procedures proprietary to protect intellectual property and reduce coaching or manipulation of responses. From a scientific perspective, however, many researchers prefer instruments with **published scoring procedures**, because they can be independently evaluated, replicated, and criticized.

So if you want the technically correct name for the hidden mapping between answers and results, **scoring key** is the best single term. If you want to emphasize that it converts the meaning of responses into personality scores, **scoring algorithm** is also appropriate, especially for modern computerized tests.

## Prompt:

6/28/2026, 2:09:05 PM

> From a scientific perspective, however, many researchers prefer instruments with **published scoring procedures**, because they can be independently evaluated, replicated, and criticized.

the main problem i see is that users cannot validate their definitions of words... because most words have subjective meanings, so if a user has no way to ask the test author "what exactly do you mean with this word?" or "what exactly is the difference between this word and that word?" then the best answer a user can give is "i dont understand the question", and the worst answer a user can give is "i dont understand the answer, but i pick something that sounds good"... so such closed-source personality tests do not seek true resonance between the test author and the user, but only some superficial "understanding" between author and user...

another problem with most personality tests is the presentation of results, where users only get a summary, but not the full list of questions and answers, so users cannot self-correct their results, and when users share such summaries then others cannot see how exactly the user got this result... again, this is just unprofessional and unscientific, but apparently most people dont care, so they only share their test results, but dont make it public how exactly they came to their test result...

## Response:

6/28/2026, 2:09:05 PM

You've identified several issues that are discussed in psychometrics and philosophy of measurement, although different researchers would weigh them differently.

### 1. Ambiguous language is a real measurement problem

When a questionnaire asks:

> "I am often assertive."

there are multiple possible interpretations:

- What counts as "often"?
- What counts as "assertive" rather than "confident" or "aggressive"?
- Does this refer to work, family, friends, strangers...?

Psychometricians try to reduce this problem by:

- carefully wording items,
- pilot testing them,
- checking whether different people interpret them similarly,
- statistically removing items that behave inconsistently.

However, these methods cannot eliminate semantic ambiguity entirely. Words in natural language rarely have perfectly fixed meanings.

So your point is valid: if respondent and author attach different meanings to key words, the response may reflect that mismatch rather than the intended construct.

### 2. "I don't understand the question" is often missing

This is another legitimate criticism.

Many personality inventories force respondents into choices like

- strongly disagree
- disagree
- neutral
- agree
- strongly agree

even when the respondent thinks

> "I don't know what this question is asking."

Those are different states:

- **neutral opinion**
- **don't know**
- **question is ambiguous**
- **not applicable**

Collapsing all of these into one option can introduce measurement error.

Some research questionnaires do include options such as "Not applicable" or "Cannot answer," but many commercial tests do not.

### 3. Hidden scoring makes independent validation difficult

This is probably your strongest methodological point.

Imagine two situations.

**Open scoring**

    Question 17:
    "I enjoy leading groups."

    Your answer:
    Agree

    Score:
    +2 Extraversion
    0 Agreeableness

Everything is inspectable.

------------------------------------------------------------------------

**Closed scoring**

    Question 17:
    "I enjoy leading groups."

    Your answer:
    Agree

    ...
    Result:
    ENTJ

The user has no way to verify

- whether the answer was interpreted correctly,
- whether reverse scoring occurred,
- whether hidden weights were used,
- whether the reported type actually follows from the answers.

This reduces transparency.

In science, transparency is generally valued because it allows others to inspect and critique the measurement process.

### 4. Sharing only the summary

This is another interesting point.

If someone says

> "I scored 92% conscientiousness."

you cannot tell whether that score came from

- consistently answering many relevant questions,
- a few heavily weighted questions,
- contradictory responses,
- careless responding,
- or even a scoring error.

From a reproducibility standpoint, the summary alone is not enough to reconstruct the result.

In scientific studies, researchers often keep the raw response data (anonymized when appropriate) precisely because summary statistics alone lose important information.

### 5. One caveat

I would separate **scientific validity** from **commercial secrecy**.

A test can be scientifically well validated even if its exact scoring algorithm is proprietary. For example, the developers may publish evidence that:

- the test predicts certain outcomes,
- it has good reliability,
- it correlates with established measures,
- it has been replicated by independent researchers.

Keeping the scoring key secret makes independent inspection harder, but it does not automatically make the underlying measurement invalid.

Conversely, an open-source personality test can still be poorly designed if its questions or scoring lack empirical support.

### 6. Your broader principle

The principle you're advocating is essentially one of **interpretability** and **auditability**.

An ideal personality test, from this perspective, would provide:

- every question,
- precise definitions of important terms,
- the respondent's answers,
- the complete scoring key,
- every intermediate score,
- the final interpretation,
- and enough documentation that another person could independently reproduce the result.

That standard is closer to the ideals of open science and reproducible research than to the design of many commercial personality tests. Whether that level of transparency is always practical or desirable is debatable—for example, publishers often argue that complete disclosure makes tests easier to game—but it is a coherent methodological position rather than an unusual one.

## Prompt:

6/28/2026, 2:19:00 PM

> Whether that level of transparency is always practical or desirable is debatable

yes, absolutely always.  
when people take personality tests, they also want to learn about their own strengths and weakspots, so obscurity does not help, because obscurity only reinforces misunderstandings and errors (false self-images, false definitions of words...)  
when people really want to game a personality test, then it does not matter whether the test is open-source or closed-source, because such people are already familiar with personality psychology (personality types, personality traits), so they will have it much easier to reverse-engineer a hidden scoring key, so for every question, they can guess "this type would give this answer, that type would give that answer, ...", so if they want to produce some specific test result, then they can always game the test, no matter whether the scoring key is public or private... so this "we should make it harder to game our test argument" really is a bullshit-argument, which helps nobody, and creates only more confusion for everyone...

personally, i am trying to lead by example, by providing a fully-transparent personality test at <https://milahu.github.io/alchi/src/alchi-test/> where the full test state is stored in the URL fragment ID, so users can simply share the test URL and everyone else can see the full list of questions and answers. (what is missing in my implementation is the answer "i dont understand the question", and an additional free-form text input field where the user can add a comment to every question)

## Response:

6/28/2026, 2:19:00 PM

I think you're making two distinct claims, and it's worth separating them because one is much stronger than the other.

### 1. Transparency for learning

This is a strong argument.

If the purpose of a personality test is partly educational—helping someone understand themselves—then exposing the reasoning has obvious benefits:

- the respondent can check whether they interpreted each question as intended,
- they can identify questions they misunderstood,
- they can disagree with particular inferences instead of rejecting or accepting the entire report,
- other people can review the reasoning and point out possible mistakes,
- the test author receives much richer feedback on ambiguous wording.

This is analogous to a mathematics textbook showing the solution steps instead of only giving the final answer. If the goal is learning, the intermediate reasoning is valuable.

### 2. Transparency versus gaming

Here I think the issue is more nuanced.

You argue that people determined to game the test will reverse-engineer it anyway.

There is truth to that. A motivated person with enough familiarity with personality models can often infer the direction of scoring from the questions themselves. Many items are fairly transparent:

> "I enjoy meeting new people."

Most respondents can guess that agreement contributes to Extraversion.

Making the scoring key secret is therefore not a complete defense against intentional faking.

However, there is also evidence from psychometrics that *complete* disclosure can sometimes make coaching easier. If someone knows not only the direction of each item but also the exact weights, reverse-scored items, validity scales, and decision thresholds, they may be able to optimize their responses more effectively.

So I wouldn't say secrecy "helps nobody." Rather, I would say its effectiveness against gaming is limited and comes at a cost in transparency.

That turns the question into a trade-off:

- **More transparency** → easier to audit, learn from, and critique.
- **More secrecy** → may raise the effort required for some forms of intentional manipulation, but also makes independent evaluation harder.

Reasonable people can disagree about where to draw that line.

### Your implementation idea

The idea of encoding the entire test state in the URL is interesting because it addresses reproducibility.

Instead of someone saying

> "I'm Type X."

they can share a URL that contains

- every question,
- every answer,
- and therefore the complete evidence behind the conclusion.

That allows others to inspect the reasoning rather than only the summary.

### Your suggested additions

The two additions you mentioned would also address common sources of measurement error.

Instead of forcing every response into agreement/disagreement, each item could support something like:

- Agree strongly
- Agree
- Neutral
- Disagree
- Disagree strongly
- **I don't understand this question**
- **Not applicable / insufficient experience**

and optionally

> Comment:  
> "I interpret 'assertive' differently here."

That comment field would not normally affect the automated score, but it would preserve information that is otherwise lost. It also creates a feedback channel for improving the questionnaire: if many respondents leave similar comments on the same item, that's evidence the wording may need revision.

One thing I would add is that even if comments are not part of the scoring, they should remain attached to any shared result. That way, someone reviewing the responses can see not only *what* answer was selected but *why*, which is often essential for interpreting ambiguous items.

------------------------------------------------------------------------

Powered by [ChatGPT Exporter](https://www.chatgptexporter.com)
