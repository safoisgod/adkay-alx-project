from django.contrib import admin
from .models import Submission, Book


@admin.register(Submission)
class SubmisionAdmin(admin.ModelAdmin):
    list_display = ["author", "title", "genre", "status", "submitted_at"]
    list_filter = ["genre", "status"]
    search_fields = ["author", "title"]

@admin.register(Book)
class BookAdmin(admin.ModelAdmin):
    list_display = ["get_author", "get_title", "get_genre", "price","published_at"]
    list_filter = ["submission__genre", "price"]

    search_fields = ["submission__author", "submission__title"]

    def get_author(self, obj):
        return obj.submission.author
    get_author.short_description = "author"
    get_author.admin_order_field = "submission__author"

    def get_title(self, obj):
        return obj.submssion.title
    get_title.short_description = "title"
    get_author.admin_iorder_field = "submission__title"

    def get_genre(self, obj):
        return obj.submission.genre
    get_genre.short_description = "genre"
    get_genre.admin_order_field = "submission__genre"


