# Behavioral Questions - Senior-Level

## 1. Tell me about a time you disagreed with a technical decision

**Question**: Describe a technical disagreement and how you handled it.

**Answer:**

**Situation:**
"Team wanted to adopt NoSQL for all new services, but I believed relational DB was better for our transactional workload."

**Task:**
"Find the right solution while maintaining team cohesion."

**Action:**
- Prepared data: comparison of consistency models, performance benchmarks
- Organized technical discussion with concrete examples
- Listened to team's concerns (scalability, flexibility)
- Proposed hybrid: NoSQL for caching/sessions, SQL for transactions
- Created decision matrix for future db choices

**Result:**
"Team adopted hybrid approach. Created guidelines preventing future confusion. System performed well under load."

**Key Points:**
- Back disagreements with data
- Listen to understand others' perspectives
- Focus on team goals, not being right
- Document decisions for future reference

---

## 2. How do you handle technical debt?

**Answer:**

"I treat technical debt as a business decision requiring balance:

**Tracking:**
- Maintain backlog of technical debt items
- Categorize by risk and impact
- Estimate effort to fix

**Prioritization:**
- Security vulnerabilities: immediate
- Performance issues affecting users: high priority
- Code quality improvements: balanced with features

**Communication:**
- Explain debt in business terms to stakeholders
- Show cost of not addressing (slower development, bugs)
- Reserve 20% of sprint capacity for debt reduction

**Example:**
Had legacy payment service with no tests. Rather than full rewrite:
1. Added tests for critical paths
2. Refactored incrementally during feature work
3. After 6 months: 80% coverage, reduced bugs by 60%"
