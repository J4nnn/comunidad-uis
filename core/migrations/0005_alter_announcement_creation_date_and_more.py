# Generated by Django 5.1.3 on 2024-11-30 23:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0004_alter_group_schedule'),
    ]

    operations = [
        migrations.AlterField(
            model_name='announcement',
            name='creation_date',
            field=models.CharField(),
        ),
        migrations.AlterField(
            model_name='announcement',
            name='expiration_date',
            field=models.CharField(),
        ),
    ]
