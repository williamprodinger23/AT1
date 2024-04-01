from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path('admin/', admin.site.urls), #url to admin app
    path('eduprod/', include(('eduprod.urls', 'eduprod'), namespace='eduprod')), #url to eduprod app
    path('users/', include(('users.urls', 'users'), namespace='users')), #url to users app
    path('accounts/login/', include('users.urls')), #url to login app
]