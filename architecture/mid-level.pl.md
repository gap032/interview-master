# Architektura Oprogramowania - Pytania Poziom Mid

## 1. Microservices vs Monolith

**Pytanie**: When should you use microservices vs monolithic architecture?

**Odpowiedź**:

**Monolithic Architecture:**
```
[Single Application]
  ├── User Module
  ├── Payment Module
  ├── Inventory Module
  └── Shipping Module
```

**Pros:**
- Simple to develop and deploy
- Easy to test end-to-end
- Better performance (no network calls)
- Simpler debugging

**Cons:**
- Harder to scale specific parts
- Technology lock-in
- Longer deployment cycles
- Tight coupling

**Microservices Architecture:**
```
[User Service] [Payment Service] [Inventory Service] [Shipping Service]
      ↓               ↓                  ↓                   ↓
  [User DB]      [Payment DB]       [Inventory DB]      [Shipping DB]
```

**Pros:**
- Independent scaling
- Technology diversity
- Faster deployment
- Fault isolation

**Cons:**
- Distributed system complexity
- Network latency
- Data consistency challenges
- Harder to debug

**Decision Matrix:**

| Factor | Monolith | Microservices |
|--------|----------|---------------|
| Team size | Small (<10) | Large (>10) |
| Scale needs | Uniform | Variable |
| Complexity | Low-Medium | High |
| Time to market | Fast (MVP) | Slower initial |

**When to use Microservices:**
- Large team, need autonomy
- Different scaling requirements
- Multiple tech stacks needed
- Complex domain (>5 bounded contexts)

---

## 2. Event-Driven Architecture

**Pytanie**: Design an event-driven system. Explain benefits and challenges.

**Odpowiedź**:

**Architecture:**
```
[Service A] → [Message Broker] → [Service B]
                                → [Service C]
                                → [Service D]
```

**Example: E-commerce Order Processing**
```python
# Order Service publishes event
def place_order(order):
    order_id = save_order(order)
    
    event = {
        'event_type': 'ORDER_PLACED',
        'order_id': order_id,
        'user_id': order.user_id,
        'total': order.total
    }
    
    message_broker.publish('orders', event)

# Payment Service subscribes
def on_order_placed(event):
    process_payment(event['order_id'])
    
    message_broker.publish('payments', {
        'event_type': 'PAYMENT_PROCESSED',
        'order_id': event['order_id']
    })

# Inventory Service subscribes
def on_payment_processed(event):
    reserve_items(event['order_id'])
    
# Email Service subscribes
def on_order_placed(event):
    send_confirmation_email(event['user_id'])
```

**Benefits:**
- Loose coupling between services
- Easy to add new consumers
- Better fault tolerance
- Natural async processing

**Challenges:**
- Eventual consistency
- Event ordering
- Debugging distributed flows
- Message broker is critical dependency

---

## 3. Design Patterns: Factory vs Builder vs Prototype

**Pytanie**: Compare creational design patterns with code examples.

**Odpowiedź**:

**Factory Pattern:**
```java
interface Vehicle {
    void drive();
}

class Car implements Vehicle {
    public void drive() { System.out.println("Driving car"); }
}

class Bike implements Vehicle {
    public void drive() { System.out.println("Riding bike"); }
}

class VehicleFactory {
    public static Vehicle createVehicle(String type) {
        switch(type) {
            case "car": return new Car();
            case "bike": return new Bike();
            default: throw new IllegalArgumentException();
        }
    }
}

// Usage
Vehicle v = VehicleFactory.createVehicle("car");
```

**Builder Pattern:**
```java
class User {
    private String firstName;
    private String lastName;
    private int age;
    private String email;
    
    private User() {}
    
    public static class Builder {
        private User user = new User();
        
        public Builder firstName(String name) {
            user.firstName = name;
            return this;
        }
        
        public Builder lastName(String name) {
            user.lastName = name;
            return this;
        }
        
        public Builder age(int age) {
            user.age = age;
            return this;
        }
        
        public User build() {
            return user;
        }
    }
}

// Usage - readable, flexible
User user = new User.Builder()
    .firstName("John")
    .lastName("Doe")
    .age(30)
    .build();
```
