from django.urls import path

from .import views 


urlpatterns = [
    path('servicetypes/',views.ServiceTypeAPI.as_view(),name='servicetypes'),
    path('location/',views.LocationTypeahead.as_view(),name='location'),   
    path('statustypes/',views.StatusChartAPI.as_view(),name='statustypes'), 
    path('saveservice/',views.AddServiceAPI.as_view(),name='saveservice'), 
    path('listservice/',views.ServiceListAPI.as_view(),name='listservice'), 
    
    
    
]