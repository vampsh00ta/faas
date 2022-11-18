from celery import Celery
import requests
import django

from celery.schedules import crontab
import os
import json
from datetime import datetime
from django.conf import settings  # noqa
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'faas.settings')
app = Celery('faas', broker='redis://redis:6379/0', database='')

app.autodiscover_tasks(lambda: settings.INSTALLED_APPS)



app.conf.CELERYBEAT_SCHEDULE = {
    'getBanned': {
        'task': 'api.tasks.getBanned',
         "schedule": crontab(minute="*/30"),
    },
}