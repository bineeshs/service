"""SERVICE URL Configuration

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
from django.urls import path,include
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from SERVICE import settings
# from url_check.views import URLPermissionCheck


from django.conf.urls.static import static


# from url_check.views import URLPermissionCheck

import login

urlpatterns = [
    path('admin/', admin.site.urls),
    path('login/', include('login.urls')), 
    path('service_url/', include('service_app.urls')),    
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    # path('url_permission_check/', URLPermissionCheck.as_view(), name='url-permission-check'),

]

# if settings.DEBUG:
#     urlpatterns += [
#         url(r'^media/(?P<path>.*)$', serve,
#             {'document_root': settings.MEDIA_ROOT, }),
#     ]


if settings.DEBUG:
    # urlpatterns += [
    #     path(r'^media/(?P<path>.*)$', serve,
    #          {'document_root': settings.MEDIA_ROOT}),
    # ]
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
