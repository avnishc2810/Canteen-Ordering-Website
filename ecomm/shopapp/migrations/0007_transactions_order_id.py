# Generated by Django 5.1.6 on 2025-03-20 19:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('shopapp', '0006_transactions'),
    ]

    operations = [
        migrations.AddField(
            model_name='transactions',
            name='order_id',
            field=models.CharField(blank=True, max_length=50, null=True, unique=True),
        ),
    ]
