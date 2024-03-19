from django.db import models

class Question(models.Model):
    question = models.CharField(max_length=200)
    answer_1 = models.TextField(null=True)
    answer_2 = models.TextField(null=True)
    answer_3 = models.TextField(null=True)
    answer_4 = models.TextField(null=True)
    correct_Answer = models.IntegerField(null=True)

    def __str__(self):
        return self.question