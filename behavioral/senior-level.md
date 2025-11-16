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

---

## 3. Describe a time when you mentored a junior developer

**Question**: Tell me about your experience mentoring less experienced engineers.

**Answer:**

**Situation:**
"A junior developer joined our team to work on our microservices platform. They had strong academic knowledge but limited production experience."

**Task:**
"Help them become productive while building their confidence and skills."

**Action:**
- **Pair Programming (Week 1-2):** Started with daily pairing sessions on small, well-defined tasks
- **Gradual Ownership:** Gave them their first solo task (adding a new API endpoint) with clear requirements
- **Code Review as Teaching:** Used PR reviews as learning opportunities, explaining the "why" not just "what"
  - Example: Explained why we use dependency injection for testability
  - Shared team's coding standards document
- **Regular 1-on-1s:** Weekly check-ins to discuss blockers, answer questions, share resources
- **Encouraged Questions:** Created safe environment - "no question is stupid"
- **Knowledge Sharing:** Assigned them to present a tech topic to the team (they chose Kubernetes basics)

**Result:**
- After 3 months: shipping features independently with minimal oversight
- Their presentation helped 2 other team members better understand our K8s setup
- They became mentor to next junior hire
- Received positive feedback in their first performance review

**Key Points:**
- Start small, gradually increase complexity
- Make learning bidirectional (I learned too)
- Celebrate small wins to build confidence
- Provide context, not just instructions
- Regular feedback is crucial

---

## 4. Tell me about a time when you had to make a difficult trade-off

**Question**: Describe a situation where you had to balance competing priorities.

**Answer:**

**Situation:**
"Building new checkout flow. Product wanted extensive A/B testing features. Engineering wanted to refactor legacy payment integration. Timeline was tight - 6 weeks to launch."

**Task:**
"Deliver value while managing technical and business constraints."

**Action:**

**Analysis:**
- Created decision matrix with three options:
  1. Full feature set + refactoring (12 weeks)
  2. Full features, no refactoring (8 weeks, increased tech debt)
  3. MVP features + critical refactoring (6 weeks)

**Stakeholder Communication:**
- Met with product: explained technical constraints
- Showed data: current payment code had 15 bugs in last quarter
- Proposed MVP: Single A/B test framework, expand later
- Explained risk: skipping refactoring = slower future development

**Compromise:**
- Delivered MVP checkout with basic A/B testing
- Refactored payment validation layer (highest bug area)
- Scheduled Phase 2 (advanced A/B features) for next quarter
- Documented tech debt items for payment integration

**Result:**
- Launched on time (6 weeks)
- Payment bugs reduced by 60% in next quarter
- A/B testing used successfully for 3 experiments
- Phase 2 features delivered 8 weeks later
- Built trust with product team through transparency

**Key Lessons:**
- Use data to support decisions
- Make trade-offs explicit and visible
- Underpromise, overdeliver
- Technical quality enables future velocity

---

## 5. How do you handle conflicting priorities from different stakeholders?

**Answer:**

"I've learned that conflicting priorities are opportunities to align on shared goals:

**Framework for Resolution:**

**1. Understand the 'Why':**
- Don't just collect requirements - understand business impact
- Ask: 'What problem are we solving? What happens if we wait?'
- Example: Sales wants feature X urgently. Why? Closing $2M deal depends on it.

**2. Quantify Impact:**
- Convert requests to business metrics
- Security fix: Protects $50M in revenue
- New feature: Could generate $200K ARR
- Performance: Reduces churn by 5% = $100K saved

