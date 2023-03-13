from django.contrib.auth.models import User
from rest_framework.test import APITestCase, APIClient
from rest_framework.views import status
from users.models import Patient, Profile
from metrics.models import Metric, Measure
from metrics.serializer import MetricSerializer, MeasureSerializer, SerializerMetricName
from rest_framework.test import APIRequestFactory
from rest_framework.test import force_authenticate
from metrics.views import MetricList, MeasureList, MetricCreate, MeasureCreate, MetricId, MeasureId, MeasureLatestByUser, MetricListName
from django.urls import reverse

class MetricListTest(APITestCase):
    def setUp(self):
        self.admin = User.objects.create(username="admin", email="admin@email.com", first_name="admin", last_name="admin")
        self.admin.set_password("passAdmin")
        self.admin.is_superuser = True
        self.admin.save()

        metric1 = Metric.objects.create(name="metric1", unit="unit1", min_value="2.00", max_value="15.00")
        metric2 = Metric.objects.create(name="metric2", unit="unit2", min_value="1.00", max_value="16.00")
        metric1.save()
        metric2.save()

        self.factory = APIRequestFactory()
        self.view = MetricList.as_view()

    def test_get_all_metrics(self):
        request = self.factory.get('metrics/metrics/list/')
        force_authenticate(request, self.admin)
        response = self.view(request)
        metrics = Metric.objects.all()
        serializer = MetricSerializer(metrics, many=True)
        self.assertEqual(response.data, serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

class MeasureListTest(APITestCase):
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

        metric1 = Metric.objects.create(name="metric1", unit="unit1", min_value="2.00", max_value="15.00")
        metric2 = Metric.objects.create(name="metric2", unit="unit2", min_value="1.00", max_value="16.00")
        metric1.save()
        metric2.save()

        patient1 = Patient.objects.create(user=user1, tel='1234567890', birthdate='1990-01-01')
        patient2 = Patient.objects.create(user=user2, tel='0987654321', birthdate='1995-05-05')
        patient1.save()
        patient2.save()

        # formato fecha (yyyy, mm, dd, hh, mm, ss, ms)
        measure1 = Measure.objects.create(value='5.00', metric=metric1, user=patient1)
        measure2 = Measure.objects.create(value='10.00', metric=metric2, user=patient2)
        measure1.save()
        measure2.save()

        self.factory = APIRequestFactory()
        self.view = MeasureList.as_view()

    def test_get_all_measures(self):
        request = self.factory.get('metrics/measures/list/')
        force_authenticate(request, self.admin)
        response = self.view(request)
        measure = Measure.objects.all()
        serializer = MeasureSerializer(measure, many=True)
        self.assertEqual(response.data, serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

class MetricCreateTest(APITestCase):
    def setUp(self):
        self.admin = User.objects.create(username="admin", email="admin@email.com", first_name="admin", last_name="admin")
        self.admin.set_password("passAdmin")
        self.admin.is_superuser = True
        self.admin.save()

        self.metric_data = {
            "name": "metric1000",
            "unit": "unit1",
            "min_value": 1.00,
            "max_value": 15.00
        }

        self.factory = APIRequestFactory()
        self.view = MetricCreate.as_view()

    def test_create_correct_metric(self):
        request = self.factory.post('/metrics/metrics/', self.metric_data, format='json')
        force_authenticate(request, self.admin)
        response = self.view(request)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, self.metric_data)

    def test_create_wrong_metric(self):
        request = self.factory.post('/metrics/metrics/', {}, format='json')
        force_authenticate(request, self.admin)
        response = self.view(request)

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

class MeasureCreateTest(APITestCase):
    def setUp(self):
        self.admin = User.objects.create(username="admin", email="admin@email.com", first_name="admin", last_name="admin")
        self.admin.set_password("passAdmin")
        self.admin.is_superuser = True
        self.admin.save()

        metric1 = Metric.objects.create(name="metric1", unit="unit1", min_value="2.00", max_value="15.00")
        metric1.save()

        user1 = User.objects.create(username="user1", email="user1@email.com", first_name="nameUser1", last_name="lastUser1")
        user1.set_password("passUser1")
        user1.save()

        patient1 = Patient.objects.create(user=user1, tel='1234567890', birthdate='1990-01-01')
        patient1.save()

        self.measure_data = {
            "value": 5.00,
            "metric_id": metric1.id,
            "patient_id": patient1.id
        }

        self.metric_no_found = {
            "value": 5.00,
            "metric_id": 12222,
            "patient_id": patient1.id
        }

        self.patient_no_found = {
            "value": 5.0,
            "metric_id": metric1.id,
            "patient_id": 111111111
        }

        self.factory = APIRequestFactory()
        self.view = MeasureCreate.as_view()

    def test_create_correct_measure(self):
        request = self.factory.post('/metrics/metrics/', self.measure_data, format='json')
        force_authenticate(request, self.admin)
        response = self.view(request)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, self.measure_data)

    def test_create_wrong_measure(self):
        request = self.factory.post('/metrics/measures/', {}, format='json')
        force_authenticate(request, self.admin)
        response = self.view(request)

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_metricName_no_found(self):
        request = self.factory.post('/metrics/measures/', self.metric_no_found, format='json')
        force_authenticate(request, self.admin)
        response = self.view(request)

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data["error"],"No existe ninguna metrica con dicho id")

    def test_username_no_found(self):
        request = self.factory.post('/metrics/measures/', self.patient_no_found, format='json')
        force_authenticate(request, self.admin)
        response = self.view(request)

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data["error"],"No existe ningun paciente con ese id")

