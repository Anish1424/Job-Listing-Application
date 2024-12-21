from django.urls import path
from . import views

urlpatterns = [
    path('jobs/', views.get_jobs, name='get_jobs'),
    path('jobs/add/', views.add_job, name='add_job'),  # Ensure this matches the frontend URL
    path('jobs/delete/<int:job_id>/', views.delete_job, name='delete_job'),
]
