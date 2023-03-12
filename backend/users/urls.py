from django.urls import path
from users.views import PatientList, PatientCreate, PatientId, MedicList, MedicCreate, MedicId

urlpatterns = [
    path("patients/list/", PatientList.as_view()),
    path("patients/", PatientCreate.as_view()),
    path("patients/<int:pk>/", PatientId.as_view(), name="id_patients"),
    path("medics/list/", MedicList.as_view()),
    path("medics/", MedicCreate.as_view()),
    path("medics/<int:pk>/", MedicId.as_view(), name="id_medics"),
]