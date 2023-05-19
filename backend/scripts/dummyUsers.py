import os
import django

from django.contrib.auth.models import User
from users.models import Profile, Patient, Medic

def run():
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'your_project.settings')
    django.setup()

    user1 = User.objects.create_user(username='paciente1', email='mail1@mail.com', first_name='Juan', last_name='Fernández', password='paciente1')
    patient1 = Patient.objects.create(user=user1, tel='123456789', birthdate='2000-01-01', premium_account=True, share_metrics=True,
                                      share_physical_entries=True, share_mental_entries=True, share_appointments=True)
    patient1.save()

    user2 = User.objects.create_user(username='paciente2', email='mail2@mail.com', first_name='Roberto', last_name='Pérez', password='paciente2')
    patient2 = Patient.objects.create(user=user2, tel='123456788', birthdate='2000-01-02', premium_account=True,
                                      share_physical_entries=True, share_metrics=True)
    patient2.save()

    user3 = User.objects.create_user(username='paciente3', email='mail3@mail.com', first_name='Enrique', last_name='Ramírez'. password='paciente3')
    patient3 = Patient.objects.create(user=user3, tel='123456777', birthdate='2000-01-03', premium_account=True)
    patient3.save()

    user4 = User.objects.create_user(username='paciente4', email='mail4@mail.com', first_name='Julián', last_name='Alejándrez', password='paciente4')
    patient4 = Patient.objects.create(user=user4, tel='123456666', birthdate='2000-01-04', premium_account=True, 
                                      share_appointments=True, share_mental_entries=True)
    patient4.save()

    user5 = User.objects.create_user(username='medico1', email='mail5@mail.com', first_name='Antonio', last_name='Smith', password='medico1')
    medic = Medic.objects.create(user=user5, tel='123455555', birthdate='2000-01-05', premium_account=True)
    patient_list = [patient1,patient2,patient3]
    medic.patients.set(patient_list)
    medic.save()

