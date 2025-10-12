from django.shortcuts import render
import requests

from .models import Submission
from .forms import SubmissionForm

from users.models import CustomUser

from rest_framework import status

from rest_framework.views import APIView
from rest_framework.response import Response


class QouteView(APIView):
    def get(self, request):
        response = requests.get("https://zenquotes.io/api/random") # first requet data
        data = response.json() # convert to JSON file
        return Response({'quote': data[0]['q'], 'author': data[0]['a']})
    
class SubmissionView(APIView):
    def post(self, request):
        form = SubmissionForm(request.data, request.FILES)
        if form.is_valid():
            submission = form.save(commit=False)
            submission.author = CustomUser.objects.get(username="iamnanasafo")
            submission.save()
            return Response({"message":"Submitted"}, status=status.HTTP_201_CREATED)
        return Response(form.errors, status=status.HTTP_400_BAD_REQUEST)