# Generated by Django 5.1.6 on 2025-03-17 17:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('shopapp', '0003_alter_cart_user'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='category',
            field=models.CharField(blank=True, choices=[('Eatables', 'EATABLES'), ('Drinks', 'DRINKS'), ('Meals', 'MEALS')], max_length=15, null=True),
        ),
    ]
