from django.contrib.auth.models import User
from rest_framework.test import APITestCase, APIClient
from rest_framework.views import status
from diary_entries.models import PhysicalEntry, MentalEntry
from diary_entries.serializer import MentalEntrySerializer, PhysicalEntrySerializer
from rest_framework.test import APIRequestFactory
from rest_framework.test import force_authenticate
from diary_entries.views import PhysicalEntryList, MentalEntryList, PhysicalEntryCreate, MentalEntryCreate, PhysicalEntryId, MentalEntryId
from django.urls import reverse
from users.models import Patient


class PhysicalEntryListTest(APITestCase):
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
        
        physical_entry1 = PhysicalEntry.objects.create(date = "2023-01-29", state = "VG", body_parts = "HEAD", notes = "Lorem ipsum dolor", patient = patient1)
        physical_entry2 = PhysicalEntry.objects.create(date = "2022-06-29", state = "VB", body_parts = "TORSO", notes = "sit amet", patient = patient1)
        physical_entry1.save()
        physical_entry2.save()

        #Establecer factory (siempre igual) y vista a testear
        self.factory = APIRequestFactory()
        self.view = PhysicalEntryList.as_view()

    def test_get_all_physical_entries(self):
        request = self.factory.get('/diary_entries/physical_entry/list/')
        force_authenticate(request, self.admin)
        response = self.view(request)

        p_entries = PhysicalEntry.objects.all()
        serializer = PhysicalEntrySerializer(p_entries, many=True)
        self.assertEqual(response.data, serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

class MentalEntryListTest(APITestCase):
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
        
        mental_entry1 = MentalEntry.objects.create(date = "2023-01-29", state = "VG", weather = "STORMY", food = "FAST", sleep = "LIGHT", positive_thoughts = "lorem ipsum", negative_thoughts = "dolor sit", notes = "amet", patient = patient1)
        mental_entry2 = MentalEntry.objects.create(date = "2022-06-29", state = "VB", weather = "SUNNY", food = "HEALTHY", sleep = "NONE", positive_thoughts = "lorem ipsum", negative_thoughts = "dolor sit", notes = "amet", patient = patient1)
        mental_entry1.save()
        mental_entry2.save()
        
        #Establecer factory (siempre igual) y vista a testear
        self.factory = APIRequestFactory()
        self.view = MentalEntryList.as_view()

    def test_get_all_mental_entries(self):
        request = self.factory.get('diary_entries/mental_entry/list/')
        force_authenticate(request, self.admin)
        response = self.view(request)

        m_entries = MentalEntry.objects.all()
        serializer = MentalEntrySerializer(m_entries, many=True)
        self.assertEqual(response.data, serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class PhysicalEntryCreateTest(APITestCase):
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

        self.correct_entry_data = {
            "date": "2023-01-30",
            "state": "G",
            "body_parts": "TORSO",
            "notes": "good day",
            "patient_id":patient1.id
        }

        self.correct_entry_data_multiple_body_parts = {
            "date": "2023-01-30",
            "state": "G",
            "body_parts": "TORSO, HEAD",
            "notes": "good day",
            "patient_id":patient1.id
        }

        self.repeated_body_part_data = {
            "date": "2023-01-30",
            "state": "G",
            "body_parts": "TORSO, TORSO",
            "notes": "good day",
            "patient_id":patient1.id
        }

        self.incorrect_body_part_data = {
            "date": "2023-01-30",
            "state": "G",
            "body_parts": "torso",
            "notes": "good day",
            "patient_id":patient1.id
        }

        self.incorrect_state_data = {
            "date": "2023-01-30",
            "state": "GDay",
            "body_parts": "torso",
            "notes": "good day",
            "patient_id":patient1.id
        }

        self.incorrect_date_format = {
            "date": "30-10-2021",
            "state": "G",
            "body_parts": "torso",
            "notes": "good day",
            "patient_id":patient1.id
        }

        #Establecer factory (siempre igual) y vista a testear
        self.factory = APIRequestFactory()
        self.view = PhysicalEntryCreate.as_view()

    def test_create_correct_physical_entry(self):
        # create user
        request = self.factory.post('/diary_entries/physical_entry/', self.correct_entry_data, format='json')
        force_authenticate(request, self.admin)
        response = self.view(request)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, self.correct_entry_data)

    def test_create_correct_physical_entry_multiple_body_parts(self):
        # create user
        request = self.factory.post('/diary_entries/physical_entry/', self.correct_entry_data_multiple_body_parts, format='json')
        force_authenticate(request, self.admin)
        response = self.view(request)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, self.correct_entry_data_multiple_body_parts)

    def test_create_wrong(self):
        request = self.factory.post('/diary_entries/physical_entry/', {}, format='json')
        force_authenticate(request, self.admin)
        response = self.view(request)

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_create_repeated_body_part(self):
        request = self.factory.post('/diary_entries/physical_entry/', self.repeated_body_part_data, format='json')
        force_authenticate(request, self.admin)
        response = self.view(request)

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data["body_parts"][0],"Recuerda no repetir partes del cuerpo")

    def test_create_incorrect_body_part(self):
        request = self.factory.post('/diary_entries/physical_entry/', self.incorrect_body_part_data, format='json')
        force_authenticate(request, self.admin)
        response = self.view(request)

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data["body_parts"][0],"Elige partes del cuerpo válidas (HEAD, TORSO, LEFT_ARM, RIGHT_ARM, LEFT_LEG, RIGHT_LEG)")

    def test_create_incorrect_state(self):
        request = self.factory.post('/diary_entries/physical_entry/', self.incorrect_state_data, format='json')
        force_authenticate(request, self.admin)
        response = self.view(request)

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
##        self.assertEqual(response.data["state"][0],'\"GDay\"no es una elección válida.')

    def test_create_incorrect_date_format(self):
        request = self.factory.post('/diary_entries/physical_entry/', self.incorrect_date_format, format='json')
        force_authenticate(request, self.admin)
        response = self.view(request)

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data["date"][0],"Fecha con formato erróneo. Use uno de los siguientes formatos en su lugar: YYYY-MM-DD.")

