# from rest_framework_nested import routers
from django.urls import path


from .import views 


urlpatterns = [
    path('login/',views.LoginCheck.as_view(),name='login'),    
    path('sidebar/',views.SideBar.as_view(),name='sidebar'),
]