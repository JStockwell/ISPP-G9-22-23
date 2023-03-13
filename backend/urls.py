"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from django.urls.conf import include

from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

schema_view = get_schema_view(
   openapi.Info(
      title="HematoDia API",
      default_version='v0.3.0',
      description="Compañero de vida y salud capaz de registrar citas, dolencias y aflicciones.",
      #terms_of_service="https://www.google.com/policies/terms/",
      contact=openapi.Contact(email="isppgrupo9@gmail.com"), #TODO Revisar correo de contacto y actualizar/eliminar según se estime
      #license=openapi.License(name="BSD License"),
   ),
   public=True,
   permission_classes=[permissions.AllowAny], #TODO Decidir el tema de los permisos
)
urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    #path("appointments/", include("appointments.urls")),
    path("users/", include("users.urls")),
    path("metrics/", include("metrics.urls")),
    path("diary_entries/", include("diary_entries.urls")),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
]
