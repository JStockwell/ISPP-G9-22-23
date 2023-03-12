from django.contrib.auth.models import User
from rest_framework.test import APITestCase, APIClient
from rest_framework.views import status
from users.models import Patient, Medic
from users.serializer import PatientSerializer, MedicSerializer
from rest_framework.test import APIRequestFactory
from rest_framework.test import force_authenticate
from users.views import PatientList, MedicList, PatientCreate, MedicCreate, PatientId, MedicId
from django.urls import reverse


class PatientListTest(APITestCase):
    def setUp(self):
        self.admin = User.objects.create(username="admin", email="admin@email.com", first_name="admin", last_name="admin")
        self.admin.set_password("passAdmin")
        self.admin.is_superuser = True
        self.admin.save()

        user1 = User.objects.create(username="user1", email="user1@email.com", first_name="nameUser1", last_name="lastUser1")
        user1.set_password("passUser1")
        user2 = User.objects.create(username="user2", email="user2@email.com", first_name="nameUser2", last_name="lastUser2")
        user2.set_password("passUser2")
        user1.save()
        user2.save()
        
        patient1 = Patient.objects.create(user=user1, tel='1234567890', birthdate='1990-01-01')
        patient2 = Patient.objects.create(user=user2, tel='0987654321', birthdate='1995-05-05')
        patient1.save()
        patient2.save()

        #Establecer factory (siempre igual) y vista a testear
        self.factory = APIRequestFactory()
        self.view = PatientList.as_view()

    def test_get_all_patients(self):
        request = self.factory.get('/users/patients/list/')
        force_authenticate(request, self.admin)
        response = self.view(request)

        patients = Patient.objects.all()
        serializer = PatientSerializer(patients, many=True)
        self.assertEqual(response.data, serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

class MedicListTest(APITestCase):
    def setUp(self):
        self.admin = User.objects.create(username="admin", email="admin@email.com", first_name="admin", last_name="admin")
        self.admin.set_password("passAdmin")
        self.admin.is_superuser = True
        self.admin.save()

        user1 = User.objects.create(username="user1", email="user1@email.com", first_name="nameUser1", last_name="lastUser1")
        user1.set_password("passUser1")
        user2 = User.objects.create(username="user2", email="user2@email.com", first_name="nameUser2", last_name="lastUser2")
        user2.set_password("passUser2")
        user3 = User.objects.create(username="user3", email="user3@email.com", first_name="nameUser3", last_name="lastUser3")
        user3.set_password("passUser3")
        user1.save()
        user2.save()
        user3.save()
        
        patient1 = Patient.objects.create(user=user1, tel='1234567890', birthdate='1990-01-01')
        patient2 = Patient.objects.create(user=user2, tel='0987654321', birthdate='1995-05-05')
        patient1.save()
        patient2.save()

        medic = Medic.objects.create(user=user3, tel='123456789011', birthdate='1991-01-01')
        medic.patients.set([patient1, patient2])
        medic.save()
        
        #Establecer factory (siempre igual) y vista a testear
        self.factory = APIRequestFactory()
        self.view = MedicList.as_view()

    def test_get_all_medics(self):
        request = self.factory.get('/users/medics/list/')
        force_authenticate(request, self.admin)
        response = self.view(request)

        medics = Medic.objects.all()
        serializer = MedicSerializer(medics, many=True)
        self.assertEqual(response.data, serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class PatientCreateTest(APITestCase):
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

        self.patient_data = {
            "tel": "1234567890",
            "birthdate": "1990-01-01",
            "username": "patient1",
            "password": "password",
            "first_name": "John",
            "last_name": "Doe",
            "email": "patient1@example.com"
        }

        self.repeated_email_data = {
            "tel": "1234567890",
            "birthdate": "1990-01-01",
            "username": "patient2",
            "password": "password",
            "first_name": "John",
            "last_name": "Doe",
            "email": "user1@email.com"
        }

        self.repeated_username = {
            "tel": "1234567890",
            "birthdate": "1990-01-01",
            "username": "user1",
            "password": "password",
            "first_name": "John",
            "last_name": "Doe",
            "email": "userNew@email.com"
        }

        #Establecer factory (siempre igual) y vista a testear
        self.factory = APIRequestFactory()
        self.view = PatientCreate.as_view()

    def test_create_correct_patient(self):
        # create user
        request = self.factory.post('/users/patients/', self.patient_data, format='json')
        force_authenticate(request, self.admin)
        response = self.view(request)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, self.patient_data)

    def test_create_wrong_patient(self):
        request = self.factory.post('/users/patients/', {}, format='json')
        force_authenticate(request, self.admin)
        response = self.view(request)

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_repeated_email_patient(self):
        request = self.factory.post('/users/patients/', self.repeated_email_data, format='json')
        force_authenticate(request, self.admin)
        response = self.view(request)

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data["error"],"Ya existe un usuario con ese email")

    def test_repeated_username_patient(self):
        request = self.factory.post('/users/patients/', self.repeated_username, format='json')
        force_authenticate(request, self.admin)
        response = self.view(request)

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data["error"],"Ya existe un usuario con ese nombre de usuario")


