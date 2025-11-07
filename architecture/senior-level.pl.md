# Architektura Oprogramowania - Pytania Poziom Senior

## 1. CQRS and Event Sourcing

**Pytanie**: Explain CQRS and Event Sourcing. When to use them?

**Odpowiedź**:

**CQRS (Command Query Responsibility Segregation):**

Separate read and write models.

```python
# Write Model (Commands)
class CreateOrderCommand:
    def __init__(self, user_id, items):
        self.user_id = user_id
        self.items = items

class OrderCommandHandler:
    def handle_create_order(self, command):
        order = Order(command.user_id, command.items)
        self.order_repository.save(order)
        return order.id

# Read Model (Queries)
class OrderQueryService:
    def get_user_orders(self, user_id):
        # Optimized read-only view
        return self.read_db.query("""
            SELECT * FROM order_summary_view 
            WHERE user_id = ?
        """, user_id)
```

**Event Sourcing:**

Store all changes as sequence of events.

```python
# Events
class OrderCreated:
    def __init__(self, order_id, user_id, items):
        self.order_id = order_id
        self.user_id = user_id
        self.items = items

class OrderShipped:
    def __init__(self, order_id, tracking_number):
        self.order_id = order_id
        self.tracking_number = tracking_number

# Aggregate rebuilds state from events
class Order:
    def __init__(self, order_id):
        self.order_id = order_id
        self.status = None
        self.items = []
        
    def apply_event(self, event):
        if isinstance(event, OrderCreated):
            self.items = event.items
            self.status = 'CREATED'
        elif isinstance(event, OrderShipped):
            self.status = 'SHIPPED'
            self.tracking = event.tracking_number
    
    @classmethod
    def from_events(cls, events):
        order = cls(events[0].order_id)
        for event in events:
            order.apply_event(event)
        return order

# Rebuild current state
events = event_store.get_events(order_id)
order = Order.from_events(events)
```

**Benefits:**
- Complete audit trail
- Time travel debugging
- Multiple read models from same events
- Better scalability

**When NOT to use:**
- Simple CRUD apps
- Learning curve too high
- Team not experienced
- No need for audit trail
