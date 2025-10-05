from django.db import models
from django.contrib.auth.models import AbstractUser

class CustomUser(AbstractUser):
    ROLE_CHOICES =[
        ("author", "Author"),
        ("reader", "Reader"),
        ("admin", "Admin")
    ]

    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default="reader")

# Create your models here.
