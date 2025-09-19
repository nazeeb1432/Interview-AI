# AI Mock Interview - Quality Function Deployment (QFD) Matrix (Updated with RAG Workflow)

## Overview

This Quality Function Deployment (QFD) matrix identifies key user requirements for the AI Mock Interview application and maps them to technical features, helping to prioritize development efforts and ensure alignment between user needs and technical implementation.

## New Workflow Integration: Refined Flow with RAG

To enhance accuracy and relevance, a Retrieval-Augmented Generation (RAG) system has been integrated into the workflow. This ensures that interview questions and feedback are grounded in real, up-to-date knowledge bases such as job postings, technical interview datasets, and industry-specific examples.

**Pipeline:**

```
User Input (role, field, language, exp, job desc)
     ↓
RAG Retrieval (top-k relevant interview Q&A from knowledge base)
     ↓
[Generation Prompt]
   Input: role + job desc + exp + top-k context
   Output: JSON {question, answer}
     ↓
User Answer Capture
     ↓
[Feedback Prompt]
   Input: question + ideal answer + user answer + top-k context
   Output: JSON {rating, feedback}
     ↓
Summarization Layer (optional) → UI display
```

## Benefits of the Updated Workflow

* **Grounded Content:** Ensures interview questions reflect real-world trends and company practices.
* **Adaptive Feedback:** Evaluations leverage both the model's reasoning and contextualized examples.
* **Freshness:** Continuous updates to the knowledge base keep questions aligned with the latest industry expectations.
* **Scalability:** Modular pipeline allows additional roles, languages, and knowledge sources to be integrated easily.

## Updates to Technical Requirements

| # | Technical Feature              | Description (Updated)                                                                  |
| - | ------------------------------ | -------------------------------------------------------------------------------------- |
| A | AI-powered question generation | Now enhanced with RAG context for role-specific and up-to-date questions               |
| B | Speech-to-text functionality   | Same as before (voice input to text)                                                   |
| C | Answer evaluation algorithm    | Now considers ideal answer + retrieved context for more nuanced comparison             |
| D | Feedback generation system     | Generates structured JSON feedback with rating + improvement suggestions using context |
| E | Rating calculation methodology | Updated to include rubric alignment (clarity, correctness, relevance)                  |
| H | Database schema design         | Expanded to support time-stamped contextual chunks for RAG updates                     |

## Key Improvement

* Addition of **real-time RAG updates** ensures evolving interview practices are reflected without manual retraining of the AI system.
