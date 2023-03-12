from django.contrib.auth.models import User
from rest_framework.test import APITestCase, APIClient
from rest_framework.views import status
from metrics.models import Metric, Measure
from metrics.serializer import MetricSerializer, MeasureSerializer
from rest_framework.test import APIRequestFactory
from rest_framework.test import force_authenticate
from metrics.views import MetrictList, MeasureList, MetricCreate, MeasureCreate, MetrictId, MeasureId
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

        measure1 = Metric.objects.create(date='2023-03-11 14:00:00', value='5.00', metric=metric1, user=patient1)
        measure2 = Metric.objects.create(date='2023-03-01 14:00:00', value='10.00', metric=metric2, user=patient2)
        measure1.save()
        measure2.save()

        self.factory = APIRequestFactory()
        self.view = MeasureList.as_view()

    def test_get_all_measures(self):
        request = self.factory.get('metrics/measures/list/')
        force_authenticate(request, self.admin)
        response = self.view(request)
        measures = Measure.objects.all()
        serializer = MeasureSerializer(measeure, many=True)
        self.assertEqual(response.data, serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

class MetricCreateTest(APITestCase):
    def setUp(self):
        self.admin = User.objects.create(username="admin", email="admin@email.com", first_name="admin", last_name="admin")
        self.admin.set_password("passAdmin")
        self.admin.is_superuser = True
        self.admin.save()

        metric1 = Metric.objects.create(name="metric1", unit="unit1", min_value="2.00", max_value="15.00")
        metric1.save()

        self.metric_data = {
            "name": "metric1",
            "value": "value1",
            "min_value": "1.00",
            "max_value": "15.00",
        }

        self.factory = APIRequestFactory()
        self.view = MetricCreate.as_view()

    def test_create_correct_metric(sel):
        request = self.factory.post('/metrics/metrics/', self.metric_data, format='json')
        force_authenticate(request, self.admin)
        response = self.view(request)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, self.metric_data)

    def test_create_wrong_metric(self):
        equest = self.factory.post('/metrics/metrics/', {}, format='json')
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
            "date": "2023-03-01",
            "value": 5.00,
            "metricName": "metric1",
            "tlf": "1234567890",
        }

        self.metricName_no_found = {
            "date": "2023-03-01",
            "value": 5.00,
            "metricName": "metric2",
            "tlf": "1234567890",
        }

        self.tlf_no_found = {
            "date": "2023-03-01",
            "value": "5.0",
            "metricName": "metric1",
            "tlf": "1234567888890",
        }

        self.factory = APIRequestFactory()
        self.view = MeasureCreate.as_view()

    def test_create_correct_measure(sel):
        request = self.factory.post('/metrics/metrics/', self.measure_data, format='json')
        force_authenticate(request, self.admin)
        response = self.view(request)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, self.metric_data)

    def test_create_wrong_measure(self):
        equest = self.factory.post('/metrics/measures/', {}, format='json')
        force_authenticate(request, self.admin)
        response = self.view(request)

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_metricName_no_found(self):
        equest = self.factory.post('/metrics/measures/', self.metricName_no_found, format='json')
        force_authenticate(request, self.admin)
        response = self.view(request)

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data["error"],"No existe ninguna metrica con dicho nombre")

    def test_username_no_found(self):
        equest = self.factory.post('/metrics/measures/', self.tlf_no_found, format='json')
        force_authenticate(request, self.admin)
        response = self.view(request)

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data["error"],"No existe ningun usuario con dicho username")

class MetricIdTest(APITestCase):
    def setUp(self):
        self.admin = User.objects.create(username="admin", email="admin@email.com", first_name="admin", last_name="admin")
        self.admin.set_password("passAdmin")
        self.admin.is_superuser = True
        self.admin.save()

        metric1 = Metric.objects.create(name="metric1", unit="unit1", min_value="2.00", max_value="15.00")
        metric1.save()

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

        measure1 = Metric.objects.create(date='2023-03-11 14:00:00', value='5.00', metric=metric1, user=patient1)
        measure1.save()

        self.factory = APIRequestFactory()
        self.view = MeasureId.as_view()

    def test_get_valid_measure(self):
        request = self.factory.get(reverse("id_measures", kwargs={"pk":self.measure1.id}))
        force_authenticate(request, self.admin)
        response = self.view(request, pk=self.measure1.id)

        serializer = MeasureSerializer(self.metric1)
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

        self.assertEqual(response.data["message"],"Measure con id: " +str(self.measure1.id) +" borrado correctamente")  
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_delete_invalid_measure(self):
        request = self.factory.delete(reverse("id_measures", kwargs={"pk":123123123123}))
        force_authenticate(request, self.admin)
        response = self.view(request, pk=123123123123)

        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)