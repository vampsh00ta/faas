from django.db import models,transaction

# Create your models here.
class BannedWallet(models.Model):
    id = models.AutoField(primary_key = True)
    tx = models.CharField(max_length=300)
    date = models.DateTimeField()
    wallet =  models.CharField(max_length=50)
    reason = models.CharField(max_length=300)
    banned_by = models.CharField(max_length=50)
    def __str__(self):
        return f'{self.wallet}'