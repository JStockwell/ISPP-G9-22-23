from django.contrib import admin

# Register your models here.
from .models import Profile, Patient, Medic
 
@admin.register(Profile)
class RequestDemoAdmin(admin.ModelAdmin):
  list_display = [field.name for field in
Profile._meta.get_fields()]

@admin.register(Patient)
class RequestDemoAdmin(admin.ModelAdmin):
  list_display = ["code"]

@admin.register(Medic)
class RequestDemoAdmin(admin.ModelAdmin):
  list_display = []