class MetricIdTest(APITestCase):
    def setUp(self):
        self.admin = User.objects.create(username="admin", email="admin@email.com", first_name="admin", last_name="admin")
        self.admin.set_password("passAdmin")
        self.admin.is_superuser = True
        self.admin.save()

        self.metric1 = Metric.objects.create(name="metric1", unit="unit1", min_value=2.00, max_value=15.00)
        self.metric1.save()

        self.factory = APIRequestFactory()
        self.view = MetricId.as_view()

    def test_get_valid_metric(self):
        request = self.factory.get(reverse("id_metrics", kwargs={"pk":self.metric1.id}))
        force_authenticate(request, self.admin)
        response = self.view(request, pk=self.metric1.id)

        serializer = MetricSerializer(self.metric1)
        self.assertEqual(response.data, serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_invalid_metric(self):
        request = self.factory.get(reverse("id_metrics", kwargs={"pk":123123123123}))
        force_authenticate(request, self.admin)
        response = self.view(request, pk=123123123123)

        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_delete_valid_metric(self):
        request = self.factory.delete(reverse("id_metrics", kwargs={"pk":self.metric1.id}))
        force_authenticate(request, self.admin)
        response = self.view(request, pk=self.metric1.id)

        self.assertEqual(response.data["message"],"Metrica con id: " +str(self.metric1.id) +" borrado correctamente")  
        self.assertEqual(response.status_code, status.HTTP_200_OK)  

    def test_delete_invalid_metric(self):
        request = self.factory.delete(reverse("id_metrics", kwargs={"pk":123123123123}))
        force_authenticate(request, self.admin)
        response = self.view(request, pk=123123123123)

        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

class MeasureIdTest(APITestCase):
    def setUp(self):
        self.admin = User.objects.create(username="admin", email="admin@email.com", first_name="admin", last_name="admin")
        self.admin.set_password("passAdmin")
        self.admin.is_superuser = True
        self.admin.save()

        user1 = User.objects.create(username="user1", email="user1@email.com", first_name="nameUser1", last_name="lastUser1")
        user1.set_password("passUser1")
        user1.save()

        metric1 = Metric.objects.create(name="metric1", unit="unit1", min_value="2.00", max_value="15.00")
        metric1.save()

        patient1 = Patient.objects.create(user=user1, tel='1234567890', birthdate='1990-01-01')
        patient1.save()

        self.measure1 = Measure.objects.create(value='5.00', metric=metric1, user=patient1)
        self.measure1.save()

        self.factory = APIRequestFactory()
        self.view = MeasureId.as_view()

    def test_get_valid_measure(self):
        request = self.factory.get(reverse("id_measures", kwargs={"pk":self.measure1.id}))
        force_authenticate(request, self.admin)
        response = self.view(request, pk=self.measure1.id)

        serializer = MeasureSerializer(self.measure1)
        self.assertEqual(response.data, serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_invalid_measure(self):
        request = self.factory.get(reverse("id_measures", kwargs={"pk":123123123123}))
        force_authenticate(request, self.admin)
        response = self.view(request, pk=123123123123)

        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_delete_valid_measure(self):
        request = self.factory.delete(reverse("id_measures", kwargs={"pk":self.measure1.id}))
        force_authenticate(request, self.admin)
        response = self.view(request, pk=self.measure1.id)

        self.assertEqual(response.data["message"],"Measure con id: " + str(self.measure1.id) + " borrado correctamete")  
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_delete_invalid_measure(self):
        request = self.factory.delete(reverse("id_measures", kwargs={"pk":123123123123}))
        force_authenticate(request, self.admin)
        response = self.view(request, pk=123123123123)

        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

class MetricListNameTest(APITestCase):
    def setUp(self):
        self.admin = User.objects.create(username="admin", email="admin@email.com", first_name="admin", last_name="admin")
        self.admin.set_password("passAdmin")
        self.admin.is_superuser = True
        self.admin.save()

        metric1 = Metric.objects.create(name="metric1", unit="unit1", min_value="2.00", max_value="15.00")
        metric1.save()
        metric2 = Metric.objects.create(name="metric2", unit="unit2", min_value="4.00", max_value="15.00")
        metric2.save()
        metric3 = Metric.objects.create(name="metric3", unit="unit3", min_value="8.00", max_value="15.00")
        metric3.save()
        metric4 = Metric.objects.create(name="metric4", unit="unit4", min_value="10.00", max_value="15.00")
        metric4.save()

        self.factory = APIRequestFactory()
        self.view = MetricListName.as_view()
    
    def test_list_metrics_name(self):
        request = self.factory.get('MetricListName/metrics/list_names/')
        force_authenticate(request, self.admin)
        response = self.view(request)
        metrics = Metric.objects.all()
        serializer = SerializerMetricName(metrics, many=True)
        self.assertEqual(response.data, serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

class MeasureLatestByUserTest(APITestCase):
    def setUp(self):
        self.admin = User.objects.create(username="admin", email="admin@email.com", first_name="admin", last_name="admin")
        self.admin.set_password("passAdmin")
        self.admin.is_superuser = True
        self.admin.save()

        metric1 = Metric.objects.create(name="metric1", unit="unit1", min_value="2.00", max_value="15.00")
        metric1.save()
        metric2 = Metric.objects.create(name="metric2", unit="unit2", min_value="4.00", max_value="15.00")
        metric2.save()
        metric3 = Metric.objects.create(name="metric3", unit="unit3", min_value="8.00", max_value="15.00")
        metric3.save()
        metric4 = Metric.objects.create(name="metric4", unit="unit4", min_value="10.00", max_value="15.00")
        metric4.save()

        user1 = User.objects.create(username="user1", email="user1@email.com", first_name="nameUser1", last_name="lastUser1")
        user1.set_password("passUser1")
        user1.save()

        patient1 = Patient.objects.create(user=user1, tel='1234567890', birthdate='1990-01-01')
        patient1.save()

        measure1 = Measure.objects.create(value='5.00', metric=metric1, user=patient1)
        measure1.save()
        measure2 = Measure.objects.create(value='5.00', metric=metric2, user=patient1)
        measure2.save()
        measure3 = Measure.objects.create(value='5.00', metric=metric3, user=patient1)
        measure3.save()
        measure4 = Measure.objects.create(value='5.00', metric=metric4, user=patient1)
        measure4.save()

        self.funciona = {
            "id": patient1.id
        }

        self.no_funciona = {
            "id": 12
        }

        self.factory = APIRequestFactory()
        self.view = MeasureLatestByUser.as_view()

    def test_list_latest_measures_by_user(self):
        request = self.factory.post('measures/latest_by_user/', self.funciona, format='json')
        force_authenticate(request, self.admin)
        response = self.view(request)

        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_list_wrong_latest_measures_by_user(self):
        request = self.factory.post('measures/latest_by_user/', {}, format='json')
        force_authenticate(request, self.admin)
        response = self.view(request)

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_list_bad_id_latest_measures_by_user(self):
        request = self.factory.post('measures/latest_by_user/', self.no_funciona, format='json')
        force_authenticate(request, self.admin)
        response = self.view(request)

        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)