class MentalEntryCreateTest(APITestCase):
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


        self.correct_data = {
            "date": "2022-07-31",
            "state": "VB",
            "weather": "SUNNY",
            "food": "HEALTHY",
            "sleep": "LIGHT",
            "positive_thoughts": "im doing very well at math",
            "negative_thoughts": "this is taking far too long",
            "notes": "im sad and tired",
            "patient_id":patient1.id
        }

        self.incorrect_weather_data = {
            "date": "2022-07-31",
            "state": "VB",
            "weather": "SUNNi",
            "food": "HEALTHY",
            "sleep": "LIGHT",
            "positive_thoughts": "im doing very well at math",
            "negative_thoughts": "this is taking far too long",
            "notes": "im sad and tired",
            "patient_id":patient1.id
        }

        self.incorrect_food_data = {
            "date": "2022-07-31",
            "state": "VB",
            "weather": "SUNNY",
            "food": "HEALTHi",
            "sleep": "LIGHT",
            "positive_thoughts": "im doing very well at math",
            "negative_thoughts": "this is taking far too long",
            "notes": "im sad and tired",
            "patient_id":patient1.id
        }

        self.incorrect_sleep_data = {
            "date": "2022-07-31",
            "state": "VB",
            "weather": "SUNNY",
            "food": "HEALTHY",
            "sleep": "LIGHt",
            "positive_thoughts": "im doing very well at math",
            "negative_thoughts": "this is taking far too long",
            "notes": "im sad and tired",
            "patient_id":patient1.id
        }

        #Establecer factory (siempre igual) y vista a testear
        self.factory = APIRequestFactory()
        self.view = MentalEntryCreate.as_view()

    def test_create_correct_data(self):
        request = self.factory.post('/diary_entry/mental_entry/', self.correct_data, format='json')
        force_authenticate(request, self.admin)
        response = self.view(request)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, self.correct_data)

    def test_create_wrong_data(self):
        request = self.factory.post('/diary_entry/mental_entry/', {}, format='json')
        force_authenticate(request, self.admin)
        response = self.view(request)

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_create_incorrect_weather_data(self):
        request = self.factory.post('/diary_entry/mental_entry/', self.incorrect_weather_data, format='json')
        force_authenticate(request, self.admin)
        response = self.view(request)

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data["weather"][0],"Elige un tiempo atmosférico válido (SNOWY, RAINY, CLOUDY, STORMY, SUNNY)")

    def test_create_incorrect_food_data(self):
        request = self.factory.post('/diary_entry/mental_entry/', self.incorrect_food_data, format='json')
        force_authenticate(request, self.admin)
        response = self.view(request)

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data["food"][0],"Elige un tipo de comida válido (NONE, FAST, HEALTHY)")  

    def test_create_sleep_data(self):
        request = self.factory.post('/diary_entry/mental_entry/', self.incorrect_sleep_data, format='json')
        force_authenticate(request, self.admin)
        response = self.view(request)

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data["sleep"][0],"Elige una cantidad de sueño válida (NONE, LIGHT, DEEP)")  

