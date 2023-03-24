from django.urls import path
from metrics.views import MetricList, MetricCreate, MetricId, MeasureList, MeasureCreate, MeasureId, MetricListInfo, MeasurePatientId, MetricPatientId, LatestMeasurePatientIdMetricId, NotUsedMetricInfoByPatient

urlpatterns = [
    path("metrics/list/",MetricList.as_view()),
    path("metrics/",MetricCreate.as_view()),
    path("metrics/<int:pk>/",MetricId.as_view(), name="id_metrics"),
    path("measures/list/",MeasureList.as_view()),
    path("measures/",MeasureCreate.as_view()),
    path("measures/<int:pk>/",MeasureId.as_view(), name="id_measures"),
    path("info/list/", MetricListInfo.as_view()),
    path("info/not_used/<int:pk>/",NotUsedMetricInfoByPatient.as_view(), name="id_measures"),
    path("metrics/patient/<int:pk>/", MetricPatientId.as_view()),
    path("measures/patient/<int:pk>/", MeasurePatientId.as_view()),
    path("measures/patient/<int:patient_pk>/metric/<int:metric_pk>/", LatestMeasurePatientIdMetricId.as_view())

]