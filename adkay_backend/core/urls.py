from django.urls import path
from .views import QouteView

urlpatterns = [
    path("api/quote/", QouteView.as_view()) #map api/views to QuoteView
]