import os
import django

from metrics.models import MetricInfo
from django.contrib.auth.models import User

def run():
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'your_project.settings')
    django.setup()

    m1 = MetricInfo(name='Glucosa', unit='mg/dL')
    m1.save()

    m2 = MetricInfo(name='Glóbulos rojos', unit='mill/µL')
    m2.save()

    m3 = MetricInfo(name='Glóbulos blancos', unit='ud/µL')
    m3.save()

    m4 = MetricInfo(name='Plaquetas', unit='ud/µL')
    m4.save()

    m5 = MetricInfo(name='Hemoglobina', unit='g/dL')
    m5.save()

    m6 = MetricInfo(name='Hematocrito', unit='%')
    m6.save()

    m7 = MetricInfo(name='Creatinina', unit='mg/dL')
    m7.save()

    m8 = MetricInfo(name='Calcio', unit='mg/dL')
    m8.save()

    m9 = MetricInfo(name='Sodio', unit='mEq/L')
    m9.save()

    m10 = MetricInfo(name='Potasio', unit='mEq/L')
    m10.save()

    m11 = MetricInfo(name='Cloruro', unit='mEq/L')
    m11.save()

    m12 = MetricInfo(name='Dióxido de carbono', unit='mg/dL')
    m12.save()

    m13 = MetricInfo(name='Niveles de suero eritropoyetina', unit='UI/L')
    m13.save()

    m14 = MetricInfo(name='Colesterol', unit='mg/dL')
    m14.save()

    m15 = MetricInfo(name='Inmunoglobulina A', unit='mg/dL')
    m15.save()

    m16 = MetricInfo(name='Inmunoglobulina G', unit='mg/dL')
    m16.save()

    m17 = MetricInfo(name='Inmunoglobulina M', unit='mg/dL')
    m17.save()

    m18 = MetricInfo(name='Proteina C reactiva', unit='mg/dL')
    m18.save()

    m19 = MetricInfo(name='Ferritina', unit='ng/dL')
    m19.save()

    m20 = MetricInfo(name='Alfa globulina', unit='g/dL')
    m20.save()

    m21 = MetricInfo(name='Beta globulina', unit='g/dL')
    m21.save()

    m22 = MetricInfo(name='V.C.M', unit='fl')
    m22.save()

    m23 = MetricInfo(name='H.C.M', unit='pg')
    m23.save()

    m24 = MetricInfo(name='C.H.C.M', unit='g/dL')
    m24.save()

    m25 = MetricInfo(name='V.S.G', unit='mm/h')
    m25.save()

    m26 = MetricInfo(name='Fibrinógeno', unit='mg/dL')
    m26.save()

    m27 = MetricInfo(name='Ácido úrico', unit='mg/dL')
    m27.save()

    m28 = MetricInfo(name='Triglicéridos', unit='mg/dL')
    m28.save()

    m29 = MetricInfo(name='Transaminasas', unit='UI/L')
    m29.save()
    
    m30 = MetricInfo(name='Tensión (baja/mínima)', unit='mmHg')
    m30.save()
    
    m31 = MetricInfo(name='Tensión (alta/máxima)', unit='mmHg')
    m31.save()

    superuser = User.objects.create_superuser(username='admin', email='admin@example.com', password='adminpassword')
    superuser.save()
