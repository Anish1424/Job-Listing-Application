from django.db import models

class Job(models.Model):
    job_name = models.CharField(max_length=255)
    job_description = models.TextField()
    experience = models.IntegerField()
    salary = models.DecimalField(max_digits=10, decimal_places=2)
    location = models.CharField(max_length=255)

    def __str__(self):
        return self.job_name
