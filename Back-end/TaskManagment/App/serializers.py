from rest_framework import serializers
from .models import *

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = '__all__'

class TarefaSerializer(serializers.ModelSerializer):
    idUsuario = serializers.PrimaryKeyRelatedField(queryset=Usuario.objects.all())
    usuario_nome = serializers.CharField(source = 'idUsuario.nome', read_only = True)

    class Meta:
        model = Tarefas
        fields = ['id', 'descricao', 'setor', 'prioridade', 'status', 'idUsuario', 'usuario_nome']