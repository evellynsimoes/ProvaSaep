from django.urls import path
from .views import *

urlpatterns = [
    path('usuario/', view = UsuarioListCreateAPIView.as_view()),
    path('usuario/<int:pk>', view=UsuarioRetrieveUpdateDestroyAPIView.as_view()),
    path('tarefa/', view = TarefaListCreateAPIView.as_view()),
    path('tarefa/<int:pk>', view=TarefaRetrieveUpdateDestroyAPIView.as_view())
]