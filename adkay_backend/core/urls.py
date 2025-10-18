from django.urls import path
from .views import QouteView, SubmissionView, BookListView, BookDetailsView

urlpatterns = [
    path("api/quote/", QouteView.as_view()), #map api/views to QuoteView
    path("api/submit/", SubmissionView.as_view()),

    path("api/books/", BookListView.as_view(), name="list-books"),
    path("api/books/<int:pk>", BookDetailsView.as_view(), name="book-details")
]