from metrics.models import MetricInfo
import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'your_project.settings')
django.setup()

from django.contrib.auth.models import User

superuser = User.objects.create_superuser(username='admin', email='admin@example.com', password='adminpassword')
superuser.save()

m1 = MetricInfo(name='Glucosa', unit='mg/dL')
m1.save()

m2 = MetricInfo(name='Globulos rojos', unit='mill/mm^3')
m2.save()

m3 = MetricInfo(name='Globulos blancos', unit='ud/mm^3')
m3.save()

m4 = MetricInfo(name='Plaquetas', unit='ud/mm^3')
m4.save()

m5 = MetricInfo(name='Hemoglobina', unit='g/dL')
m5.save()

m6 = MetricInfo(name='Hematocrito', unit='%')
m6.save()

m7 = MetricInfo(name='Creatina', unit='mg/dL')
m7.save()

m8 = MetricInfo(name='Calcio', unit='mg/dL')
m8.save()

m9 = MetricInfo(name='Sodio', unit='mEq/L')
m9.save()

m10 = MetricInfo(name='Potasio', unit='mEq/L')
m10.save()

m11 = MetricInfo(name='Cloruro', unit='mEq/L')
m11.save()

m12 = MetricInfo(name='Dioxido de carbono', unit='mg/dL')
m12.save()

m13 = MetricInfo(name='Testosterona', unit='ng/dL')
m13.save()

m14 = MetricInfo(name='Estrógeno', unit='pg/dL')
m14.save()