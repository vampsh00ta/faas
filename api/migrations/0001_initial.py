# Generated by Django 4.1.3 on 2022-11-16 08:54

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='BannedWallet',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('tx', models.CharField(max_length=300)),
                ('date', models.DateTimeField()),
                ('wallet', models.CharField(max_length=50)),
                ('reason', models.CharField(max_length=300)),
                ('banned_by', models.CharField(max_length=50)),
            ],
        ),
    ]
