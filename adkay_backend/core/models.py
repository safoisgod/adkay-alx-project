from django.db import models
from users.models import CustomUser

class Submission(models.Model):
    STATUS_CHOICES = [
        ("pending", "Pending"),
        ("approved", "Approved"),
        ("rejected", "Rejected")
    ]

    author = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    genre = models.CharField(max_length=100)
    synopsis = models.TextField()
    sample = models.FileField(upload_to="manuscripts/")
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default="pending")
    submitted_at = models.DateTimeField(auto_now_add=True)


class Book(models.Model):
    submission = models.ForeignKey(Submission, on_delete=models.CASCADE)
    price = models.DecimalField(max_digits=6, decimal_places=2, default=0.00)
    published_at = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)
