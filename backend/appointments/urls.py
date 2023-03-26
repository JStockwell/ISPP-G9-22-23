from django.urls import path
from appointments.views import AppointmentList, AppointmentCreate, AppointmentId, AppointmentPatientId

urlpatterns = [
    path("appointments/list/", AppointmentList.as_view()),
    path("appointments/", AppointmentCreate.as_view()),
    path("appointments/<int:pk>/", AppointmentId.as_view(), name="id_appointments"),
    path("appointments/patient/<int:pk>/", AppointmentPatientId.as_view())
]