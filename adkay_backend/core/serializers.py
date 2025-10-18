from rest_framework import serializers
from .models import Submission, Book

class SubmissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Submission
        fields = ["title", "genre", "synopsis","sample_file"]


    def validate_title(self, value):
        print(f"Validating title: '{value}' (length: {len(value)})")
        if len(value)>100:
            raise serializers.ValidationError("Title must be 100 characters or less")
        return value
    
    def validate_sample_file(self, value):
        print(f"Validating sample file: '{value}' (size: {value.size})")
        if value.size > 5 * 1024 * 1024:
            raise serializers.ValidationError("file size must be 5mb or lower")
        if not value.name.lower().endswith(".pdf"):
            raise serializers.ValidationError("Only PDF files are accepted")
        return value


class BookSerializer(serializers.ModelSerializer):
    # technically, this is the best option
    # had to hardcode due to some Error 500 issues

    # submission = SubmissionSerializer()  # Nested representation

    # class Meta:
    #     model = Book
    #     fields = ["id", "submission", "price", "published_at", "is_active"]

    
    title = serializers.CharField(source = "submission.title")
    genre = serializers.CharField(source = "submission.genre")
    synopsis = serializers.CharField(source = "submission.synopsis")

    class Meta:
        model = Book
        fields = ["id", "title", "genre", "synopsis", "price", "published_at"]