class MedicCreateTest(APITestCase):
    def setUp(self):
        self.admin = User.objects.create(username="admin", email="admin@email.com", first_name="admin", last_name="admin")
        self.admin.set_password("passAdmin")
        self.admin.is_superuser = True
        self.admin.save()

        user1 = User.objects.create(username="user1", email="user1@email.com", first_name="nameUser1", last_name="lastUser1")
        user1.set_password("passUser1")
        user1.save()
        
        medic1 = Medic.objects.create(user=user1, tel='1234567890', birthdate='1990-01-01')
        medic1.save()

        self.medic_data = {
            "tel": "1234567890",
            "birthdate": "1990-01-01",
            "username": "medic1",
            "password": "password",
            "first_name": "John",
            "last_name": "Doe",
            "email": "medic1@example.com"
        }

        self.repeated_email_data = {
            "tel": "1234567890",
            "birthdate": "1990-01-01",
            "username": "medic2",
            "password": "password",
            "first_name": "John",
            "last_name": "Doe",
            "email": "user1@email.com"
        }

        self.repeated_username = {
            "tel": "1234567890",
            "birthdate": "1990-01-01",
            "username": "user1",
            "password": "password",
            "first_name": "John",
            "last_name": "Doe",
            "email": "userNew@email.com"
        }

        #Establecer factory (siempre igual) y vista a testear
        self.factory = APIRequestFactory()
        self.view = MedicCreate.as_view()

    def test_create_correct_medic(self):
        request = self.factory.post('/users/medics/', self.medic_data, format='json')
        force_authenticate(request, self.admin)
        response = self.view(request)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, self.medic_data)

    def test_create_wrong_medic(self):
        request = self.factory.post('/users/medics/', {}, format='json')
        force_authenticate(request, self.admin)
        response = self.view(request)

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_repeated_email_medic(self):
        request = self.factory.post('/users/medics/', self.repeated_email_data, format='json')
        force_authenticate(request, self.admin)
        response = self.view(request)

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data["error"],"Ya existe un usuario con ese email")

    def test_repeated_username_medic(self):
        request = self.factory.post('/users/medics/', self.repeated_username, format='json')
        force_authenticate(request, self.admin)
        response = self.view(request)

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data["error"],"Ya existe un usuario con ese nombre de usuario")  


class PatientIdTest(APITestCase):
    def setUp(self):
        self.admin = User.objects.create(username="admin", email="admin@email.com", first_name="admin", last_name="admin")
        self.admin.set_password("passAdmin")
        self.admin.is_superuser = True
        self.admin.save()

        user1 = User.objects.create(username="user1", email="user1@email.com", first_name="nameUser1", last_name="lastUser1")
        user1.set_password("passUser1")
        user1.save()
        
        self.patient1 = Patient.objects.create(user=user1, tel='1234567890', birthdate='1990-01-01')
        self.patient1.save()

        #Establecer factory (siempre igual) y vista a testear
        self.factory = APIRequestFactory()
        self.view = PatientId.as_view()

    def test_get_valid_patient(self):
        request = self.factory.get(reverse("id_patients", kwargs={"pk":self.patient1.id}))
        force_authenticate(request, self.admin)
        response = self.view(request, pk=self.patient1.id)

        serializer = PatientSerializer(self.patient1)
        self.assertEqual(response.data, serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_invalid_patient(self):
        request = self.factory.get(reverse("id_patients", kwargs={"pk":123123123123}))
        force_authenticate(request, self.admin)
        response = self.view(request, pk=123123123123)

        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_delete_valid_patient(self):
        request = self.factory.delete(reverse("id_patients", kwargs={"pk":self.patient1.id}))
        force_authenticate(request, self.admin)
        response = self.view(request, pk=self.patient1.id)

        self.assertEqual(response.data["message"],"Paciente con id: " +str(self.patient1.id) +" borrado correctamente")  
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_delete_invalid_patient(self):
        request = self.factory.delete(reverse("id_patients", kwargs={"pk":123123123123}))
        force_authenticate(request, self.admin)
        response = self.view(request, pk=123123123123)

        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)