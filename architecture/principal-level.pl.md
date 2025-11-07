# Software Architecture - Principal-Level Questions

## 1. Design Multi-Tenant SaaS Architecture

**Question**: Design a multi-tenant SaaS platform. Discuss isolation strategies and trade-offs.

**Answer**:

**Isolation Strategies:**

**1. Shared Database, Shared Schema:**
```sql
CREATE TABLE users (
    id BIGINT,
    tenant_id BIGINT,  -- Every table has tenant_id
    name VARCHAR(100)
);

-- All queries filtered by tenant_id
SELECT * FROM users WHERE tenant_id = ? AND id = ?;
```
- Pros: Lowest cost, easy to manage
- Cons: No data isolation, noisy neighbor

**2. Shared Database, Separate Schema:**
```sql
-- tenant_1 schema
CREATE SCHEMA tenant_1;
CREATE TABLE tenant_1.users (...);

-- tenant_2 schema
CREATE SCHEMA tenant_2;
CREATE TABLE tenant_2.users (...);
```
- Pros: Better isolation, moderate cost
- Cons: Schema changes complex

**3. Separate Database per Tenant:**
- Pros: Complete isolation, custom per tenant
- Cons: Expensive, harder to manage at scale

**Hybrid Approach:**
```python
class TenantRouter:
    def get_database(self, tenant_id):
        tier = self.get_tenant_tier(tenant_id)
        
        if tier == 'enterprise':
            # Dedicated database
            return f"tenant_{tenant_id}_db"
        elif tier == 'premium':
            # Shared DB, separate schema
            return f"shared_db.tenant_{tenant_id}"
        else:
            # Shared everything
            return "shared_db.public"
```

**Key Considerations:**
- Row-level security (RLS) for shared tables
- Connection pooling per tenant
- Rate limiting per tenant
- Backup/restore strategies
- Data residency requirements