**3. Facilitate Discussion:**
- Bring stakeholders together (don't be the middleman)
- Present data-driven comparison
- Let them see the full picture
- Example meeting:
  ```
  Sales: Need feature X for client
  Security: Need critical patch deployed
  Product: Need analytics upgrade

  My role: Present capacity (40 hours), estimated efforts, and impact
  Group decides: Security (20h) + Feature X (20h), Analytics deferred
  ```

**4. Document and Communicate:**
- Publish decision and rationale
- Set expectations for deferred work
- Revisit quarterly

**Real Example:**
Marketing wanted new landing page integration. Support wanted customer dashboard improvements. Security flagged SQL injection vulnerability.

**My approach:**
1. Security: Immediate (1 day) - non-negotiable
2. Support dashboard: High impact on retention (3 days)
3. Marketing: Good to have but not time-sensitive (next sprint)

**Outcome:**
- Security fixed immediately
- Dashboard delivered, support tickets reduced 30%
- Marketing accepted delay after seeing prioritization logic
- Established clear escalation path for future conflicts

**Key Principles:**
- Transparency builds trust
- Data beats opinions
- Shared understanding beats compromise
- Document decisions for accountability"

---

## 6. Describe a situation where you had to deal with a major production incident

**Question**: Tell me about a time you responded to a critical production issue.

**Answer:**

**Situation:**
"3 AM page: API response times spiked from 200ms to 8 seconds. Payment processing timing out. Black Friday weekend - peak traffic."

**Task:**
"Restore service quickly while minimizing revenue loss and preventing recurrence."

**Action:**

**Immediate Response (First 15 minutes):**
1. Acknowledged incident, joined war room Slack channel
2. Checked monitoring dashboards (Datadog, Cloudwatch)
3. Identified symptom: Database connection pool exhausted
4. Quick mitigation: Increased connection pool size (10 → 50)
5. Result: Response times dropped to 2 seconds (better, but not normal)

**Root Cause Analysis (Next 30 minutes):**
1. Reviewed recent deployments: New recommendation service deployed 2 hours earlier
2. Checked database queries: New service making N+1 queries
3. Each product page: 1 query became 50+ queries
4. Database CPU: 95% utilization

**Resolution:**
1. Rolled back recommendation service deployment
2. Response times returned to normal (200ms)
3. Traffic recovered, payments processing normally
4. Total downtime: 45 minutes, estimated loss: $50K revenue

**Post-Incident (Next Day):**
1. Wrote incident report (timeline, impact, root cause, lessons)
2. Scheduled blameless postmortem with team
3. Action items:
   - Add query performance testing to CI/CD
   - Implement database query logging alerts
   - Gradual rollout strategy (canary deployments)
   - Load testing requirement for new services

**Follow-up (2 weeks):**
- Fixed N+1 query using eager loading
- Added integration tests with query count assertions
- Set up Datadog APM for query performance monitoring
- Implemented canary deployment (5% → 50% → 100%)
- Re-deployed successfully with monitoring

**Result:**
- No similar incidents in following 6 months
- Team learned value of performance testing
- Improved deployment safety practices
- Documented incident response playbook

**Key Points:**
- Stay calm, follow runbook
- Mitigation first, then root cause
- Blameless postmortems drive learning
- Incidents are opportunities to improve systems
- Documentation helps next time

**What I'd Do Differently:**
- Should have had better load testing before Black Friday
- Could have enabled database slow query logging earlier
- Canary deployments should have been standard practice

---

## 7. How do you influence technical decisions when you're not the decision-maker?

**Answer:**

"As a senior engineer, I often need to influence without authority:

**Strategies:**

**1. Build Credibility:**
- Deliver consistently on commitments
- Admit when I don't know something
- Give credit to others' ideas
- Example: When junior suggested alternative approach, I helped prototype it, gave them credit in team meeting

**2. Use Data and Prototypes:**
- Don't just argue - demonstrate
- Example: Team debating GraphQL vs REST
  - I built small proof-of-concept over weekend
  - Showed query flexibility, performance metrics
  - Team made informed decision (chose GraphQL)

**3. Frame in Terms of Outcomes:**
- Connect technical choices to business impact
- Wrong: 'We should refactor this code, it's messy'
- Right: 'This code has caused 8 bugs in 3 months. Refactoring would reduce debugging time by ~40%'

**4. Listen and Incorporate Feedback:**
- Seek to understand opposing viewpoints
- Find common ground
- Example: Architect wanted microservices, I preferred monolith
  - Asked: 'What problems are you trying to solve?'
  - Answer: Team independence, deployment flexibility
  - Compromise: Modular monolith with clear boundaries, easy to split later

**5. Choose Battles Wisely:**
- Not every technical decision needs my input
- Focus on high-impact areas
- Let team own decisions when stakes are low

**Real Example:**

**Situation:** Engineering manager wanted to adopt new testing framework (Cypress). I believed our current setup (Jest + Testing Library) was sufficient.

**My approach:**
1. Asked clarifying questions: What's not working with current setup?
2. Answer: E2E tests are flaky, hard to debug
3. I proposed: Let's fix root cause (async issues, better selectors)
4. Created spike: Improved existing tests, documented best practices
5. Result: Test reliability improved 80%, avoided migration cost
6. Manager appreciated data-driven approach

**When I Was Wrong:**

Team wanted to adopt TypeScript. I was skeptical (learning curve, migration effort).

**What changed my mind:**
- Junior dev showed me how types caught 3 bugs in PR
- Team was enthusiastic and willing to invest in learning
- I proposed gradual adoption strategy
- Result: TypeScript improved code quality, I was wrong to resist

**Key Takeaway:**
- Influence through evidence, empathy, and execution
- Be willing to be proven wrong
- Strong opinions, weakly held"
