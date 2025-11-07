# DevOps # DevOps & Cloud - Senior-Level Questions Cloud - Pytania Poziom Senior

## 1. Design High-Availability Infrastructure

**Pytanie**: Design a highly available, fault-tolerant infrastructure on AWS.

**Odpowiedź**:

**Architecture:**
```
[Route 53 DNS]
     ↓
[CloudFront CDN]
     ↓
[Application Load Balancer] (Multi-AZ)
     ↓
[Auto Scaling Group] → [EC2 instances in multiple AZs]
     ↓
[RDS Multi-AZ] + [Read Replicas]
     ↓
[ElastiCache] (Redis Cluster Mode)
```

**Terraform Example:**
```hcl
# Multi-AZ RDS
resource "aws_db_instance" "main" {
  identifier           = "mydb"
  engine              = "postgres"
  instance_class      = "db.t3.medium"
  
  multi_az            = true
  availability_zone   = "us-east-1a"
  
  backup_retention_period = 7
  backup_window          = "03:00-04:00"
  
  enabled_cloudwatch_logs_exports = ["postgresql"]
}

# Auto Scaling Group
resource "aws_autoscaling_group" "web" {
  name                 = "web-asg"
  vpc_zone_identifier  = [aws_subnet.private_a.id, aws_subnet.private_b.id]
  min_size            = 2
  max_size            = 10
  desired_capacity    = 3
  
  health_check_type         = "ELB"
  health_check_grace_period = 300
  
  launch_template {
    id      = aws_launch_template.web.id
    version = "$Latest"
  }
}
```

**Disaster Recovery:**
- RTO (Recovery Time Objective): < 1 hour
- RPO (Recovery Point Objective): < 15 minutes
- Regular backup testing
- Multi-region failover plan
