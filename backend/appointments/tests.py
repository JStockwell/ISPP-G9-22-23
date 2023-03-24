from django.test import TestCase
from django.contrib.auth.models import User
from rest_framework.test import APITestCase, APIClient
from rest_framework.views import status
from users.models import Patient
from appointments.models import Appointment
from appointments.serializer import SerializerCreateAppointment
from rest_framework.test import APIRequestFactory
from rest_framework.test import force_authenticate
from appointments.views import AppointmentList, AppointmentCreate, AppointmentId, AppointmentPatientId
from django.urls import reverse

class AppointmentListTest(APITestCase):
    def setUp(self):
        self.admin = User.objects.create(username="admin", email="admin@email.com", first_name="admin", last_name="admin")
        self.admin.set_password("passAdmin")
        self.admin.is_superuser = True
        self.admin.save()

        user1 = User.objects.create(username="user1", email="user1@email.com", first_name="nameUser1", last_name="lastUser1")
        user1.set_password("passUser1")
        user1.save()

        patient1 = Patient.objects.create(user=user1, tel='1234567890', birthdate='1990-01-01')
        patient1.save()

        appointment1 = Appointment.objects.create(date="2023-08-12", description= "descripcion", specialty="especialidad1", time="12:00", patient=patient1)
        appointment1.save()


        self.factory = APIRequestFactory()
        self.view = AppointmentList.as_view()

    def test_get_all_appointment(self):
        request = self.factory.get('appointments/appointment/list/')
        force_authenticate(request, self.admin)
        response = self.view(request)
        appointment = Appointment.objects.all()
        serializer = SerializerCreateAppointment(appointment, many=True)
        #self.assertEqual(response.data, serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

class AppointmentCreateTest(APITestCase):
    def setUp(self):
        self.admin = User.objects.create(username="admin", email="admin@email.com", first_name="admin", last_name="admin")
        self.admin.set_password("passAdmin")
        self.admin.is_superuser = True
        self.admin.save()

        user1 = User.objects.create(username="user1", email="user1@email.com", first_name="nameUser1", last_name="lastUser1")
        user1.set_password("passUser1")
        user1.save()

        patient1 = Patient.objects.create(user=user1, tel='1234567890', birthdate='1990-01-01')
        patient1.save()

        self.appointment_data = {
            "date": "2023-01-12",
            "description": "prueba cita 1",
            "specialty": "speciality prueba 1",
            "time": "13:40",
            "patient_id": patient1.id
        }

        self.factory = APIRequestFactory()
        self.view = AppointmentCreate.as_view()

    def test_create_correct_appointment(self):
        request = self.factory.post('/appointments/appointments/', self.appointment_data, format='json')
        force_authenticate(request, self.admin)
        response = self.view(request)

        #self.assertEqual(response.status_code, status.HTTP_200_OK)
        #self.assertEqual(response.data, self.appointment_data)

    def test_create_wrong_appointment(self):
        request = self.factory.post('/appointments/appointments/', {}, format='json')
        force_authenticate(request, self.admin)
        response = self.view(request)

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

class AppointmentIdTest(APITestCase):
    def setUp(self):
        self.admin = User.objects.create(username="admin", email="admin@email.com", first_name="admin", last_name="admin")
        self.admin.set_password("passAdmin")
        self.admin.is_superuser = True
        self.admin.save()

        user1 = User.objects.create(username="user1", email="user1@email.com", first_name="nameUser1", last_name="lastUser1")
        user1.set_password("passUser1")
        user1.save()

        patient1 = Patient.objects.create(user=user1, tel='1234567890', birthdate='1990-01-01')
        patient1.save()

        self.appointment1 = Appointment.objects.create(date="2023-08-12", description= "descripcion", specialty="especialidad1", time="12:00", patient=patient1)
        self.appointment1.save()

        self.factory = APIRequestFactory()
        self.view = AppointmentId.as_view()

    def test_get_valid_appointment(self):
        request = self.factory.get(reverse("id_appointments", kwargs={"pk":self.appointment1.id}))
        force_authenticate(request, self.admin)
        response = self.view(request, pk=self.appointment1.id)

        serializer = SerializerCreateAppointment(self.appointment1)
        #self.assertEqual(response.data, serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_invalid_appointment(self):
        request = self.factory.get(reverse("id_appointments", kwargs={"pk":123123123123}))
        force_authenticate(request, self.admin)
        response = self.view(request, pk=123123123123)

        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_delete_valid_appointment(self):
        request = self.factory.delete(reverse("id_appointments", kwargs={"pk":self.appointment1.id}))
        force_authenticate(request, self.admin)
        response = self.view(request, pk=self.appointment1.id)

        self.assertEqual(response.data["message"],"Cita con id: " +str(self.appointment1.id) +" borrado correctamente")  
        self.assertEqual(response.status_code, status.HTTP_200_OK)  

    def test_delete_invalid_appointment(self):
        request = self.factory.delete(reverse("id_appointments", kwargs={"pk":123123123123}))
        force_authenticate(request, self.admin)
        response = self.view(request, pk=123123123123)

        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)