from django.db import models

class Usuario(models.Model):
    id = models.AutoField(primary_key=True)
    nome = models.CharField(max_length=15)
    email = models.EmailField(max_length=254)

    def __str__(self):
        return self.nome

class Tarefas(models.Model):
    escolha_prioridade = (
        ('B', 'Baixa'), 
        ('M', 'Média'),
        ('A', 'Alta')
    )
    
    escolha_status = (
        ('A', 'A fazer'),
        ('F', 'Fazendo'),
        ('P', 'Pronto')
    )

    id = models.AutoField(primary_key=True)
    idUsuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    descricao = models.TextField()
    setor = models.CharField(max_length=100, blank=True, null=True)
    prioridade = models.CharField(max_length=20, choices=escolha_prioridade)
    status = models.CharField(max_length=20, choices=escolha_status, default='A')