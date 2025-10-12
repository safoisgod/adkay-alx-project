from django.urls import path
from .views import QouteView, SubmissionView

urlpatterns = [
    path("api/quote/", QouteView.as_view()), #map api/views to QuoteView
    path("api/submit/", SubmissionView.as_view())
]