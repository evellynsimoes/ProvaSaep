from django.shortcuts import render
from .models import *
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView, ListAPIView
from .serializers import UsuarioSerializer, TarefaSerializer

class UsuarioListCreateAPIView(ListCreateAPIView):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer

class UsuarioRetrieveUpdateDestroyAPIView(RetrieveUpdateDestroyAPIView):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer
    lookup_field = 'pk'

class TarefaListCreateAPIView(ListCreateAPIView):
    queryset = Tarefas.objects.all()
    serializer_class = TarefaSerializer

class TarefaRetrieveUpdateDestroyAPIView(RetrieveUpdateDestroyAPIView):
    queryset = Tarefas.objects.all()
    serializer_class = TarefaSerializer
    lookup_field = 'pk'