from django.db import models

from django.core.validators import MaxValueValidator, MinValueValidator

class Question(models.Model):
    question = models.CharField(max_length=200)
    answer_1 = models.TextField(null=True)
    answer_2 = models.TextField(null=True)
    answer_3 = models.TextField(null=True)
    answer_4 = models.TextField(null=True)

    NUMBER_CHOICES = {1:1,2:2,3:3,4:4}
    correct_Answer = models.IntegerField(null = False, choices = NUMBER_CHOICES)

    def __str__(self):
        return self.question