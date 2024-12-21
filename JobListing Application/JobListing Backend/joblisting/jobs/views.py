from django.shortcuts import render

from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Job
from django.forms.models import model_to_dict
from django.http import HttpResponse

def home(request):
    return HttpResponse("Welcome to the Job Listing Application!")

@api_view(['GET'])
def get_jobs(request):
    jobs = Job.objects.all()
    job_list = [model_to_dict(job) for job in jobs]
    return Response(job_list)

@api_view(['POST'])
def add_job(request):
    data = request.data
    job = Job.objects.create(
        job_name=data['job_name'],
        job_description=data['description'],
        experience=data['experience'],
        salary=data['salary'],
        location=data['location']
    )
    return Response({'message': 'Job added successfully', 'job': model_to_dict(job)})

@api_view(['DELETE'])
def delete_job(request, job_id):
    try:
        job = Job.objects.get(id=job_id)
        job.delete()
        return Response({'message': 'Job deleted successfully'})
    except Job.DoesNotExist:
        return Response({'error': 'Job not found'}, status=404)

