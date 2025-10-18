from django.shortcuts import render
import requests

from .models import Submission, Book

from users.models import CustomUser

from rest_framework import status
from rest_framework import generics

from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import SubmissionSerializer, BookSerializer


class QouteView(APIView):
    def get(self, request):
        response = requests.get("https://zenquotes.io/api/random") # first requet data
        data = response.json() # convert to JSON file
        return Response({'quote': data[0]['q'], 'author': data[0]['a']})
    
class SubmissionView(APIView):
    def post(self, request):

        # backend validation
        serializer = SubmissionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(author = CustomUser.objects.get(username = "iamnanasafo"))
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST) 


class BookListView(generics.ListAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer


class BookDetailsView(generics.RetrieveAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer

