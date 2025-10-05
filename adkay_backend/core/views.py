from django.shortcuts import render
import requests

from rest_framework.views import APIView
from rest_framework.response import Response


class QouteView(APIView):
    def get(self, request):
        response = requests.get("https://zenquotes.io/api/random") # first requet data
        data = response.json() # convert to JSON file
        return Response({'quote': data[0]['q'], 'author': data[0]['a']})