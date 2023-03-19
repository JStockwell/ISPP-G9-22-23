from django.contrib import admin
from .models import MetricInfo, Metric, Measure

# Register your models here.
@admin.register(MetricInfo)
class RequestDemoAdmin(admin.ModelAdmin):
  list_display = ["name", "unit"]
