# Generated by Django 5.0.1 on 2024-03-18 09:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('eduprod', '0004_question_answer_text2'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='question',
            name='answer_text',
        ),
        migrations.AddField(
            model_name='question',
            name='answer_correct',
            field=models.IntegerField(null=True),
        ),
        migrations.AddField(
            model_name='question',
            name='answer_text1',
            field=models.TextField(null=True),
        ),
        migrations.AddField(
            model_name='question',
            name='answer_text3',
            field=models.TextField(null=True),
        ),
        migrations.AddField(
            model_name='question',
            name='answer_text4',
            field=models.TextField(null=True),
        ),
    ]