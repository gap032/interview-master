# Behavioral Questions - Mid-Level

## 1. Tell me about a challenging bug you fixed

**Question**: Describe a difficult technical problem you solved.

**Answer Framework (STAR):**

**Situation:**
"In my previous role, our API was experiencing random timeouts affecting 5% of requests."

**Task:**
"I was tasked with identifying and fixing the root cause within a week before it impacted more users."

**Action:**
- Added detailed logging to track request lifecycle
- Analyzed logs and found database connection pool exhaustion
- Investigated code and found connections weren't being properly released in error cases
- Implemented try-finally blocks to ensure connection cleanup
- Added connection pool monitoring

**Result:**
"Timeout rate dropped to 0.1%. Implemented monitoring alerts to catch similar issues early. Shared findings with team to prevent in other services."

---

## 2. Describe a time you had to learn a new technology quickly

**Answer:**

**Situation:**
"Project required migrating from monolith to microservices using Kubernetes, which I hadn't used before."

**Task:**
"Lead the migration within 3 months."

**Action:**
- Spent first week on Kubernetes tutorials and certification courses
- Built proof-of-concept with simple service
- Partnered with experienced colleague for code reviews
- Documented learnings for team

**Result:**
"Successfully migrated 3 services. Became team's Kubernetes resource. Reduced deployment time from hours to minutes."
