from django.contrib import admin
from django.urls import path
from diary_entries.views import MentalEntryList, MentalEntryId, MentalEntryCreate, PhysicalEntryList, PhysicalEntryId, PhysicalEntryCreate, MentalEntryPatientList, PhysicalEntryPatientList

urlpatterns = [
    path('mental_entry/list/', MentalEntryList.as_view()),
    path('mental_entry/', MentalEntryCreate.as_view()),
    path('mental_entry/<int:pk>/', MentalEntryId.as_view(), name="id_mental_entry"),
    path('physical_entry/list/', PhysicalEntryList.as_view()),
    path('physical_entry/', PhysicalEntryCreate.as_view()),
    path('physical_entry/<int:pk>/', PhysicalEntryId.as_view(), name="id_physical_entry"),
    path('mental_entry/patient/<int:pk>/', MentalEntryPatientList.as_view()),
    path('physical_entry/patient/<int:pk>/', PhysicalEntryPatientList.as_view()),
]