from django.urls import path
from metrics.views import MetricList, MetricCreate, MetricId, MeasureList, MeasureCreate, MeasureId, MetricListNameFromUser, MeasureLatestByUser

urlpatterns = [
    path("metrics/list/",MetricList.as_view()),
    path("metrics/",MetricCreate.as_view()),
    path("metrics/<int:pk>/",MetricId.as_view(), name="id_metrics"),
    path("metrics/list_by_user/", MetricListNameFromUser.as_view()),
    path("measures/list/",MeasureList.as_view()),
    path("measures/",MeasureCreate.as_view()),
    path("measures/<int:pk>/",MeasureId.as_view(), name="id_measures"),
    path("measures/latest_by_user/", MeasureLatestByUser.as_view()),
]