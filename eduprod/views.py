from django.core import serializers
from django.shortcuts import render
from .models import Question
from django.contrib.auth.decorators import login_required

@login_required
def index(request):
    #Get 10 Random Questions From DataBase And Hand Them To Index.html
    questions = Question.objects.order_by("?")[:10]
    questions_json = serializers.serialize('json', questions)
    return render(request, 'eduprod/index.html', {'questions_json': questions_json})