class PhysicalEntryIdTest(APITestCase):
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
        

        self.physical_entry1 = PhysicalEntry.objects.create(date = "2023-01-29", state = "VG", body_parts = "HEAD", notes = "Lorem ipsum dolor", patient=patient1)
        self.physical_entry1.save()

        #Establecer factory (siempre igual) y vista a testear
        self.factory = APIRequestFactory()
        self.view = PhysicalEntryId.as_view()


    def test_get_valid_physical_entry(self):
        request = self.factory.get(reverse("id_physical_entry", kwargs={"pk":self.physical_entry1.id}))
        force_authenticate(request, self.admin)
        response = self.view(request, pk=self.physical_entry1.id)

        serializer = PhysicalEntrySerializer(self.physical_entry1)
        self.assertEqual(response.data, serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)


    def test_delete_valid_physical_entry(self):
        request = self.factory.delete(reverse("id_physical_entry", kwargs={"pk":self.physical_entry1.id}))
        force_authenticate(request, self.admin)
        response = self.view(request, pk=self.physical_entry1.id)

        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        
class MentalEntryIdTest(APITestCase):
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

        self.mental_entry1 = MentalEntry.objects.create(date = "2022-06-29", state = "VB", weather = "SUNNY", food = "HEALTHY", sleep = "NONE", positive_thoughts = "lorem ipsum", negative_thoughts = "dolor sit", notes = "amet", patient=patient1)
        self.mental_entry1.save()

        #Establecer factory (siempre igual) y vista a testear
        self.factory = APIRequestFactory()
        self.view = MentalEntryId.as_view()


    def test_get_valid_mental_entry(self):
        request = self.factory.get(reverse("id_mental_entry", kwargs={"pk":self.mental_entry1.id}))
        force_authenticate(request, self.admin)
        response = self.view(request, pk=self.mental_entry1.id)

        serializer = MentalEntrySerializer(self.mental_entry1)
        self.assertEqual(response.data, serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)


    def test_delete_valid_mental_entry(self):
        request = self.factory.delete(reverse("id_mental_entry", kwargs={"pk":self.mental_entry1.id}))
        force_authenticate(request, self.admin)
        response = self.view(request, pk=self.mental_entry1.id)

        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

'''
    def test_get_invalid_physical_entry(self):
        request = self.factory.get(reverse("id_physical_entry", kwargs={"pk":123123123123}))
        force_authenticate(request, self.admin)
        response = self.view(request, pk=123123123123)

        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_delete_invalid_physical_entry(self):
        request = self.factory.delete(reverse("id_physical_entry", kwargs={"pk":123123123123}))
        force_authenticate(request, self.admin)
        response = self.view(request, pk=123123123123)

        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_get_invalid_mental_entry(self):
        request = self.factory.get(reverse("id_mental_entry", kwargs={"pk":123123123123}))
        force_authenticate(request, self.admin)
        response = self.view(request, pk=123123123123)

        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_delete_invalid_mental_entry(self):
        request = self.factory.delete(reverse("id_mental_entry", kwargs={"pk":123123123123}))
        force_authenticate(request, self.admin)
        response = self.view(request, pk=123123123123)

        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

'''