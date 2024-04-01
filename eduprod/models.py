from django.db import models

class Question(models.Model):
    question = models.CharField(max_length=150)
    answer_1 = models.TextField(max_length=150, null=True)
    answer_2 = models.TextField(max_length=150, null=True)
    answer_3 = models.TextField(max_length=150, null=True)
    answer_4 = models.TextField(max_length=150, null=True)

    NUMBER_CHOICES = {1:1,2:2,3:3,4:4}
    correct_Answer = models.IntegerField(null = False, choices = NUMBER_CHOICES)

    def __str__(self):
        return self.question